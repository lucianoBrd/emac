import { Routes } from "@angular/router";

import { ConfigDB } from "./shared/data/config";
import {
  AuthGuardMaintenance,
  AuthGuarNotdMaintenance,
} from "./shared/service/permission.service";
import {Promotions} from "./promotions/promotions.routes";

export const routes: Routes = [
  {
    path: "",
    loadComponent: () =>
        import("../app/emac/emac").then(
            (m) => m.Emac,
        ),
    data: {
      title: ConfigDB.wordings.emac.title,
      description: ConfigDB.wordings.emac.description,
      keywords: ConfigDB.wordings.emac.keywords,
    },
    canActivate: [AuthGuardMaintenance],
  },
  {
    path: "promotions",
    loadComponent: () => import('./promotions/promotions').then(m => m.Promotions),
    loadChildren: () =>
      import("../app/promotions/promotions.routes").then((r) => r.Promotions),
    canActivate: [AuthGuardMaintenance],
  },
  {
    path: "404",
    loadComponent: () =>
      import("../app/page-not-found/page-not-found").then(
        (m) => m.PageNotFound,
      ),
    data: {
      title: ConfigDB.wordings.page_not_found.title,
      description: ConfigDB.wordings.page_not_found.description,
    },
    canActivate: [AuthGuardMaintenance],
  },
  {
    path: "maintenance",
    loadComponent: () =>
      import("../app/maintenance/maintenance").then((m) => m.Maintenance),
    data: {
      title: ConfigDB.wordings.maintenance.title,
      description: ConfigDB.wordings.maintenance.description,
    },
    canActivate: [AuthGuarNotdMaintenance],
  },
  {
    path: "**",
    redirectTo: "/404",
    pathMatch: "full",
  },
];
