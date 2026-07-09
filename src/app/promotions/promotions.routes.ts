import { Routes } from "@angular/router";
import {ConfigDB} from "../shared/data/config";

export const Promotions: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        loadComponent: () =>
          import("./promotions-list/promotions-list").then(
            (m) => m.PromotionsList,
          ),
        data: {
          title: ConfigDB.wordings.promotion.list.title,
          breadcrumb: ConfigDB.wordings.promotion.list.title,
          // description: ConfigDB.wordings.emac.description, // todo review
          // keywords: ConfigDB.wordings.emac.keywords,
        },
      },
      {
        path: ":promotionId",
        loadComponent: () =>
            import("./promotions-detail/promotions-detail").then(
                (m) => m.PromotionsDetail,
            ),
        data: {
          breadcrumb: ConfigDB.wordings.promotion.detail.title,
        },
      },
    ],
  },
];
