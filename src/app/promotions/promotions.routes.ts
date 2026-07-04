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
          title: ConfigDB.wordings.promotion.title,
          breadcrumb: ConfigDB.wordings.promotion.title,
          description: ConfigDB.wordings.emac.description, // todo review
          keywords: ConfigDB.wordings.emac.keywords,
        },
      },
    ],
  },
];
