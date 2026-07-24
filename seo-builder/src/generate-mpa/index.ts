import * as fs from "node:fs";
import path = require("node:path");

import { BuilderOutput, createBuilder } from "@angular-devkit/architect";
import { JsonObject } from "@angular-devkit/core";

interface Options extends JsonObject {
  outputPath: string;
  baseUrl: string;
}

const getSitemapLinks = (sitemap: string, baseUrl: string): string[] => {
  const regex = /(?<=<loc>)(.+?)(?=<\/loc>)/g;

  const indexes: string[] = [
    ...new Set((sitemap as string).match(regex) as string[]),
  ];

  if (indexes.length === 0) {
    return indexes;
  }

  let url: string = baseUrl;
  if (!baseUrl.endsWith("/")) url = baseUrl + "/";

  return [
    ...new Set(
      indexes.map((link: string): string => {
        let l: string = link.replace(url, "");

        if (l.endsWith("/")) l = l.substring(0, l.length - 1);

        return l;
      }),
    ),
  ];
};

export default createBuilder<Options>((options, context) => {
  return new Promise<BuilderOutput>((resolve, _reject) => {
    context.reportStatus(`Generate MPA directories.`);

    const outputPath: string = options.outputPath;
    const baseUrl: string = options.baseUrl;

    const sitemap: string = fs.readFileSync(
      path.resolve(outputPath, "sitemap.xml"),
      "utf-8",
    );
    const paths: string[] = getSitemapLinks(sitemap, baseUrl);

    const indexCode = fs.readFileSync(
      path.resolve(outputPath, "index.html"),
      "utf8",
    );

    paths.forEach((route: string): void => {
      if (route === "" || route === "/") return;

      const p: string = path.resolve(outputPath, route);
      if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
      fs.writeFileSync(path.resolve(p, "index.html"), indexCode);
      context.logger.info(`MPA ${p}.`);
    });

    resolve({ success: true });
  });
});
