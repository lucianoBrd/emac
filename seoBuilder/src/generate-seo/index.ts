#!/usr/in/env node

import "@angular/compiler";

import { execSync } from "child_process";
import { createBuilder } from '@angular-devkit/architect';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { path } from 'path';

import { Route } from "@angular/router";

import { routes } from "../../../src/app/app.routes";

export default createBuilder(async (options, ctx) => {
  ctx.logger.info("Builder has been started...");
  try {
    const build = await ctx.scheduleTarget({
      target: "build",
      project: ctx.target!.project,
      configuration: ctx.target!.configuration!,
    });
    const result = await build.result;
    const success = result.success;
    const outputPath = result.outputPath as string;
    if (!success) {
      return {
        success: false,
      };
    }

    const options: {
      url: string;
      sitemap_path: string;
      mpa_path: string;
      multipage_app: boolean;
      robots_path: string;
      generate_robots: boolean;
      update_robots: boolean;
    } = {
      url: "https://st-cyr-emac.org",
      sitemap_path: path.join(outputPath, "public/sitemap.xml"),
      mpa_path: path.join(outputPath, "public/"),
      multipage_app: true,
      robots_path: path.join(outputPath, "public/robots.txt"),
      generate_robots: true,
      update_robots: false,
    };
    
    if (options.url.endsWith("/"))
      options.url = options.url.substring(0, options.url.length - 1);
    const url = new URL(options.url);

    function getUrls(route: Route, prefix: string): string[] {
      if (route.path === "**") return [];
      if (route.path === "" && route.redirectTo) return [];

      if (!prefix.endsWith("/")) prefix += "/";
      let path: string = `${prefix}${route.path}`;
      if (!path.endsWith("/")) path += "/";
      let paths: string[] = [path];

      if (route.children) {
        for (const child of route.children) {
          paths = paths.concat(getUrls(child, path));
        }
      }

      return paths;
    }

    if (routes.length === 0) {
      ctx.logger.info("No routes found.");
      process.exit(0);
    }

    let paths: string[] = [];
    for (const route of routes) {
      paths = paths.concat(getUrls(route, ""));
    }

    if (paths.length <= 1) {
      console.error("Could not generate paths for sitemap");
      process.exit(1);
    }

    const date = new Date();
    let xml: string = "";

    xml += `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
    for (const path of paths) {
      xml += `
  <url>
    <loc>${options.url}${path}</loc>
    <lastmod>${date.toISOString()}</lastmod>
  </url>`;
    }
    xml += "\n</urlset>\n";

    writeFileSync(options.sitemap_path, xml);
    ctx.logger.info(`Generated sitemap: ${options.sitemap_path}`);

    const sitemap_filename = path.parse(options.sitemap_path).base;
    const sitemap_url = `${url.toString()}/${sitemap_filename}`;

    const default_robots = `User-agent: *\nAllow: /\n\nSitemap: ${sitemap_url}\n`;

    if (options.multipage_app) {
      ctx.logger.info("Building Angular project...");
      const base_href = `${url.pathname}/`;
      const build_output = execSync(`ng build --base-href ${base_href}`, {
        stdio: "pipe",
      })
        .toString()
        .split("\n");
      const output_path = build_output
        .find((line) => line.startsWith("Output location: "))
        ?.substring(17);
      if (output_path === undefined)
        throw new Error("Unable to build Angular project");
      const index_path = path.resolve(output_path, "browser/index.html");
      const index_code = readFileSync(index_path, "utf8");

      paths.forEach((route) => {
        if (route === "" || route === "/") return;

        const p = path.resolve(options.mpa_path, route.substring(1));
        if (!existsSync(p)) mkdirSync(p);
        writeFileSync(path.resolve(p, "index.html"), index_code);
      });
      ctx.logger.info(`Generated mpa directories in: ${options.mpa_path}`);
    }

    if (options.generate_robots) {
      writeFileSync(options.robots_path, default_robots);
      ctx.logger.info(`Generated robots: ${options.robots_path}`);
    }

    if (options.update_robots) {
      if (!existsSync(options.robots_path)) {
        console.error(
          `${options.robots_path} does not exist. Use -g to generate a new one.`,
        );
        process.exit(1);
      }

      let foundSitemap = false;
      const data = readFileSync(options.robots_path, { encoding: "utf-8" }).split(/\n/);
      for (let i = 0; i < data.length; i++) {
        if (data[i].startsWith("Sitemap:")) {
          data[i] = `Sitemap: ${sitemap_url}`;
          foundSitemap = true;
        }
      }

      if (!foundSitemap) {
        data.push(`\nSitemap: ${sitemap_url}\n`);
      }

      writeFileSync(options.robots_path, data.join("\n"));
      ctx.logger.info(`Updated robots: ${options.robots_path}`);
    }

    return { success };
  } catch (error) {
    return {
      success: false,
    };
  }
});
