import { Component, inject, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";

import { EmacContact } from "./emac-contact/emac-contact";
import { EmacPromotion } from "./emac-promotion/emac-promotion";
import { EmacTradition } from "./emac-tradition/emac-tradition";
import { About } from "../shared/components/pages/about/about";
import { Copyright } from "../shared/components/pages/copyright/copyright";
import { Header } from "../shared/components/pages/header/header";
import { Info } from "../shared/components/pages/info/info";
import { Nav } from "../shared/components/pages/nav/nav";
import { Social } from "../shared/components/pages/social/social";
import { Song } from "../shared/components/pages/song/song";
import { TapToTop } from "../shared/components/tap-to-top/tap-to-top";
import { ConfigDB } from "../shared/data/config";
import { Emac as EmacInterface } from "../shared/models/emac.interface";
import { EmacService } from "../shared/service/emac.service";
import { PromotionService } from "../shared/service/promotion.service";

@Component({
  selector: "app-emac",
  imports: [
    EmacPromotion,
    EmacTradition,
    EmacContact,
    Nav,
    Header,
    Copyright,
    TapToTop,
    Info,
    About,
    Song,
    Social,
  ],
  templateUrl: "./emac.html",
  styleUrls: ["./emac.scss"],
})
export class Emac {
  public emac: EmacInterface = inject(EmacService).getEmac();
}
