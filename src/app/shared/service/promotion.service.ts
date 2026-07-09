import { Injectable } from "@angular/core";

import { PromotionDB } from "../data/promotion";
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
    return PromotionDB.list.slice().sort(sort);
  }

  getPromotion(id: string): Promotion | undefined {
    return PromotionDB.list.find(
      (promotion: Promotion): boolean => promotion.id === id,
    );
  }

  getLength(): number {
    return PromotionDB.list.length;
  }
}
