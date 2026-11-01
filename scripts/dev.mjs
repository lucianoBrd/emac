import { watch } from "node:fs";
import { spawn } from "node:child_process";
import { generatePromotions, CONTENT_ROOT } from "./generate-promotions.mjs";

generatePromotions();
let timer;
const watchers = [CONTENT_ROOT, ".pages.yml"].map((path) =>
  watch(path, () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      try {
        generatePromotions();
      } catch (error) {
        console.error(`Content not updated: ${error.message}`);
      }
    }, 150);
  }),
);
const args = process.argv.includes("--watch-build")
  ? ["build", "--watch", "--configuration", "development"]
  : ["serve", ...process.argv.slice(2)];
const child = spawn(
  process.execPath,
  ["node_modules/@angular/cli/bin/ng.js", ...args],
  { stdio: "inherit", windowsHide: true },
);
function close() {
  clearTimeout(timer);
  watchers.forEach((watcher) => watcher.close());
}
child.on("error", (error) => {
  console.error(error);
  close();
  process.exitCode = 1;
});
child.on("exit", (code) => {
  close();
  process.exitCode = code ?? 1;
});
for (const signal of ["SIGINT", "SIGTERM"])
  process.on(signal, () => {
    close();
    child.kill(signal);
  });
