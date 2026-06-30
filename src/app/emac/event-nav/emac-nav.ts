import { Component } from "@angular/core";

import { Menu } from "../../shared/components/navigation/menu/menu";

@Component({
  selector: "app-emac-nav",
  imports: [Menu],
  templateUrl: "./emac-nav.html",
  styleUrls: ["./emac-nav.scss"],
})
export class EmacNav {}
