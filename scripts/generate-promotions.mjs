import { readFileSync, readdirSync, existsSync, writeFileSync } from "node:fs";
import { resolve, join, basename, extname, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "yaml";

export const CONTENT_ROOT = resolve("content/promotions");
const escape = (value) =>
  value.replace(
    /[&<>"']/g,
    (char) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        char
      ],
  );

// Optional sections created by a CMS can contain only empty defaults.
export function clean(value) {
  if (value === null || value === undefined || value === "") return undefined;
  if (
    typeof value === "string" &&
    !value
      .replace(/<[^>]*>/g, "")
      .replace(/&nbsp;|&#160;|&#xa0;/gi, " ")
      .trim()
  )
    return undefined;
  if (Array.isArray(value))
    return value.map(clean).filter((item) => item !== undefined);
  if (typeof value === "object") {
    const entries = Object.entries(value)
      .map(([key, item]) => [key, clean(item)])
      .filter(
        ([, item]) =>
          item !== undefined && (!Array.isArray(item) || item.length),
      );
    return entries.length ? Object.fromEntries(entries) : undefined;
  }
  return value;
}

// Keep optional CMS objects editable without requiring their empty children.
// Once a section is populated, its model still requires these fields.
const requiredSectionFields = {
  about: ["title", "image"],
  song: ["name"],
  "song.music": ["name", "image"],
  album: ["name", "image"],
  footer: ["title", "image"],
};

export function validationFields(fields, parent = "") {
  return fields.map((field) => ({
    ...field,
    ...(requiredSectionFields[parent]?.includes(field.name) && {
      required: true,
    }),
    ...(field.fields && {
      fields: validationFields(
        field.fields,
        parent ? `${parent}.${field.name}` : field.name,
      ),
    }),
  }));
}

export function validateFields(data, fields, location) {
  if (!data || typeof data !== "object" || Array.isArray(data))
    throw new Error(`${location}: expected an object`);
  for (const key of Object.keys(data))
    if (!fields.some((field) => field.name === key))
      throw new Error(`${location}.${key}: unknown field`);
  for (const field of fields) {
    const value = data[field.name],
      path = `${location}.${field.name}`;
    if (value === undefined) {
      if (field.required) throw new Error(`${path}: required field`);
      continue;
    }
    const values = field.list ? value : [value];
    if (!Array.isArray(values)) throw new Error(`${path}: expected a list`);
    for (const item of values) {
      if (field.type === "object") validateFields(item, field.fields, path);
      else if (field.type === "boolean") {
        if (typeof item !== "boolean")
          throw new Error(`${path}: expected true or false`);
      } else if (field.type === "number") {
        if (
          !Number.isSafeInteger(item) ||
          item < (field.options?.min ?? -Infinity)
        )
          throw new Error(`${path}: invalid integer`);
      } else {
        if (typeof item !== "string" || (field.required && !item.trim()))
          throw new Error(`${path}: expected non-empty text`);
        const pattern =
          typeof field.pattern === "string"
            ? field.pattern
            : field.pattern?.regex;
        if (pattern && !new RegExp(pattern).test(item))
          throw new Error(`${path}: invalid format`);
        if (field.type === "date") {
          const date = new Date(`${item}T00:00:00Z`);
          if (
            !/^\d{4}-\d{2}-\d{2}$/.test(item) ||
            !Number.isFinite(date.getTime()) ||
            date.toISOString().slice(0, 10) !== item
          )
            throw new Error(`${path}: expected a real YYYY-MM-DD date`);
        }
        if (
          field.type === "select" &&
          !field.options.values.some(
            (option) =>
              (typeof option === "string" ? option : option.name) === item,
          )
        )
          throw new Error(`${path}: unknown option`);
      }
    }
  }
}

function validateMedia(value, location, publicRoot, kind) {
  if (!value) return;
  // Uploaded media are deliberately local, ensuring PWA and audio-cache support.
  const path = value.replace(/^\//, "");
  if (
    !path.startsWith("assets/") ||
    path.includes("\\") ||
    path.split("/").includes("..") ||
    path.includes("?")
  )
    throw new Error(`${location}: expected a local assets/ path`);
  const file = resolve(publicRoot, path);
  if (relative(publicRoot, file).startsWith(".." + sep) || !existsSync(file))
    throw new Error(`${location}: missing media ${value}`);
  // Windows is case-insensitive, but GitHub Pages runs with case-sensitive paths.
  let parent = publicRoot;
  for (const part of path.split("/")) {
    if (!readdirSync(parent).includes(part))
      throw new Error(`${location}: incorrect filename case: ${value}`);
    parent = join(parent, part);
  }
  const allowed =
    kind === "audio"
      ? [".mp3", ".wav", ".m4a", ".ogg", ".aac", ".opus", ".flac"]
      : kind === "video"
        ? [".mp4", ".webm", ".ogg"]
        : [".png", ".jpg", ".jpeg", ".webp", ".svg", ".gif", ".avif", ".ico"];
  if (!allowed.includes(extname(file).toLowerCase()))
    throw new Error(`${location}: unsupported ${kind} format`);
}

export function validateResources(data, fields, location, publicRoot) {
  for (const field of fields) {
    if (data[field.name] === undefined) continue;
    const values = field.list ? data[field.name] : [data[field.name]];
    for (const item of values) {
      if (field.type === "object")
        validateResources(
          item,
          field.fields,
          `${location}.${field.name}`,
          publicRoot,
        );
      if (field.type === "image")
        validateMedia(item, `${location}.${field.name}`, publicRoot, "image");
      if (field.type === "file" && field.options?.media === "audio")
        validateMedia(item, `${location}.${field.name}`, publicRoot, "audio");
    }
  }
}

export function paragraphs(values = []) {
  return values.map((value) =>
    /^<(p|div|ul|ol|blockquote|h[1-6])(?:\s|>)/i.test(value.trim())
      ? value
      : `<p>${value}</p>`,
  );
}

export function makeAlbum(value, id, logo, suffix) {
  if (!value) return undefined;
  return {
    ...value,
    id: `${id}-${suffix}`,
    slug: value.slug || `${id}-${suffix}`,
    image: value.image || logo,
    titles: (value.titles ?? []).map((track, index) => ({
      ...track,
      id: index + 1,
    })),
    platforms: value.platforms ?? [],
  };
}

export function loadPromotions({
  contentRoot = CONTENT_ROOT,
  publicRoot = resolve("public"),
  configPath = resolve(".pages.yml"),
} = {}) {
  const config = parse(readFileSync(configPath, "utf8"));
  const fields = validationFields(
    config.content.find((collection) => collection.name === "promotions")
      .fields,
  );
  const records = [],
    numbers = new Set();
  for (const filename of readdirSync(contentRoot)
    .filter((file) => file.endsWith(".json"))
    .sort()) {
    const id = basename(filename, ".json"),
      location = `content/promotions/${filename}`;
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id))
      throw new Error(
        `${location}: filename must use lowercase letters, numbers and hyphens`,
      );
    const data = clean(
      JSON.parse(readFileSync(join(contentRoot, filename), "utf8")),
    );
    validateFields(data, fields, location);
    validateResources(data, fields, location, publicRoot);
    if (numbers.has(data.number))
      throw new Error(`${location}: duplicate promotion number ${data.number}`);
    numbers.add(data.number);
    if (data.endDate <= data.startDate)
      throw new Error(`${location}: endDate must be after startDate`);
    for (const item of data.gallery?.gallery ?? []) {
      if (item.type === "youtube") {
        if (!item.thumb)
          throw new Error(`${location}: a YouTube thumbnail is required`);
        if (
          !/^https:\/\/(www\.)?youtube\.com\/embed\/[a-zA-Z0-9_-]+(?:\?[^\s]*)?$/.test(
            item.youtubeUrl ?? "",
          )
        )
          throw new Error(`${location}: expected a YouTube embed URL`);
      } else {
        if (!item.image)
          throw new Error(`${location}: a gallery file is required`);
        validateMedia(item.image, location, publicRoot, item.type);
      }
    }
    for (const album of [data.album, data.song?.music]) {
      if (album?.slug && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(album.slug))
        throw new Error(`${location}: invalid audio player slug`);
    }
    if (data.published !== true) continue;
    records.push({
      id,
      title: data.title,
      number: data.number,
      logo: data.logo,
      startDate: data.startDate,
      endDate: data.endDate,
      header: {
        id,
        logo: data.logo,
        background: data.header?.background ?? null,
        text: data.header?.text ?? [],
      },
      info: {
        id,
        title: `Promotion <span>${escape(data.title.replace(/^promotion\s+/i, ""))}</span>`,
        description: paragraphs(data.description),
      },
      ...(data.about && {
        about: {
          ...data.about,
          id,
          background: data.about.background ?? "",
          description: paragraphs(data.about.description),
        },
      }),
      ...(data.song && {
        song: {
          ...data.song,
          id,
          title: data.song.title || "Chant de promotion",
          description: data.song.description ?? "",
          verse: (data.song.verse ?? []).map((verse, index) => ({
            ...verse,
            id: `${id}-verse-${index}`,
            description: verse.description ?? [],
          })),
          music: makeAlbum(data.song.music, id, data.logo, "chant"),
        },
      }),
      ...(data.album && {
        album: makeAlbum(data.album, id, data.logo, "album"),
      }),
      ...(data.gallery?.gallery?.length && {
        gallery: {
          id,
          title: data.gallery.title || "Galerie",
          description:
            data.gallery.description || `Galerie de la promotion ${data.title}`,
          gallery: data.gallery.gallery.map(({ youtubeUrl, ...item }) => ({
            ...item,
            image: item.type === "youtube" ? youtubeUrl : item.image,
            ...(item.type === "video" && {
              mimeType:
                item.mimeType ||
                (extname(item.image).toLowerCase() === ".webm"
                  ? "video/webm"
                  : extname(item.image).toLowerCase() === ".ogg"
                    ? "video/ogg"
                    : "video/mp4"),
            }),
          })),
        },
      }),
      ...(data.social && {
        social: {
          ...data.social,
          id,
          background: data.social.background ?? "",
          social: data.social.social ?? [],
        },
      }),
      ...(data.footer && {
        footer: {
          ...data.footer,
          id,
          background: data.footer.background ?? "",
          text: data.footer.text ?? [],
        },
      }),
    });
  }
  if (!records.length)
    throw new Error("At least one published promotion is required.");
  return records.sort((a, b) => a.number - b.number);
}

export function generatePromotions(records = loadPromotions()) {
  const output = resolve("src/app/shared/data/promotions.generated.json");
  const content = JSON.stringify(records, null, 2) + "\n";
  if (!existsSync(output) || readFileSync(output, "utf8") !== content)
    writeFileSync(output, content);
  console.log(
    `Promotions: validated and generated ${records.length} published entries.`,
  );
}

if (
  process.argv[1] &&
  resolve(process.argv[1]) === fileURLToPath(import.meta.url)
)
  generatePromotions();
