import {Component, ElementRef, Input, OnInit} from "@angular/core";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import VanillaTilt from "vanilla-tilt";
import {ConfigDB} from "../../../data/config";
import {About as AboutInterface} from "../../../models/shared/about.interface";


@Component({
  selector: "app-about",
  imports: [NgbModule],
  templateUrl: "./about.html",
  styleUrls: ["./about.scss"],
})
export class About implements OnInit {
  @Input()
  public about: AboutInterface;
  public wordings = ConfigDB.wordings.general;

  constructor(
    private el: ElementRef,
  ) {
  }

  ngOnInit(): void {
    VanillaTilt.init(this.el.nativeElement.querySelectorAll("[data-tilt]"), {
      max: 3,
      speed: 400,
      perspective: 500,
    });
  }
}
