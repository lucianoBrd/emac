import { Injectable } from "@angular/core";

import { AboutListDB } from "../../data/emac/about-list";
import { About } from "../../models/emac/about.interface";

@Injectable({
  providedIn: "root",
})
export class AboutService {
  getAbouts(): About[] {
    return AboutListDB.list
      .slice()
      .sort((a: About, b: About): number => a.id - b.id);
  }
}
