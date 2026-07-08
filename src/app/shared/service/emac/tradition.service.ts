import { Injectable } from "@angular/core";

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
