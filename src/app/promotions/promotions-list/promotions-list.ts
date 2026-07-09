import { DatePipe } from "@angular/common";
import { Component, inject } from "@angular/core";
import { RouterLink, RouterOutlet } from "@angular/router";

import { CarouselModule } from "ngx-owl-carousel-o";

import { Breadcrumb } from "../../shared/components/pages/breadcrumb/breadcrumb";
import { Copyright } from "../../shared/components/pages/copyright/copyright";
import { Filter } from "../../shared/components/pages/filter/filter";
import { Nav } from "../../shared/components/pages/nav/nav";
import { TapToTop } from "../../shared/components/tap-to-top/tap-to-top";
import { ConfigDB } from "../../shared/data/config";
import { Promotion } from "../../shared/models/promotion.interface";
import { FilterService } from "../../shared/service/filter.service";
import { PromotionService } from "../../shared/service/promotion.service";

@Component({
  selector: "promotions-list",
  imports: [
    CarouselModule,
    DatePipe,
    RouterLink,
    Filter,
    Breadcrumb,
    Nav,
    RouterOutlet,
    Copyright,
    TapToTop,
  ],
  templateUrl: "./promotions-list.html",
  styleUrls: ["./promotions-list.scss"],
})
export class PromotionsList {
  private promotionService: PromotionService = inject(PromotionService);
  private filterService: FilterService = inject(FilterService);

  public wordings = {
    promotion: ConfigDB.wordings.promotion,
    general: ConfigDB.wordings.general,
  };
  public promotions: Promotion[];
  public numberOfPromotion: number;

  constructor() {
    this.promotions = this.promotionService.getPromotions();
    this.numberOfPromotion = this.promotionService.getLength();
  }

  public filter = (search: string): void => {
    this.promotions = this.filterService.transform(
      this.promotionService.getPromotions(),
      search,
    );
  };
}
