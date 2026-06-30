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
    let promotionsMenu: Menu[] = [];
    PromotionListDB.list
      .sort((a: Promotion, b: Promotion): number => b.number - a.number)
      .slice(0, 3)
      .forEach((promotion: Promotion): void => {
        const promotionPath: string = "/promotions/" + promotion.id;
        promotionsMenu.push({
          title: promotion.id,
          type: "sub",
          icon: "comments-smiley",
          children: [
            {
              path: promotionPath,
              title: promotion.title,
              type: "link",
              icon: "info-alt",
            },
            {
              path: promotionPath + "/social",
              title: ConfigDB.wordings.general.social,
              type: "link",
              icon: "themify-favicon",
            },
            {
              path: promotionPath + "/gallery",
              title: ConfigDB.wordings.general.gallery,
              type: "link",
              icon: "gallery",
            },
            {
              path: promotionPath + "/blog",
              title: ConfigDB.wordings.general.blog,
              type: "link",
              icon: "layout-list-thumb-alt",
            },
          ],
        });
      });
    promotionsMenu.push({
      title: ConfigDB.wordings.promotion.title,
      type: "sub",
      icon: "comments-smiley",
      children: [
        {
          path: "/promotions",
          title:
            ConfigDB.wordings.promotion.see_all +
            " (" +
            PromotionListDB.list.length +
            ")",
          type: "link",
          icon: "layout-grid2-thumb",
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
        megaMenuType: "medium",
        type: "sub",
        children: promotionsMenu,
      },
    ];

    this.items = new BehaviorSubject<Menu[]>(this.MENUITEMS);
    //this.items.next(this.MENUITEMS);
  }
}
