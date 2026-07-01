import { Injectable } from "@angular/core";

import { PromotionListDB } from "../data/promotion/promotion-list";
import { Promotion } from "../models/promotion.interface";

@Injectable({
  providedIn: "root",
})
export class PromotionService {
  getPromotions(
    sort: (a: Promotion, b: Promotion) => number = (
      a: Promotion,
      b: Promotion,
    ): number => b.number - a.number,
  ): Promotion[] {
    return PromotionListDB.list.slice().sort(sort);
  }

  getLength(): number {
    return PromotionListDB.list.length;
  }
}
