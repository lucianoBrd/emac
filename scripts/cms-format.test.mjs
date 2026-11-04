import assert from "node:assert/strict";
import { test } from "node:test";
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { join, resolve, sep } from "node:path";
import formatCms from "../.github/scripts/cms-format.cjs";

function fixture(t, options = {}) {
  mkdirSync(resolve("tmp"), { recursive: true });
  const directory = mkdtempSync(resolve("tmp/cms-format-test-"));
  t.after(() => {
    assert(directory.startsWith(resolve("tmp") + sep));
    rmSync(directory, { recursive: true, force: true });
  });
  mkdirSync(join(directory, "content"));
  const filename = "content/emac.json";
  const target = join(directory, filename);
  writeFileSync(target, '{"title":"Main version"}\n');
  const original = options.original ?? '{"title":"CMS version"}';
  const formatted = JSON.stringify(JSON.parse(original), null, 2) + "\n";
  const calls = [];
  const method = (name, data) => async (args) => {
    calls.push({ name, args });
    return { data };
  };
  const github = {
    rest: {
      repos: {
        getContent: method("content", {
          type: "file",
          encoding: "base64",
          content: Buffer.from(original).toString("base64"),
        }),
      },
      git: {
        getRef: method("ref", {
          object: { sha: options.latest ?? "original-head" },
        }),
        getCommit: method("parent", { tree: { sha: "original-tree" } }),
        createTree: method("tree", { sha: "corrected-tree" }),
        createCommit: method("commit", { sha: "corrected-head" }),
        updateRef: method("update", {}),
      },
    },
  };
  const execute = (command, args) => {
    calls.push({ name: command, args });
    if (command === "git") {
      if (args[0] === "diff")
        return filename + "\0" + (options.outside ? "src/app/app.ts\0" : "");
      return args.includes("--others") ? "" : filename + "\0";
    }
    if (args[1] === options.fail) throw new Error(`Failed ${options.fail}`);
    if (args[1] === "format" && existsSync(target))
      writeFileSync(target, formatted);
  };
  const files = [
    { filename, status: options.removed ? "removed" : "modified" },
    { filename: "public/assets/music/chant.mp3", status: "added" },
  ];
  return {
    calls,
    original,
    formatted,
    target,
    files,
    run: () =>
      formatCms({
        github,
        repo: { owner: "owner", repo: "emac" },
        branch: "cms/contenu",
        sha: "original-head",
        files,
        directory,
        execute,
        core: { info() {} },
      }),
  };
}

test("format and lint fixes create one commit based on the CMS head tree", async (t) => {
  const f = fixture(t);
  assert.equal(await f.run(), true);
  assert.deepEqual(
    f.calls.filter((c) => c.name === "npm").map((c) => c.args),
    [
      ["run", "format"],
      ["run", "lint:fix"],
    ],
  );
  assert.deepEqual(f.calls.find((c) => c.name === "tree").args, {
    owner: "owner",
    repo: "emac",
    base_tree: "original-tree",
    tree: [
      {
        path: "content/emac.json",
        mode: "100644",
        type: "blob",
        content: f.formatted,
      },
    ],
  });
  assert.deepEqual(f.calls.find((c) => c.name === "commit").args.parents, [
    "original-head",
  ]);
  assert.deepEqual(f.calls.find((c) => c.name === "update").args, {
    owner: "owner",
    repo: "emac",
    ref: "heads/cms/contenu",
    sha: "corrected-head",
    force: false,
  });
  assert.equal(
    f.calls.filter((c) => c.name === "content").length,
    1,
    "Media must not be copied or rewritten",
  );
});

test("already formatted content runs both commands without an empty commit", async (t) => {
  const f = fixture(t, { original: '{\n  "title": "CMS version"\n}\n' });
  assert.equal(await f.run(), false);
  assert.equal(f.calls.filter((c) => c.name === "npm").length, 2);
  assert(!f.calls.some((c) => ["tree", "commit", "update"].includes(c.name)));
});

test("format or lint errors never push a correction commit", async (t) => {
  for (const fail of ["format", "lint:fix"]) {
    const f = fixture(t, { fail });
    await assert.rejects(f.run, /Failed/);
    assert(!f.calls.some((c) => ["tree", "commit", "update"].includes(c.name)));
  }
});

test("unrelated source changes stop automatic commits", async (t) => {
  const f = fixture(t, { outside: true });
  await assert.rejects(f.run, /outside CMS JSON/);
  assert(!f.calls.some((c) => c.name === "commit"));
});

test("a newer CMS save is preserved instead of overwritten", async (t) => {
  const f = fixture(t, { latest: "newer-head" });
  assert.equal(await f.run(), false);
  assert(!f.calls.some((c) => ["tree", "commit", "update"].includes(c.name)));
});

test("a removed CMS file is not restored by the correction step", async (t) => {
  const f = fixture(t, { removed: true });
  assert.equal(await f.run(), false);
  assert(!existsSync(f.target));
  assert(
    !f.calls.some((c) => ["content", "commit", "update"].includes(c.name)),
  );
});

test("code changes in a CMS PR are rejected before running npm", async (t) => {
  const f = fixture(t);
  f.files.push({ filename: ".github/workflows/main.yml" });
  await assert.rejects(f.run, /outside CMS/);
  assert(!f.calls.some((c) => c.name === "npm"));
  assert.equal(readFileSync(f.target, "utf8"), '{"title":"Main version"}\n');
});
