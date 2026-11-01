import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const output = "dist/emac/browser";
const manifest = JSON.parse(
  readFileSync(join(output, "manifest.webmanifest"), "utf8"),
);
const worker = JSON.parse(readFileSync(join(output, "ngsw.json"), "utf8"));
assert.equal(manifest.display, "standalone");
assert.equal(manifest.start_url, "/");
assert.equal(manifest.scope, "/");
assert.equal(worker.navigationRequestStrategy, "freshness");
assert(existsSync(join(output, "ngsw-worker.js")));
for (const icon of manifest.icons) {
  const png = readFileSync(join(output, icon.src));
  assert.equal(png.subarray(1, 4).toString(), "PNG");
  assert.equal(`${png.readUInt32BE(16)}x${png.readUInt32BE(20)}`, icon.sizes);
}
assert(manifest.icons.some((icon) => icon.purpose === "maskable"));
for (const [url, hash] of Object.entries(worker.hashTable)) {
  const content = readFileSync(join(output, url));
  assert.equal(
    createHash("sha1").update(content).digest("hex"),
    hash,
    `Invalid service worker hash after postprocessing: ${url}`,
  );
  assert(
    !/\.(mp4|mp3|wav|ogg)$/i.test(url),
    `Audio and video must not be precached by the PWA: ${url}`,
  );
}
assert(worker.assetGroups.some((group) => group.urls.includes("/index.html")));
const html = readFileSync(join(output, "index.html"), "utf8");
assert(html.includes('rel="manifest" href="/manifest.webmanifest"'));
assert(html.includes('rel="apple-touch-icon"'));
console.log(
  "PWA verified: manifest, icon dimensions, offline entry point and service worker integrity.",
);
