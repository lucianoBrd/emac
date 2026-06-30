import { Injectable } from "@angular/core";

import { BehaviorSubject } from "rxjs";

import { ConfigDB } from "../data/config";
import { PromotionListDB } from "../data/promotion/promotion-list";
import { Menu } from "../models/menu.interface";
import { Promotion } from "../models/promotion.interface";

@Injectable({
  providedIn: "root",
})
export class NavService {
  public MENUITEMS: Menu[];
  // Array
  public items: BehaviorSubject<Menu[]>;

  constructor() {
    const promotions: Promotion[] = PromotionListDB.list
      .slice()
      .sort((a: Promotion, b: Promotion): number => b.number - a.number);
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
          path: lastPromotionPath + "/social",
          title: ConfigDB.wordings.general.social,
          type: "link",
          icon: "themify-favicon",
        },
        {
          path: lastPromotionPath + "/gallery",
          title: ConfigDB.wordings.general.gallery,
          type: "link",
          icon: "gallery",
        },
        {
          path: lastPromotionPath + "/blog",
          title: ConfigDB.wordings.general.blog,
          type: "link",
          icon: "layout-list-thumb-alt",
        },
      ],
    });

    promotionsMenu.push({
      title: ConfigDB.wordings.promotion.title,
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
            PromotionListDB.list.length +
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
        title: ConfigDB.wordings.promotion.title,
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
