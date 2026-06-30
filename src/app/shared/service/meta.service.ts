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
    this.titleService.setTitle(newTitle + " | " + ConfigDB.data.app_name);
  }

  public setDescription(newDesc: string): void {
    this.metaService.updateTag({
      name: "description",
      content: newDesc,
    });
  }

  public setKeywords(newKw: string): void {
    this.metaService.updateTag({
      name: "keywords",
      content: ConfigDB.data.keywords + newKw,
    });
  }
}
