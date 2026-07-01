import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";

import { EventAbout } from "./event-about/event-about";
import { EventBlog } from "./event-blog/event-blog";
import { EventBooking } from "./event-booking/event-booking";
import { EventContact } from "./event-contact/event-contact";
import { EventCopyright } from "./event-copyright/event-copyright";
import { EventCounter } from "./event-counter/event-counter";
import { EventGallery } from "./event-gallery/event-gallery";
import { EmacHeader } from "./emac-header/emac-header";
import { EmacNav } from "./emac-nav/emac-nav";
import { EmacPromotion } from "./emac-promotion/emac-promotion";
import { EventSchedule } from "./event-schedule/event-schedule";
import { EventSpeaker } from "./event-speaker/event-speaker";
import { EventSponsor } from "./event-sponsor/event-sponsor";
import { EventSubscribe } from "./event-subscribe/event-subscribe";
import { EventTestimonial } from "./event-testimonial/event-testimonial";

@Component({
  selector: "app-emac",
  imports: [
    EmacNav,
    EmacPromotion,
    EventSponsor,
    EventAbout,
    EventBlog,
    EventBooking,
    EventContact,
    EmacHeader,
    EventCopyright,
    EventCounter,
    EventGallery,
    EventSchedule,
    EventSpeaker,
    EventSubscribe,
    EventTestimonial,
  ],
  templateUrl: "./emac.html",
  styleUrls: ["./emac.scss"],
})
export class Emac {

}
