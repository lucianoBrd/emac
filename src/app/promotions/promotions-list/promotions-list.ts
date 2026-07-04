import {Component, inject} from "@angular/core";

import { Menu } from "../../shared/components/navigation/menu/menu";
import {CarouselModule} from "ngx-owl-carousel-o";
import {DatePipe} from "@angular/common";
import {PromotionService} from "../../shared/service/promotion.service";
import {ConfigDB} from "../../shared/data/config";
import {Promotion} from "../../shared/models/promotion.interface";
import {RouterLink} from "@angular/router";

@Component({
  selector: "promotions-list",
  imports: [Menu, CarouselModule, DatePipe, RouterLink],
  templateUrl: "./promotions-list.html",
  styleUrls: ["./promotions-list.scss"],
})
export class PromotionsList {
  private promotionService: PromotionService = inject(PromotionService);

  public wording = {
    promotion: ConfigDB.wordings.promotion,
    general: ConfigDB.wordings.general,
  };
  public promotions: Promotion[];
  public numberOfPromotion: number;
  public promotionCarouselOptions = {
    items: 3,
    margin: 30,
    nav: false,
    autoplay: false,
    slideSpeed: 300,
    paginationSpeed: 400,
    loop: true,
    dots: false,
    responsive: {
      0: {
        items: 1,
        margin: 10,
      },
      480: {
        items: 2,
        margin: 10,
      },
      992: {
        items: 3,
        margin: 10,
      },
    },
  };

  constructor() {
    this.promotions = this.promotionService.getPromotions().slice(0, 4);
    this.numberOfPromotion = this.promotionService.getLength();
  }
}
