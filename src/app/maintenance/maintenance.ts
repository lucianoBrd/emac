import { Component } from "@angular/core";

import { ConfigDB } from "../shared/data/config";
import { SocialListDB } from "../shared/data/emac/social-list";
import { Social } from "../shared/models/emac/social.interface";
import {TraditionService} from "../shared/service/emac/tradition.service";
import {SocialService} from "../shared/service/emac/social.service";

@Component({
  selector: "app-maintenance",
  imports: [],
  templateUrl: "./maintenance.html",
  styleUrls: ["./maintenance.scss"],
})
export class Maintenance {
  public wordings = {
    maintenance: ConfigDB.wordings.maintenance,
    app_name: ConfigDB.data.app_name,
  };
  public socials: Social[] = SocialListDB.list;

  constructor(private socialService: SocialService) {
    this.socials = this.socialService.getSocials();
  }
}
