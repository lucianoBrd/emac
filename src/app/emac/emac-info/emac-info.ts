
import { Component } from "@angular/core";
import {ConfigDB} from "../../shared/data/config";

@Component({
  selector: "app-emac-info",
  imports: [],
  templateUrl: "./emac-info.html",
  styleUrls: ["./emac-info.scss"],
})
export class EmacInfo {
  public wording = ConfigDB.wordings.emac.info;
}
