import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

import { MusicSidebar } from "../shared/components/pages/music/music-sidebar/music-sidebar";

@Component({
  selector: "app-promotions",
  imports: [RouterOutlet, MusicSidebar],
  templateUrl: "./promotions.html",
  styleUrls: ["./promotions.scss"],
})
export class Promotions {}
