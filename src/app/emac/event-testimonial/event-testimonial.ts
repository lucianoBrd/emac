
import { Component } from "@angular/core";

import { CarouselModule } from "ngx-owl-carousel-o";

@Component({
  selector: "app-event-testimonial",
  imports: [CarouselModule],
  templateUrl: "./event-testimonial.html",
  styleUrls: ["./event-testimonial.scss"],
})
export class EventTestimonial {
  users = [
    {
      img: "assets/images/event/testimonial/L3-1.png",
    },
    {
      img: "assets/images/event/testimonial/L3-1.png",
    },
  ];

  testimonialCarouselOptions = {
    items: 1,
    margin: 0,
    autoHeight: true,
    nav: true,
    dots: false,
    navText: [
      '<img src="assets/images/music/gallery/gallery-icon/left.png">',
      '<img src="assets/images/music/gallery/gallery-icon/right.png">',
    ],
    autoplay: false,
    slideSpeed: 300,
    paginationSpeed: 400,
    loop: true,
  };
}
