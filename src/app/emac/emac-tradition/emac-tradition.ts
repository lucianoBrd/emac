import { Component, ElementRef } from "@angular/core";

import { CarouselModule } from "ngx-owl-carousel-o";

import { About } from "../../shared/models/emac/about.interface";
import { Tradition } from "../../shared/models/emac/tradition.interface";
import { AboutService } from "../../shared/service/emac/about.service";
import { TraditionService } from "../../shared/service/emac/tradition.service";

@Component({
  selector: "app-emac-tradition",
  imports: [CarouselModule],
  templateUrl: "./emac-tradition.html",
  styleUrls: ["./emac-tradition.scss"],
})
export class EmacTradition {
  public traditions: Tradition[];
  public traditionCarouselOptions = {
    items: 3,
    margin: 60,
    nav: false,
    dots: false,
    autoplay: false,
    slideSpeed: 300,
    paginationSpeed: 400,
    loop: true,
    responsive: {
      0: {
        items: 1,
        margin: 10,
      },
      576: {
        items: 2,
        margin: 10,
      },
      991: {
        items: 2,
        margin: 10,
      },
      1200: {
        items: 3,
        margin: 30,
      },
    },
  };

  constructor(private traditionService: TraditionService) {
    this.traditions = this.traditionService.getTraditions();
  }
}
