import { Injectable } from "@angular/core";

import {Emac} from "../models/emac.interface";
import {EmacDB} from "../data/emac";

@Injectable({
  providedIn: "root",
})
export class EmacService {
  getEmac(): Emac {
    return EmacDB.emac;
  }
}
