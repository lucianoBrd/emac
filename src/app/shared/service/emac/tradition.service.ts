import { Injectable } from "@angular/core";

import { AboutListDB } from "../../data/emac/about-list";
import { About } from "../../models/emac/about.interface";
import {Tradition} from "../../models/emac/tradition.interface";
import {TraditionListDB} from "../../data/emac/tradition-list";

@Injectable({
  providedIn: "root",
})
export class TraditionService {
  getTraditions(): Tradition[] {
    return TraditionListDB.list
      .slice()
      .sort((a: Tradition, b: Tradition): number => a.id - b.id);
  }
}
