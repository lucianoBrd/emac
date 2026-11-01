import assert from "node:assert/strict";
import { test } from "node:test";
import {
  mkdtempSync,
  mkdirSync,
  writeFileSync,
  rmSync,
  readFileSync,
} from "node:fs";
import { join, resolve, sep } from "node:path";
import { parse } from "yaml";
import { loadPromotions } from "./generate-promotions.mjs";

function fixture(t) {
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
