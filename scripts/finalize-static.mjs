import {
  readdirSync,
  readFileSync,
  writeFileSync,
  copyFileSync,
  existsSync,
} from "node:fs";
import { resolve, join, relative, sep } from "node:path";

const output = resolve("dist/emac/browser");
const base = "https://st-cyr-emac.org";
const pages = [];
function visit(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const file = join(directory, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== "assets") visit(file);
    } else if (entry.name === "index.html") {
      const html = readFileSync(file, "utf8");
      if (/<meta[^>]+name="robots"[^>]+content="noindex/i.test(html)) continue;
      const url =
        base +
        "/" +
        relative(output, directory).split(sep).filter(Boolean).join("/");
      const canonical = url.endsWith("/") ? url : url + "/";
      if (!html.includes(`rel="canonical" href="${canonical}"`)) {
        throw new Error(
          `Missing canonical in ${file}; run the Angular prerender build first.`,
        );
      }
      pages.push(canonical);
    }
  }
}
visit(output);
if (!pages.length) throw new Error("No prerendered pages found.");
const errorPage = join(output, "404", "index.html");
if (!existsSync(errorPage)) throw new Error("Missing prerendered 404 page.");
copyFileSync(errorPage, join(output, "404.html"));
writeFileSync(
  join(output, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages
    .sort()
    .map((url) => `  <url><loc>${url}</loc></url>`)
    .join("\n")}\n</urlset>\n`,
);
writeFileSync(
  join(output, "robots.txt"),
  `User-agent: *\nDisallow:\nSitemap: ${base}/sitemap.xml\n`,
);
console.log(
  `Static site ready: ${pages.length} canonical pages, sitemap.xml and 404.html.`,
);
