import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";

import { EmacAbout } from "./emac-about/emac-about";
import { EmacTradition } from "./emac-tradition/emac-tradition";
import { EventCopyright } from "./emac-copyright/event-copyright";
import { EmacCounter } from "./emac-counter/emac-counter";
import { EmacHeader } from "./emac-header/emac-header";
import { EmacNav } from "./emac-nav/emac-nav";
import { EmacPromotion } from "./emac-promotion/emac-promotion";
import { EmacSong } from "./emac-song/emac-song";
import { EmacInfo } from "./emac-info/emac-info";
import {EmacContact} from "./emac-contact/emac-contact";

@Component({
  selector: "app-emac",
  imports: [
    EmacNav,
    EmacPromotion,
    EmacAbout,
    EmacTradition,
    EmacInfo,
    EmacHeader,
    EventCopyright,
    EmacCounter,
    EmacSong,
    EmacInfo,
    EmacContact,
  ],
  templateUrl: "./emac.html",
  styleUrls: ["./emac.scss"],
})
export class Emac {

}
