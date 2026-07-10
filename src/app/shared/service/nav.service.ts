import { inject, Injectable } from "@angular/core";

import { BehaviorSubject } from "rxjs";

import { PromotionService } from "./promotion.service";
import { ConfigDB } from "../data/config";
import { Menu } from "../models/menu.interface";
import { Promotion } from "../models/promotion.interface";

@Injectable({
  providedIn: "root",
})
export class NavService {
  public MENUITEMS: Menu[];
  // Array
  public items: BehaviorSubject<Menu[]>;
  private promotionService: PromotionService = inject(PromotionService);

  constructor() {
    const promotions: Promotion[] = this.promotionService.getPromotions();
    const lastPromotion: Promotion | undefined = promotions.shift();
    const lastPromotionPath: string = "/promotions/" + lastPromotion?.id;
    let promotionsMenu: Menu[] = [];

    promotionsMenu.push({
      title: lastPromotion?.id,
      type: "sub",
      icon: "comments-smiley",
      children: [
        {
          path: lastPromotionPath,
          title: lastPromotion?.title,
          type: "link",
          icon: "info-alt",
        },
        {
          path: lastPromotionPath + "/gallery",
          title: ConfigDB.wordings.general.gallery,
          type: "link",
          icon: "gallery",
        },
      ],
    });

    promotionsMenu.push({
      title: ConfigDB.wordings.promotion.list.title,
      type: "sub",
      children: [
        ...promotions.slice(0, 3).map((promotion: Promotion): Menu => {
          return {
            path: "/promotions/" + promotion.id,
            title: promotion.title,
            type: "link",
          };
        }),
        {
          path: "/promotions",
          title:
            ConfigDB.wordings.promotion.see_all +
            " (" +
            this.promotionService.getLength() +
            ")",
          type: "link",
        },
      ],
    });
    this.MENUITEMS = [
      {
        path: "/",
        title: ConfigDB.wordings.general.home,
        type: "link",
      },
      {
        title: ConfigDB.wordings.promotion.list.title,
        megaMenu: true,
        megaMenuType: "small",
        type: "sub",
        children: promotionsMenu,
      },
    ];

    this.items = new BehaviorSubject<Menu[]>(this.MENUITEMS);
    //this.items.next(this.MENUITEMS);
  }
}
