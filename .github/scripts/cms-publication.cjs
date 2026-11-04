const base = "main";
const checks = ["format:check", "lint", "Tests"];

function allowedPath(path) {
  if (
    typeof path !== "string" ||
    path.split("/").some((part) => !part || part === "." || part === "..")
  )
    return false;
  return (
    path === "content/emac.json" ||
    /^content\/promotions\/[a-z0-9]+(?:-[a-z0-9]+)*\.json$/.test(path) ||
    /^public\/assets\/images\/.+\.(png|jpe?g|webp|svg|gif|avif|ico|mp4|webm|ogg)$/i.test(
      path,
    ) ||
    /^public\/assets\/music\/.+\.(mp3|ogg|wav|m4a|aac|flac|opus)$/i.test(path)
  );
}

module.exports = async function publishCms({ github, context, core }) {
  const repo = context.repo;
  const fullName = `${repo.owner}/${repo.repo}`;
  const run = context.payload.workflow_run;
  const publishing = context.eventName === "workflow_run";
  if (
    publishing &&
    (run.conclusion !== "success" ||
      run.event !== "pull_request" ||
      run.head_repository?.full_name !== fullName)
  )
    return;
  if (context.payload.deleted) return;
  const branch = publishing
    ? run.head_branch
    : context.eventName === "workflow_dispatch"
      ? context.payload.inputs?.branch
      : context.payload.ref?.replace(/^refs\/heads\//, "");
  if (!branch?.startsWith("cms/"))
    throw new Error("Only cms/* branches can use CMS publication.");

  const { data: ref } = await github.rest.git.getRef({
    ...repo,
    ref: `heads/${branch}`,
  });
  const sha = ref.object.sha;
  if (
    (!publishing &&
      context.eventName === "push" &&
      context.payload.after !== sha) ||
    (publishing && run.head_sha !== sha)
  ) {
    core.info("A newer commit exists; wait for its checks.");
    return;
  }
  const { data: comparison } =
    await github.rest.repos.compareCommitsWithBasehead({
      ...repo,
      basehead: `${base}...${sha}`,
    });
  if (comparison.ahead_by === 0) {
    core.info("No CMS changes to publish.");
    return;
  }
  const { data: existing } = await github.rest.pulls.list({
    ...repo,
    base,
    head: `${repo.owner}:${branch}`,
    state: "open",
  });
  let pr = existing.find((item) => item.head.repo?.full_name === fullName);
  if (!pr) {
    if (publishing) return;
    ({ data: pr } = await github.rest.pulls.create({
      ...repo,
      base,
      head: branch,
      title: `Publication du contenu (${branch})`,
      body: "Modifications enregistrées depuis Pages CMS.\n\nLa publication automatique attend la réussite de format:check, lint et Tests sur le dernier commit. Les modifications de code nécessitent une fusion manuelle.",
    }));
  }
  ({ data: pr } = await github.rest.pulls.get({
    ...repo,
    pull_number: pr.number,
  }));
  if (
    pr.state !== "open" ||
    pr.draft ||
    pr.base.ref !== base ||
    pr.head.sha !== sha ||
    pr.head.repo?.full_name !== fullName
  )
    return;
  const files = await github.paginate(github.rest.pulls.listFiles, {
    ...repo,
    pull_number: pr.number,
    per_page: 100,
  });
  if (
    !files.length ||
    files.length !== pr.changed_files ||
    files.some(
      (file) =>
        !allowedPath(file.filename) ||
        (file.previous_filename && !allowedPath(file.previous_filename)),
    )
  ) {
    core.warning(
      "This PR includes changes outside CMS content/media. Review and merge it manually.",
    );
    return;
  }
  if (comparison.behind_by > 0) {
    await github.rest.pulls.updateBranch({
      ...repo,
      pull_number: pr.number,
      expected_head_sha: sha,
    });
    core.info("Branch updated from main; wait for the new CI run.");
    return;
  }
  if (!publishing) {
    core.info(`PR #${pr.number} is ready for CI.`);
    return;
  }
  const results = await github.paginate(github.rest.checks.listForRef, {
    ...repo,
    ref: sha,
    filter: "latest",
    per_page: 100,
  });
  if (
    !checks.every((name) =>
      results.some(
        (check) =>
          check.name === name &&
          check.app?.slug === "github-actions" &&
          check.status === "completed" &&
          check.conclusion === "success",
      ),
    )
  ) {
    core.info(
      "All three required GitHub Actions checks must succeed on this commit.",
    );
    return;
  }
  const { data: merged } = await github.rest.pulls.merge({
    ...repo,
    pull_number: pr.number,
    sha,
    merge_method: "squash",
  });
  if (!merged.merged)
    throw new Error(merged.message || "GitHub refused the merge.");
  core.info(
    `PR #${pr.number} merged after CI. The main deployment workflow will publish the site.`,
  );
};

module.exports.allowedPath = allowedPath;
