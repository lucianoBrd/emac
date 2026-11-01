import { readFileSync, existsSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "yaml";
import {
  clean,
  validateFields,
  validateResources,
  makeAlbum,
  paragraphs,
} from "./generate-promotions.mjs";

// Rich-text heading fields can emit paragraph wrappers; keep only inline markup.
function heading(value) {
  const result = value
    .replace(/<\/?(?:p|div|h[1-6]|ul|ol|li|blockquote)(?:\s[^>]*)?>/gi, " ")
    .trim();
  if (!result.replace(/<[^>]*>/g, "").trim())
    throw new Error("content/emac.json: headings must contain text");
  return result;
}

export function loadEmac({
  contentFile = resolve("content/emac.json"),
  publicRoot = resolve("public"),
  configPath = resolve(".pages.yml"),
} = {}) {
  const fields = parse(readFileSync(configPath, "utf8")).content.find(
    (entry) => entry.name === "emac",
  )?.fields;
  if (!fields)
    throw new Error("Missing EMAC editor configuration in .pages.yml");
  const data = clean(JSON.parse(readFileSync(contentFile, "utf8")));
  validateFields(data, fields, "content/emac.json");
  validateResources(data, fields, "content/emac.json", publicRoot);
  if (
    data.song.music?.slug &&
    !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(data.song.music.slug)
  )
    throw new Error("content/emac.json: invalid audio player slug");
  const id = "emac";
  return {
    id,
    title: data.title,
    description: data.description,
    keywords: data.keywords ?? "",
    header: {
      ...data.header,
      id,
      background: data.header.background ?? null,
      text: data.header.text ?? [],
    },
    info: {
      ...data.info,
      id,
      title: heading(data.info.title),
      description: paragraphs(data.info.description),
    },
    about: {
      ...data.about,
      id,
      title: heading(data.about.title),
      background: data.about.background ?? "",
      description: paragraphs(data.about.description),
    },
    song: {
      ...data.song,
      id,
      title: heading(data.song.title),
      description: data.song.description ?? "",
      verse: (data.song.verse ?? []).map((verse, index) => ({
        ...verse,
        id: `${id}-verse-${index}`,
        description: verse.description ?? [],
      })),
      music: makeAlbum(data.song.music, id, data.header.logo, "chant"),
    },
    tradition: {
      ...data.tradition,
      id,
      title: heading(data.tradition.title),
      description: data.tradition.description ?? "",
      tradition: (data.tradition.tradition ?? []).map((item) => ({
        ...item,
        description: item.description ?? "",
      })),
    },
    social: {
      ...data.social,
      id,
      background: data.social.background ?? "",
      social: data.social.social ?? [],
    },
  };
}

export function generateEmac(record = loadEmac()) {
  const output = resolve("src/app/shared/data/emac.generated.json");
  const content = JSON.stringify(record, null, 2) + "\n";
  if (!existsSync(output) || readFileSync(output, "utf8") !== content)
    writeFileSync(output, content);
  console.log("EMAC: validated and generated school content.");
}

if (
  process.argv[1] &&
  resolve(process.argv[1]) === fileURLToPath(import.meta.url)
)
  generateEmac();
