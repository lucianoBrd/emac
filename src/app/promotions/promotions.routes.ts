import { Routes } from "@angular/router";

import { ConfigDB } from "../shared/data/config";

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
          description: ConfigDB.wordings.promotion.list.description.at(0),
        },
      },
      {
        path: ":promotionId",
        loadComponent: () =>
          import("./promotions-detail/promotions-detail").then(
            (m) => m.PromotionsDetail,
          ),
      },
      {
        path: ":promotionId/gallery",
        loadComponent: () =>
          import("./promotions-gallery/promotions-gallery").then(
            (m) => m.PromotionsGallery,
          ),
      },
    ],
  },
];
