import { Injectable } from "@angular/core";

import { EmacDB } from "../data/emac";
import { Emac } from "../models/emac.interface";

@Injectable({
  providedIn: "root",
})
export class EmacService {
  getEmac(): Emac {
    return EmacDB.emac;
  }
}
