import { Injectable } from "@angular/core";

import { AboutListDB } from "../../data/emac/about-list";
import { About } from "../../models/emac/about.interface";
import {Counter} from "../../models/emac/counter.interface";
import {CounterListDB} from "../../data/emac/counter-list";

@Injectable({
  providedIn: "root",
})
export class CounterService {
  getCounters(): Counter[] {
    return CounterListDB.list
      .slice()
      .sort((a: Counter, b: Counter): number => a.id - b.id);
  }
}
