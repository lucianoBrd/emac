import { Component } from "@angular/core";

import { ConfigDB } from "../shared/data/config";
import { EmacDB } from "../shared/data/emac";
import { Social } from "../shared/models/shared/social.interface";

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
  public social: Social = EmacDB.emac.social;
}
