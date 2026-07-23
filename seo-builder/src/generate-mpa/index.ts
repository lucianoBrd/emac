import { BuilderOutput, createBuilder } from '@angular-devkit/architect';
import { JsonObject } from '@angular-devkit/core';
import * as fs from "node:fs";
import path = require("node:path");

interface Options extends JsonObject {}

const outputPath: string = "dist/emac/browser";

export default createBuilder<Options>((_options, context) => {
  return new Promise<BuilderOutput>((resolve, _reject) => {
    context.logger.info('ok');

    context.reportStatus(`Generate MPA directories.`);

    const sitemap: string = fs.readFileSync(
        path.resolve(outputPath, "sitemap.xml"),
        "utf-8",
    );
    let parsedDocument = (new DOMParser()).parseFromString(sitemap, "application/xml");
    let locElements = parsedDocument.querySelectorAll("loc");
    const paths = locElements.values().map((e) => e.textContent.trim()).toArray();
console.log(paths);
    resolve({ success: true });
    return;

    const indexCode = fs.readFileSync(path.resolve(outputPath, "index.html"), "utf8");

    paths.forEach(route => {
      if (route === "" || route === "/") return;

      const p: string = path.resolve(outputPath, route.substring(1));
      if (!fs.existsSync(p)) fs.mkdirSync(p);
      fs.writeFileSync(path.resolve(p, "index.html"), indexCode);
      context.logger.info(`MPA ${p}.`);
    });

    // reject();
    resolve({ success: true });
  });
});
