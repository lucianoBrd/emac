import { Component, ElementRef, OnInit } from "@angular/core";

import VanillaTilt from "vanilla-tilt";

import { ConfigDB } from "../../shared/data/config";

@Component({
  selector: "app-emac-header",
  templateUrl: "./emac-header.html",
  styleUrls: ["./emac-header.scss"],
})
export class EmacHeader implements OnInit {
  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    VanillaTilt.init(this.el.nativeElement.querySelectorAll("[data-tilt]"), {
      max: 3,
      speed: 400,
      perspective: 400,
    });
  }
}
