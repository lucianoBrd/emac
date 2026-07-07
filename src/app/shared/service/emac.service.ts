import { Injectable } from "@angular/core";

import { PromotionListDB } from "../data/promotion/promotion-list";
import { Promotion } from "../models/promotion.interface";
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
