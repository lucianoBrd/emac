import {Component, Input} from "@angular/core";

import { Menu } from "../../navigation/menu/menu";
import {RouterLink} from "@angular/router";
import {EmacDB} from "../../../data/emac";

@Component({
  selector: "app-nav",
  imports: [Menu, RouterLink],
  templateUrl: "./nav.html",
  styleUrls: ["./nav.scss"],
})
export class Nav {
  public emacTitle = EmacDB.emac.title;
  @Input()
  public headerClass: string = 'event loding-header nav-abs custom-scroll nav-lg';
}
