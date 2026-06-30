
import { Component } from "@angular/core";

import { CarouselModule } from "ngx-owl-carousel-o";

@Component({
  selector: "app-event-pricing",
  imports: [CarouselModule],
  templateUrl: "./event-pricing.html",
  styleUrls: ["./event-pricing.scss"],
})
export class EventPricing {
  pricing = [
    {
      icon: "rocket-ship",
      package: "free",
      feature1: "Easy Installations",
      feature2: "Unlimited support",
      feature3: "Free Forever",
      price: "0",
      btn: "purchase",
    },
    {
      icon: "diamond",
      package: "Mediam",
      feature1: "Easy Installations",
      feature2: "Unlimited support",
      feature3: "Free Forever",
      price: "49",
      btn: "purchase",
    },
    {
      icon: "pie-chart",
      package: "Business",
      feature1: "Easy Installations",
      feature2: "Unlimited support",
      feature3: "Free Forever",
      price: "99",
      btn: "purchase",
    },
  ];

  pricingcarouselOptions = {
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
}
