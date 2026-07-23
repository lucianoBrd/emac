import { BuilderOutput, createBuilder } from '@angular-devkit/architect';
import { JsonObject } from '@angular-devkit/core';

interface Options extends JsonObject {
  url: string;
  sitemap_path: string;
  mpa_path: string;
  multipage_app: boolean;
  robots_path: string;
  generate_robots: boolean;
  update_robots: boolean;
}

export default createBuilder<Options>((options, context) => {
  return new Promise<BuilderOutput>((resolve, reject) => {
    //reject();
    resolve({ success: true });
  });
});
