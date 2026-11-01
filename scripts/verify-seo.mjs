import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const output = "dist/emac/browser";
const sitemap = readFileSync(join(output, "sitemap.xml"), "utf8");
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(
  (match) => match[1],
);
assert(urls.length > 2, "Sitemap must contain the rendered pages");
assert.equal(new Set(urls).size, urls.length, "Duplicate sitemap URL");
const titles = new Set();
const descriptions = new Set();
for (const url of urls) {
  const path = new URL(url).pathname;
  assert(path.endsWith("/"), `Missing trailing slash: ${url}`);
  const html = readFileSync(join(output, path, "index.html"), "utf8");
  const head = html.split("</head>")[0];
  assert.equal((head.match(/rel="canonical"/g) ?? []).length, 1, url);
  assert(head.includes(`rel="canonical" href="${url}"`), url);
  assert(head.includes(`property="og:url" content="${url}"`), url);
  assert.equal(
    (html.match(/<h1[ >]/g) ?? []).length,
    1,
    `One primary heading: ${url}`,
  );
  const title = head.match(/<title>(.*?)<\/title>/)?.[1];
  const description = head.match(/name="description" content="(.*?)"/)?.[1];
  assert(title && !titles.has(title), `Missing or duplicate title: ${url}`);
  assert(
    description && !descriptions.has(description),
    `Missing or duplicate description: ${url}`,
  );
  assert(!description.includes("{{"), `Unresolved placeholder: ${url}`);
  assert(
    !/&lt;\/?(?:p|strong|span|br)[ >]/.test(description),
    `HTML in description: ${url}`,
  );
  assert(
    !head.includes('content="noindex'),
    `Indexable page marked noindex: ${url}`,
  );
  titles.add(title);
  descriptions.add(description);
  for (const link of html.matchAll(/href="(\/promotions[^"?#]*)"/g)) {
    assert(link[1].endsWith("/"), `Noncanonical internal link: ${link[1]}`);
  }
}
const error = readFileSync(join(output, "404.html"), "utf8");
assert(error.includes('name="robots" content="noindex, follow"'));
assert(!error.includes('rel="canonical"'));
assert(!sitemap.includes("/404/"));
assert(!sitemap.includes("/maintenance/"));
assert(!error.includes('http-equiv="refresh"'));
console.log(
  `SEO verified: ${urls.length} pages with unique metadata, rendered headings, canonical links and an excluded 404 page.`,
);
