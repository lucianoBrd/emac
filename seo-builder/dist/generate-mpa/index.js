"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const architect_1 = require("@angular-devkit/architect");
const fs = require("node:fs");
const path = require("node:path");
const outputPath = "dist/emac/browser";
exports.default = (0, architect_1.createBuilder)((_options, context) => {
  return new Promise((resolve, _reject) => {
    context.logger.info("ok");
    context.reportStatus(`Generate MPA directories.`);
    const sitemap = fs.readFileSync(
      path.resolve(outputPath, "sitemap.xml"),
      "utf-8",
    );
    let parsedDocument = new DOMParser().parseFromString(
      sitemap,
      "application/xml",
    );
    let locElements = parsedDocument.querySelectorAll("loc");
    const paths = locElements
      .values()
      .map((e) => e.textContent.trim())
      .toArray();
    console.log(paths);
    resolve({ success: true });
    return;
    const indexCode = fs.readFileSync(
      path.resolve(outputPath, "index.html"),
      "utf8",
    );
    paths.forEach((route) => {
      if (route === "" || route === "/") return;
      const p = path.resolve(outputPath, route.substring(1));
      if (!fs.existsSync(p)) fs.mkdirSync(p);
      fs.writeFileSync(path.resolve(p, "index.html"), indexCode);
      context.logger.info(`MPA ${p}.`);
    });
    // reject();
    resolve({ success: true });
  });
});
//# sourceMappingURL=index.js.map
