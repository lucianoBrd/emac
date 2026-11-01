import { PrerenderFallback, RenderMode, ServerRoute } from "@angular/ssr";

import { PromotionDB } from "./shared/data/promotion";

export const serverRoutes: ServerRoute[] = [
  { path: "", renderMode: RenderMode.Prerender },
  { path: "promotions", renderMode: RenderMode.Prerender },
  {
    path: "promotions/:promotionId/gallery",
    renderMode: RenderMode.Prerender,
    fallback: PrerenderFallback.None,
    async getPrerenderParams() {
      return PromotionDB.list
        .filter((promotion) => promotion.gallery?.gallery.length)
        .map((promotion) => ({ promotionId: promotion.id }));
    },
  },
  {
    path: "promotions/:promotionId",
    renderMode: RenderMode.Prerender,
    fallback: PrerenderFallback.None,
    async getPrerenderParams() {
      return PromotionDB.list.map((promotion) => ({
        promotionId: promotion.id,
      }));
    },
  },
  { path: "404", renderMode: RenderMode.Prerender },
  { path: "**", renderMode: RenderMode.Client },
];
