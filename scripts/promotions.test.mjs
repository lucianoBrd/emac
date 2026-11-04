import assert from "node:assert/strict";
import { test } from "node:test";
import {
  mkdtempSync,
  mkdirSync,
  writeFileSync,
  rmSync,
  readFileSync,
  readdirSync,
  existsSync,
} from "node:fs";
import { join, resolve, sep } from "node:path";
import { parse } from "yaml";
import { loadPromotions } from "./generate-promotions.mjs";

function fixture(t) {
  mkdirSync(resolve("tmp"), { recursive: true });
  const root = mkdtempSync(resolve("tmp/content-test-")),
    contentRoot = join(root, "content"),
    publicRoot = join(root, "public");
  mkdirSync(contentRoot);
  mkdirSync(join(publicRoot, "assets/images"), { recursive: true });
  writeFileSync(join(publicRoot, "assets/images/logo.png"), "image");
  t.after(() => {
    assert(root.startsWith(resolve("tmp") + sep));
    rmSync(root, { recursive: true, force: true });
  });
  const data = {
    title: "Promotion Exemple",
    published: true,
    number: 1,
    startDate: "2025-02-01",
    endDate: "2026-02-01",
    logo: "/assets/images/logo.png",
    description: ["<p>Un <strong>texte</strong>.</p>"],
  };
  const write = (value = data, name = "exemple") =>
    writeFileSync(join(contentRoot, `${name}.json`), JSON.stringify(value));
  write();
  return {
    data,
    write,
    load: () => loadPromotions({ contentRoot, publicRoot }),
  };
}

test("adding a JSON file discovers the new promotion and generates component defaults", (t) => {
  const { data, write, load } = fixture(t);
  write({ ...data, title: "Une nouvelle promotion", number: 2 }, "nouvelle");
  const result = load();
  assert.equal(result.length, 2);
  assert.equal(result[1].id, "nouvelle");
  assert.equal(result[1].header.logo, data.logo);
  assert.equal(result[1].info.id, "nouvelle");
  assert.equal(result[1].startDate, "2025-02-01");
  assert.equal(result[1].info.description[0], data.description[0]);
});

test("drafts and empty optional sections never produce published routes", (t) => {
  const { data, write, load } = fixture(t);
  write({
    ...data,
    about: { title: "", description: [] },
    song: { name: "", verse: [] },
  });
  write({ ...data, published: false, number: 2 }, "brouillon");
  const result = load();
  assert.equal(result.length, 1);
  assert.equal(result[0].about, undefined);
  assert.equal(result[0].song, undefined);
});

test("optional CMS sections do not require their empty scalar fields", () => {
  const config = parse(readFileSync(".pages.yml", "utf8"));
  function check(fields, parent) {
    for (const field of fields) {
      if (field.type !== "object") continue;
      const location = `${parent}.${field.name}`;
      if (!field.required && !field.list) {
        for (const child of field.fields) {
          if (child.type !== "object") {
            assert(
              !child.required,
              `${location}.${child.name} blocks an empty section in the CMS`,
            );
          }
        }
      }
      check(field.fields, location);
    }
  }
  for (const entry of config.content) check(entry.fields, entry.name);
  const fields = config.content.find(
    (entry) => entry.name === "promotions",
  ).fields;
  for (const name of ["title", "number", "startDate", "endDate", "logo"]) {
    assert(
      fields.find((field) => field.name === name).required,
      `${name} remains required`,
    );
  }
});

test("empty editor placeholders omit optional promotion sections", (t) => {
  const { data, write, load } = fixture(t);
  write({
    ...data,
    about: { title: " ", image: null, description: ["<p><br></p>"] },
    song: {
      name: "",
      description: "<p>&nbsp;</p>",
      verse: [],
      music: { name: " ", image: "", titles: [], platforms: [] },
    },
    album: { name: "", image: "", titles: [], platforms: [] },
    footer: { title: "", image: "", text: [] },
    gallery: { title: "", gallery: [] },
    social: { background: "", social: [] },
  });
  const record = load()[0];
  for (const name of [
    "about",
    "song",
    "album",
    "footer",
    "gallery",
    "social",
  ]) {
    assert.equal(record[name], undefined, name);
  }
});

test("populated optional sections still require their model fields", (t) => {
  const { data, write, load } = fixture(t);
  for (const [section, value, missing] of [
    ["about", { title: "Histoire" }, "about.image"],
    ["about", { image: data.logo }, "about.title"],
    ["song", { description: "Un chant" }, "song.name"],
    ["album", { name: "Album" }, "album.image"],
    ["album", { image: data.logo }, "album.name"],
    ["footer", { title: "Décorations" }, "footer.image"],
    ["footer", { image: data.logo }, "footer.title"],
    ["song", { name: "Chant", music: { name: "Audio" } }, "song.music.image"],
    ["song", { name: "Chant", music: { image: data.logo } }, "song.music.name"],
  ]) {
    write({ ...data, [section]: value });
    assert.throws(load, (error) =>
      error.message.includes(`${missing}: required field`),
    );
  }
  write({ ...data, song: { name: "Chant", music: { name: "", image: "" } } });
  assert.equal(load()[0].song.name, "Chant");
  assert.equal(load()[0].song.music, undefined);
});

