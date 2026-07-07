import {Component, inject, OnInit} from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";

import { EmacAbout } from "./emac-about/emac-about";
import { EmacContact } from "./emac-contact/emac-contact";
import { EmacCounter } from "./emac-counter/emac-counter";
import { EmacInfo } from "./emac-info/emac-info";
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

@Component({
  selector: "app-emac",
  imports: [
    EmacPromotion,
    EmacAbout,
    EmacTradition,
    EmacInfo,
    EmacCounter,
    EmacSong,
    EmacInfo,
    EmacContact,
    Nav,
    Header,
    Copyright,
    TapToTop,
  ],
  templateUrl: "./emac.html",
  styleUrls: ["./emac.scss"],
})
export class Emac {
  public wordings = ConfigDB.wordings.emac.header;
  public emac: EmacInterface = inject(EmacService).getEmac();
}
