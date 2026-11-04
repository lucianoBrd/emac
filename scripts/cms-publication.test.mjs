import assert from "node:assert/strict";
import { test } from "node:test";
import automate from "../.github/scripts/cms-publication.cjs";

function fixture({ publishing = false, existing = true } = {}) {
  const calls = [];
  const pr = {
    number: 12,
    state: "open",
    draft: false,
    changed_files: 1,
    base: { ref: "main" },
    head: { sha: "current", repo: { full_name: "owner/emac" } },
  };
  const comparison = { ahead_by: 1, behind_by: 0 };
  const files = [{ filename: "content/promotions/promotion-7.json" }];
  const checks = ["format:check", "lint", "Tests"].map((name) => ({
    name,
    app: { slug: "github-actions" },
    status: "completed",
    conclusion: "success",
  }));
  const method = (name, result) => async (args) => {
    calls.push({ name, args });
    return { data: typeof result === "function" ? result(args) : result };
  };
  const github = {
    rest: {
      git: { getRef: method("getRef", { object: { sha: "current" } }) },
      repos: { compareCommitsWithBasehead: method("compare", comparison) },
      pulls: {
        list: method("list", existing ? [pr] : []),
        create: method("create", pr),
        get: method("get", pr),
        listFiles: method("files", files),
        updateBranch: method("update", {}),
        merge: method("merge", { merged: true }),
      },
      checks: { listForRef: method("checks", checks) },
    },
    paginate: async (fn, args) => (await fn(args)).data,
  };
  const context = {
    repo: { owner: "owner", repo: "emac" },
    eventName: publishing ? "workflow_run" : "push",
    payload: publishing
      ? {
          workflow_run: {
            conclusion: "success",
            event: "pull_request",
            head_repository: { full_name: "owner/emac" },
            head_branch: "cms/contenu",
            head_sha: "current",
          },
        }
      : { ref: "refs/heads/cms/contenu", after: "current" },
  };
  return {
    calls,
    pr,
    comparison,
    files,
    checks,
    context,
    github,
    run: () => automate({ github, context, core: { info() {}, warning() {} } }),
  };
}

test("CMS push opens one PR and waits for CI; existing PRs are reused", async () => {
  for (const existing of [false, true]) {
    const f = fixture({ existing });
    await f.run();
    assert.equal(
      f.calls.filter((c) => c.name === "create").length,
      existing ? 0 : 1,
    );
    assert(!f.calls.some((c) => c.name === "merge"));
  }
});

test("a stale CMS branch is updated and must pass a new CI run", async () => {
  const f = fixture({ publishing: true });
  f.comparison.behind_by = 1;
  await f.run();
  assert.equal(
    f.calls.find((c) => c.name === "update").args.expected_head_sha,
    "current",
  );
  assert(!f.calls.some((c) => c.name === "merge"));
});

test("successful CI merges precisely the validated commit", async () => {
  const f = fixture({ publishing: true });
  await f.run();
  assert.deepEqual(f.calls.find((c) => c.name === "merge").args, {
    owner: "owner",
    repo: "emac",
    pull_number: 12,
    sha: "current",
    merge_method: "squash",
  });
});

test("old runs, failed CI, fork runs and non-PR runs never merge", async () => {
  for (const mutate of [
    (f) => {
      f.context.payload.workflow_run.head_sha = "old";
    },
    (f) => {
      f.context.payload.workflow_run.conclusion = "failure";
    },
    (f) => {
      f.context.payload.workflow_run.head_repository.full_name = "fork/emac";
    },
    (f) => {
      f.context.payload.workflow_run.event = "push";
    },
  ]) {
    const f = fixture({ publishing: true });
    mutate(f);
    await f.run();
    assert(!f.calls.some((c) => c.name === "merge"));
  }
});

test("each named check must succeed from GitHub Actions on the head commit", async () => {
  for (const mutate of [
    (f) => f.checks.pop(),
    (f) => {
      f.checks[0].conclusion = "skipped";
    },
    (f) => {
      f.checks[1].conclusion = "failure";
    },
    (f) => {
      f.checks[2].status = "in_progress";
    },
    (f) => {
      f.checks[2].app.slug = "another-app";
    },
  ]) {
    const f = fixture({ publishing: true });
    mutate(f);
    await f.run();
    assert(!f.calls.some((c) => c.name === "merge"));
  }
});

test("code changes, renames from code and incomplete file lists require manual merging", async () => {
  for (const mutate of [
    (f) => {
      f.files[0].filename = "src/app/app.ts";
    },
    (f) => {
      f.files[0].previous_filename = ".github/workflows/main.yml";
    },
    (f) => {
      f.pr.changed_files = 2;
    },
  ]) {
    const f = fixture({ publishing: true });
    mutate(f);
    await f.run();
    assert(!f.calls.some((c) => ["merge", "update"].includes(c.name)));
  }
});

test("drafts, other target branches and changed PR heads remain untouched", async () => {
  for (const mutate of [
    (f) => {
      f.pr.draft = true;
    },
    (f) => {
      f.pr.base.ref = "other";
    },
    (f) => {
      f.pr.head.sha = "newer";
    },
    (f) => {
      f.pr.state = "closed";
    },
  ]) {
    const f = fixture({ publishing: true });
    mutate(f);
    await f.run();
    assert(!f.calls.some((c) => c.name === "merge"));
  }
});

test("no changes, deleted branches and outdated push events do nothing", async () => {
  for (const mutate of [
    (f) => {
      f.comparison.ahead_by = 0;
    },
    (f) => {
      f.context.payload.deleted = true;
    },
    (f) => {
      f.context.payload.after = "old";
    },
  ]) {
    const f = fixture({ existing: false });
    mutate(f);
    await f.run();
    assert(
      !f.calls.some((c) => ["create", "merge", "update"].includes(c.name)),
    );
  }
});

test("manual dispatch supports only cms branches", async () => {
  const f = fixture();
  f.context.eventName = "workflow_dispatch";
  f.context.payload = { inputs: { branch: "main" } };
  await assert.rejects(f.run, /Only cms/);
  f.context.payload.inputs.branch = "cms/contenu";
  await f.run();
  assert(!f.calls.some((c) => c.name === "merge"));
});

test("allowed paths include CMS media but exclude application/configuration files", () => {
  for (const path of [
    "content/emac.json",
    "content/promotions/promotion-7.json",
    "public/assets/images/promotion/Logo.PNG",
    "public/assets/music/chant.mp3",
  ])
    assert(automate.allowedPath(path), path);
  for (const path of [
    ".pages.yml",
    "package.json",
    "src/app/app.ts",
    "content/promotions/../emac.json",
    "public/assets/images/code.js",
    "public/assets/music/code.html",
  ])
    assert(!automate.allowedPath(path), path);
});