test("duplicate numbers, invalid or reversed dates and missing required fields fail publication", (t) => {
  const { data, write, load } = fixture(t);
  for (const invalid of [
    { ...data, number: 1.2 },
    { ...data, startDate: "2025-02-30" },
    { ...data, endDate: data.startDate },
    { ...data, title: "" },
  ]) {
    write(invalid);
    assert.throws(load);
  }
  write(data);
  write({ ...data, title: "Duplicate" }, "duplicate");
  assert.throws(load, /duplicate promotion number/);
});

test("media validation detects missing files, case mismatches, traversal and remote paths", (t) => {
  const { data, write, load } = fixture(t);
  for (const logo of [
    "assets/images/missing.png",
    "assets/images/Logo.png",
    "assets/../secret.png",
    "https://example.org/logo.png",
  ]) {
    write({ ...data, logo });
    assert.throws(load);
  }
});

test("gallery types and YouTube embed links are validated and empty galleries are omitted", (t) => {
  const { data, write, load } = fixture(t);
  write({ ...data, gallery: { gallery: [] } });
  assert.equal(load()[0].gallery, undefined);
  const video = {
    type: "youtube",
    youtubeUrl: "https://www.youtube.com/embed/abc123",
    thumb: data.logo,
  };
  write({ ...data, gallery: { gallery: [video] } });
  assert.equal(load()[0].gallery.gallery[0].image, video.youtubeUrl);
  write({
    ...data,
    gallery: { gallery: [{ ...video, youtubeUrl: "javascript:alert(1)" }] },
  });
  assert.throws(load, /embed URL/);
  write({ ...data, gallery: { gallery: [{ type: "image" }] } });
  assert.throws(load, /gallery file/);
});

test("filenames define stable, valid URLs, and all-unpublished content is rejected", (t) => {
  const { data, write, load } = fixture(t);
  write({ ...data, published: false });
  assert.throws(load, /published promotion/);
  write(data);
  write({ ...data, number: 2 }, "Invalid Name");
  assert.throws(load, /filename/);
});

test("real published content and editor configuration load together", () => {
  const result = loadPromotions();
  assert(result.length > 0);
  const bourgoin = result.find((record) => record.id === "col-bourgoin");
  assert.equal(bourgoin.album.titles.length, 19);
  assert.equal(bourgoin.gallery.gallery.length, 8);
  assert.equal(bourgoin.song.verse.length, 6);
  const config = parse(readFileSync(".pages.yml", "utf8"));
  assert.equal(config.content[0].operations.rename, false);
  assert.equal(config.content[0].filename.field, "create");
  assert.equal(
    config.media.find((media) => media.name === "audio").output,
    "/assets/music",
  );
});

test("a name already beginning with Promotion is not prefixed twice", (t) => {
  const { load } = fixture(t);
  assert.equal(load()[0].info.title, "Promotion <span>Exemple</span>");
});

test("CMS media paths map from public URLs to existing repository files", () => {
  const config = parse(readFileSync(".pages.yml", "utf8"));
  let checked = 0;
  function checkFields(data, fields, location) {
    for (const field of fields) {
      const value = data[field.name];
      if (value == null) continue;
      const values = field.list ? value : [value];
      for (const item of values) {
        const fieldPath = `${location}.${field.name}`;
        if (field.type === "object") {
          checkFields(item, field.fields, fieldPath);
        } else if (["image", "file"].includes(field.type)) {
          const media = config.media.find(
            (source) => source.name === field.options?.media,
          );
          assert(media, `${fieldPath}: missing CMS media source`);
          // Pages CMS only swaps output for input when the prefix matches exactly.
          assert(
            item.startsWith(`${media.output}/`),
            `${fieldPath}: ${item} must start with ${media.output}/ for CMS previews`,
          );
          const repositoryPath = join(
            media.input,
            item.slice(media.output.length + 1),
          );
          assert(
            existsSync(repositoryPath),
            `${fieldPath}: missing ${repositoryPath}`,
          );
          checked++;
        }
      }
    }
  }
  for (const entry of config.content) {
    const files =
      entry.type === "file"
        ? [entry.path]
        : readdirSync(entry.path)
            .filter((file) => file.endsWith(".json"))
            .map((file) => join(entry.path, file));
    for (const file of files) {
      checkFields(JSON.parse(readFileSync(file, "utf8")), entry.fields, file);
    }
  }
  assert(checked > 0, "Expected media fields in the real CMS content");
});
