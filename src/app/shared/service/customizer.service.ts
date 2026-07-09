import { Injectable } from "@angular/core";

import { ConfigDB } from "../data/config";
import { Cookie } from "../data/cookie";

@Injectable({
  providedIn: "root",
})
export class CustomizerService {
  // Configuration Layout
  public data = ConfigDB.data;

  constructor() {
    const layoutVersion =
      localStorage.getItem(Cookie.layoutVersion) ||
      this.data.settings.layout_version;
    const layoutType =
      localStorage.getItem(Cookie.layoutType) || this.data.settings.layout_type;
    if (layoutVersion) {
      document.body.classList.add(layoutVersion);
      this.data.settings.layout_version = layoutVersion;
    }
    if (layoutType) document.body.classList.add(layoutType);
  }

  // Set Customize layout Version
  setLayoutVersion(layout: string) {
    document.body.classList.remove(this.data.settings.layout_version);
    this.data.settings.layout_version = layout;
    document.body.classList.add(layout);
    localStorage.setItem(Cookie.layoutVersion, layout);
  }

  setLayoutType(layout: string) {
    document.body.classList.remove(this.data.settings.layout_type);
    this.data.settings.layout_type = layout;
    document.body.classList.add(layout);
    localStorage.setItem(Cookie.layoutType, layout);
  }
}
