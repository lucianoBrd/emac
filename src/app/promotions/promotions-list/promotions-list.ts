import { DatePipe } from "@angular/common";
import { Component, inject } from "@angular/core";
import {RouterLink, RouterOutlet} from "@angular/router";

import { CarouselModule } from "ngx-owl-carousel-o";

import { Filter } from "../../shared/components/pages/filter/filter";
import { ConfigDB } from "../../shared/data/config";
import { Promotion } from "../../shared/models/promotion.interface";
import { FilterService } from "../../shared/service/filter.service";
import { PromotionService } from "../../shared/service/promotion.service";
import {Breadcrumb} from "../../shared/components/pages/breadcrumb/breadcrumb";
import {Nav} from "../../shared/components/pages/nav/nav";
import {Footer} from "../../shared/components/pages/footer/footer";

@Component({
  selector: "promotions-list",
  imports: [CarouselModule, DatePipe, RouterLink, Filter, Breadcrumb, Nav, Footer, RouterOutlet],
  templateUrl: "./promotions-list.html",
  styleUrls: ["./promotions-list.scss"],
})
export class PromotionsList {
  private promotionService: PromotionService = inject(PromotionService);
  private filterService: FilterService = inject(FilterService);

  public wording = {
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
