import {Component, ElementRef, inject, Input} from "@angular/core";

import VanillaTilt from "vanilla-tilt";
import {Header as HeaderInterface} from "../../../models/shared/header.interface";

@Component({
  selector: "app-header",
  imports: [],
  templateUrl: "./header.html",
  styleUrls: ["./header.scss"],
})
export class Header {
  @Input()
  public header: HeaderInterface;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    VanillaTilt.init(this.el.nativeElement.querySelectorAll("[data-tilt]"), {
      max: 3,
      speed: 400,
      perspective: 400,
    });
  }
}
