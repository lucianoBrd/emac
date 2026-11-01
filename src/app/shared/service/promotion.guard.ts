import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";

import { PromotionDB } from "../data/promotion";

export const promotionGuard: CanActivateFn = (route) => {
  const promotion = PromotionDB.list.find(
    (item) => item.id === route.paramMap.get("promotionId"),
  );
  const valid =
    promotion &&
    (!route.routeConfig?.path?.endsWith("/gallery") ||
      promotion.gallery?.gallery.length);
  return valid ? true : inject(Router).createUrlTree(["/404"]);
};
