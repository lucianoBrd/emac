import {Component, inject, OnInit} from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";

import { EmacContact } from "./emac-contact/emac-contact";
import { EmacCounter } from "./emac-counter/emac-counter";
import { EmacPromotion } from "./emac-promotion/emac-promotion";
import { EmacSong } from "./emac-song/emac-song";
import { EmacTradition } from "./emac-tradition/emac-tradition";
import { Copyright } from "../shared/components/pages/copyright/copyright";
import { Header } from "../shared/components/pages/header/header";
import { Nav } from "../shared/components/pages/nav/nav";
import { ConfigDB } from "../shared/data/config";
import {TapToTop} from "../shared/components/tap-to-top/tap-to-top";
import {PromotionService} from "../shared/service/promotion.service";
import {EmacService} from "../shared/service/emac.service";
import {Emac as EmacInterface} from "../shared/models/emac.interface";
import {Info} from "../shared/components/pages/info/info";
import {About} from "../shared/components/pages/about/about";

@Component({
  selector: "app-emac",
  imports: [
    EmacPromotion,
    EmacTradition,
    EmacCounter,
    EmacSong,
    EmacContact,
    Nav,
    Header,
    Copyright,
    TapToTop,
    Info,
    About,
  ],
  templateUrl: "./emac.html",
  styleUrls: ["./emac.scss"],
})
export class Emac {
  public emac: EmacInterface = inject(EmacService).getEmac();
}
