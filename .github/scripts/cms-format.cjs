const { execFileSync } = require("node:child_process");
const {
  existsSync,
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} = require("node:fs");
const { dirname, resolve, sep } = require("node:path");
const { allowedPath } = require("./cms-publication.cjs");

const isContent = (path) =>
  allowedPath(path) && path.startsWith("content/") && path.endsWith(".json");

module.exports = async function formatCms({
  github,
  repo,
  branch,
  sha,
  files,
  core,
  directory = process.cwd(),
  execute = execFileSync,
}) {
  if (!branch?.startsWith("cms/"))
    throw new Error("Only CMS branches can receive formatting commits.");
  if (
    files.some(
      (file) =>
        !allowedPath(file.filename) ||
        (file.previous_filename && !allowedPath(file.previous_filename)),
    )
  )
    throw new Error(
      "Changes outside CMS content/media require manual corrections.",
    );
  const root = resolve(directory);
  const localPath = (path) => {
    const file = resolve(root, path);
    if (!file.startsWith(root + sep) || !isContent(path))
      throw new Error(`Invalid CMS content path: ${path}`);
    return file;
  };
  const git = (args) =>
    execute("git", args, { cwd: root, encoding: "utf8" })
      .split("\0")
      .filter(Boolean);
  const contentPaths = new Set(git(["ls-files", "-z"]).filter(isContent));
  // Overlay CMS data only. Scripts, configuration and dependencies stay on main.
  for (const file of files.filter((item) => isContent(item.filename))) {
    contentPaths.add(file.filename);
    const target = localPath(file.filename);
    if (file.status === "removed") {
      rmSync(target, { force: true });
      continue;
    }
    const { data } = await github.rest.repos.getContent({
      ...repo,
      path: file.filename,
      ref: sha,
    });
    if (
      data.type !== "file" ||
      data.encoding !== "base64" ||
      typeof data.content !== "string"
    )
      throw new Error(`Cannot read CMS JSON: ${file.filename}`);
    mkdirSync(dirname(target), { recursive: true });
    writeFileSync(target, Buffer.from(data.content, "base64"));
  }
  const read = (path) =>
    existsSync(localPath(path)) ? readFileSync(localPath(path), "utf8") : null;
  const before = new Map([...contentPaths].map((path) => [path, read(path)]));
  execute("npm", ["run", "format"], { cwd: root, stdio: "inherit" });
  execute("npm", ["run", "lint:fix"], { cwd: root, stdio: "inherit" });
  const changed = [
    ...git(["diff", "--name-only", "-z"]),
    ...git(["ls-files", "--others", "--exclude-standard", "-z"]),
  ];
  if (changed.some((path) => !isContent(path)))
    throw new Error(
      "Formatting/lint changed files outside CMS JSON. Correct main manually before publishing.",
    );
  const fixes = [];
  for (const path of new Set([...contentPaths, ...changed])) {
    const content = read(path);
    if (content === before.get(path)) continue;
    if (content === null)
      throw new Error(`Formatting unexpectedly removed ${path}`);
    fixes.push({ path, mode: "100644", type: "blob", content });
  }
  if (!fixes.length) {
    core.info("Format and lint passed; no correction commit needed.");
    return false;
  }
  const { data: current } = await github.rest.git.getRef({
    ...repo,
    ref: `heads/${branch}`,
  });
  if (current.object.sha !== sha) {
    core.info("A newer CMS save exists; let its workflow handle corrections.");
    return false;
  }
  const { data: parent } = await github.rest.git.getCommit({
    ...repo,
    commit_sha: sha,
  });
  const { data: tree } = await github.rest.git.createTree({
    ...repo,
    base_tree: parent.tree.sha,
    tree: fixes,
  });
  const { data: commit } = await github.rest.git.createCommit({
    ...repo,
    message: "style(cms): apply automatic format and lint fixes",
    tree: tree.sha,
    parents: [sha],
  });
  await github.rest.git.updateRef({
    ...repo,
    ref: `heads/${branch}`,
    sha: commit.sha,
    force: false,
  });
  core.info(
    `Committed ${fixes.length} corrected CMS file(s); wait for CI on ${commit.sha}.`,
  );
  return true;
};
