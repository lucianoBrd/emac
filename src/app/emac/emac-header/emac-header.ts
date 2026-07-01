import { Component, ElementRef, OnInit } from "@angular/core";

import VanillaTilt from "vanilla-tilt";

import { ConfigDB } from "../../shared/data/config";

@Component({
  selector: "app-emac-header",
  templateUrl: "./emac-header.html",
  styleUrls: ["./emac-header.scss"],
})
export class EmacHeader implements OnInit {
  public wording = ConfigDB.wordings.emac;

  constructor(private el: ElementRef) {}

  onRedirect(e: { preventDefault: () => void }) {
    e.preventDefault();
    let el: HTMLElement | null = document.getElementById("register");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }

  ngOnInit(): void {
    VanillaTilt.init(this.el.nativeElement.querySelectorAll("[data-tilt]"), {
      max: 3,
      speed: 400,
      perspective: 400,
    });
  }
}
