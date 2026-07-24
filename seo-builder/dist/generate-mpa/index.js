"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("node:fs");
const path = require("node:path");
const architect_1 = require("@angular-devkit/architect");
const getSitemapLinks = (sitemap, baseUrl) => {
  const regex = /(?<=<loc>)(.+?)(?=<\/loc>)/g;
  const indexes = [...new Set(sitemap.match(regex))];
  if (indexes.length === 0) {
    return indexes;
  }
  let url = baseUrl;
  if (!baseUrl.endsWith("/")) url = baseUrl + "/";
  return [
    ...new Set(
      indexes.map((link) => {
        let l = link.replace(url, "");
        if (l.endsWith("/")) l = l.substring(0, l.length - 1);
        return l;
      }),
    ),
  ];
};
exports.default = (0, architect_1.createBuilder)((options, context) => {
  return new Promise((resolve, _reject) => {
    context.reportStatus(`Generate MPA directories.`);
    const outputPath = options.outputPath;
    const baseUrl = options.baseUrl;
    const sitemap = fs.readFileSync(
      path.resolve(outputPath, "sitemap.xml"),
      "utf-8",
    );
    const paths = getSitemapLinks(sitemap, baseUrl);
    const indexCode = fs.readFileSync(
      path.resolve(outputPath, "index.html"),
      "utf8",
    );
    paths.forEach((route) => {
      if (route === "" || route === "/") return;
      const p = path.resolve(outputPath, route);
      if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
      fs.writeFileSync(path.resolve(p, "index.html"), indexCode);
      context.logger.info(`MPA ${p}.`);
    });
    resolve({ success: true });
  });
});
//# sourceMappingURL=index.js.map
