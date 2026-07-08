import { Injectable } from "@angular/core";

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
