import assert from "node:assert/strict";
import { test } from "node:test";
import {
  mkdirSync,
  mkdtempSync,
  readFileSync,
  writeFileSync,
  rmSync,
} from "node:fs";
import { join, resolve, sep } from "node:path";
import { parse } from "yaml";
import { loadEmac } from "./generate-emac.mjs";

function fixture(t) {
  mkdirSync(resolve("tmp"), { recursive: true });
  const root = mkdtempSync(resolve("tmp/emac-test-"));
  t.after(() => {
    assert(root.startsWith(resolve("tmp") + sep));
    rmSync(root, { recursive: true, force: true });
  });
  const contentFile = join(root, "emac.json");
  const data = JSON.parse(readFileSync("content/emac.json", "utf8"));
  const write = (value = data) =>
    writeFileSync(contentFile, JSON.stringify(value));
  write();
  return { data, write, load: () => loadEmac({ contentFile }) };
}

test("EMAC is an editable single file covering all school sections", () => {
  const entry = parse(readFileSync(".pages.yml", "utf8")).content.find(
    (entry) => entry.name === "emac",
  );
  assert.equal(entry.type, "file");
  assert.equal(entry.path, "content/emac.json");
  assert.deepEqual(
    entry.fields.map((field) => field.name).sort(),
    Object.keys(JSON.parse(readFileSync("content/emac.json", "utf8"))).sort(),
  );
  const record = loadEmac();
  assert.equal(record.id, "emac");
  assert.equal(
    record.tradition.tradition.length,
    JSON.parse(readFileSync("content/emac.json", "utf8")).tradition.tradition
      .length,
  );
  assert.equal(record.song.verse.length, 4);
  assert(record.song.music.titles[0].file.endsWith(".mp3"));
});

test("editing school metadata and presentation updates the generated content", (t) => {
  const { data, write, load } = fixture(t);
  data.title = "Nouveau titre";
  data.description = "Nouvelle description";
  data.info.title = "<p>Un <strong>nouveau</strong> titre</p>";
  data.info.description = ["<p>Une nouvelle <em>presentation</em>.</p>"];
  write();
  const record = load();
  assert.equal(record.title, data.title);
  assert.equal(record.description, data.description);
  assert.equal(record.info.title, "Un <strong>nouveau</strong> titre");
  assert.deepEqual(record.info.description, data.info.description);
});

test("technical IDs and empty optional lists are derived automatically", (t) => {
  const { data, write, load } = fixture(t);
  delete data.about.description;
  delete data.header.text;
  delete data.tradition.tradition;
  delete data.song.verse;
  delete data.social.social;
  delete data.song.music;
  write();
  const record = load();
  assert.equal(record.header.id, "emac");
  assert.equal(record.info.id, "emac");
  assert.deepEqual(record.header.text, []);
  assert.deepEqual(record.about.description, []);
  assert.deepEqual(record.song.verse, []);
  assert.deepEqual(record.tradition.tradition, []);
  assert.deepEqual(record.social.social, []);
  assert.equal(record.song.music, undefined);
});

test("missing required text, empty headings and unknown fields stop publication", (t) => {
  const { data, write, load } = fixture(t);
  for (const invalid of [
    { ...data, title: "" },
    { ...data, description: "" },
    { ...data, info: { ...data.info, title: "<p></p>" } },
    { ...data, unknown: "value" },
  ]) {
    write(invalid);
    assert.throws(load);
  }
});

test("missing images, unsafe links and invalid audio references stop publication", (t) => {
  const { data, write, load } = fixture(t);
  write({
    ...data,
    header: { ...data.header, logo: "/assets/images/not-found.png" },
  });
  assert.throws(load, /missing media/);
  write({
    ...data,
    social: {
      ...data.social,
      social: [{ title: "Invalid", link: "javascript:alert(1)", icon: "book" }],
    },
  });
  assert.throws(load, /invalid format/);
  write({
    ...data,
    song: { ...data.song, music: { ...data.song.music, slug: "bad slug" } },
  });
  assert.throws(load, /slug/);
  write({
    ...data,
    song: {
      ...data.song,
      music: {
        ...data.song.music,
        titles: [{ name: "Missing", file: "/assets/music/missing.mp3" }],
      },
    },
  });
  assert.throws(load, /missing media/);
});
