import { Component, ElementRef, OnInit } from "@angular/core";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import VanillaTilt from "vanilla-tilt";

import { ConfigDB } from "../../shared/data/config";
import { About } from "../../shared/models/emac/about.interface";
import { AboutService } from "../../shared/service/emac/about.service";

@Component({
  selector: "app-emac-about",
  imports: [NgbModule],
  templateUrl: "./emac-about.html",
  styleUrls: ["./emac-about.scss"],
})
export class EmacAbout implements OnInit {
  public wording = {
    emac: ConfigDB.wordings.emac,
    general: ConfigDB.wordings.general,
  };
  public abouts: About[];

  constructor(
    private el: ElementRef,
    private aboutService: AboutService,
  ) {
    this.abouts = this.aboutService.getAbouts();
  }

  ngOnInit(): void {
    VanillaTilt.init(this.el.nativeElement.querySelectorAll("[data-tilt]"), {
      max: 3,
      speed: 400,
      perspective: 500,
    });
  }
}
