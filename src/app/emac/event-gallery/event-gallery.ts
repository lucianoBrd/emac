
import { Component, ViewChild } from "@angular/core";

import {
  NgxMasonryComponent,
  NgxMasonryModule,
  NgxMasonryOptions,
} from "ngx-masonry";

@Component({
  selector: "app-event-gallery",
  imports: [NgxMasonryModule],
  templateUrl: "./event-gallery.html",
  styleUrls: ["./event-gallery.scss"],
})
export class EventGallery {
  @ViewChild("masonry") masonry: NgxMasonryComponent;

  public activeFilter = "all";
  public updateMasonryLayout: boolean = false;

  public myOptions: NgxMasonryOptions = {
    originTop: true,
  };

  public urlsAll: string[] = [
    "assets/images/event/gallery/1.jpg",
    "assets/images/event/gallery/2.jpg",
    "assets/images/event/gallery/1.jpg",
    "assets/images/event/gallery/2.jpg",
    "assets/images/event/gallery/3.jpg",
  ];

  public urlsFashion: string[] = [
    "assets/images/event/gallery/1.jpg",
    "assets/images/event/gallery/2.jpg",
  ];

  public urlsBags: string[] = [
    "assets/images/event/gallery/1.jpg",
    "assets/images/event/gallery/1.jpg",
    "assets/images/event/gallery/2.jpg",
  ];

  public filterImg(item: string) {
    this.activeFilter = item;
  }
}
