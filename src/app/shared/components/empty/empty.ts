import { Component } from "@angular/core";
import {ConfigDB} from "../../data/config";

@Component({
  selector: "app-empty",
  imports: [],
  templateUrl: "./empty.html",
  styleUrls: ["./empty.scss"],
})
export class Empty {
  public wordings = ConfigDB.wordings.general.empty_items;
}
