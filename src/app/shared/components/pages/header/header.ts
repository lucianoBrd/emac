import {Component, ElementRef, inject, Input} from "@angular/core";

import VanillaTilt from "vanilla-tilt";

@Component({
  selector: "app-header",
  imports: [],
  templateUrl: "./header.html",
  styleUrls: ["./header.scss"],
})
export class Header {
  @Input()
  public leftText: string[];
  @Input()
  public background: string|null;
  @Input()
  public logo: string;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    VanillaTilt.init(this.el.nativeElement.querySelectorAll("[data-tilt]"), {
      max: 3,
      speed: 400,
      perspective: 400,
    });
  }
}
