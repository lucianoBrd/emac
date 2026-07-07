import { inject, Injectable } from "@angular/core";
import { Meta, Title } from "@angular/platform-browser";

import { ConfigDB } from "../data/config";

@Injectable({
  providedIn: "root",
})
export class MetaService {
  private titleService: Title = inject(Title);
  private metaService: Meta = inject(Meta);

  public setTitle(newTitle: string): void {
    if (!newTitle) {
      return;
    }
    this.titleService.setTitle(newTitle + " | " + ConfigDB.data.app_name);
  }

  public setDescription(newDesc: string): void {
    if (!newDesc) {
      return;
    }
    this.metaService.updateTag({
      name: "description",
      content: newDesc,
    });
  }

  public setKeywords(newKw: string): void {
    if (!newKw) {
      return;
    }
    this.metaService.updateTag({
      name: "keywords",
      content: ConfigDB.data.keywords + newKw,
    });
  }
}
