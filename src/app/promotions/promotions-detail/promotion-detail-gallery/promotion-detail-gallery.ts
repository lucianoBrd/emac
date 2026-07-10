import { Component, inject, Input } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { RouterLink } from "@angular/router";

import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { CarouselModule } from "ngx-owl-carousel-o";

import { ConfigDB } from "../../../shared/data/config";
import { GalleryType } from "../../../shared/enum/gallery.type";
import { Gallery } from "../../../shared/models/shared/gallery.interface";

@Component({
  selector: "promotion-detail-gallery",
  imports: [CarouselModule, RouterLink],
  templateUrl: "./promotion-detail-gallery.html",
  styleUrls: ["./promotion-detail-gallery.scss"],
})
export class PromotionDetailGallery {
  private sanitizer: DomSanitizer = inject(DomSanitizer);
  private modalService = inject(NgbModal);

  @Input()
  public gallery: Gallery;
  public galleryType: typeof GalleryType = GalleryType;
  public wordings = ConfigDB.wordings.general;

  public galleryCarouselOptions = {
    items: 3,
    margin: 60,
    nav: false,
    dots: false,
    autoplay: false,
    slideSpeed: 300,
    paginationSpeed: 400,
    loop: true,
    responsive: {
      0: {
        items: 1,
        margin: 10,
      },
      576: {
        items: 2,
        margin: 10,
      },
      991: {
        items: 2,
        margin: 10,
      },
      1200: {
        items: 3,
        margin: 30,
      },
    },
  };

  public updateVideoUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  public openVerticallyCentered(content: unknown) {
    this.modalService.open(content, { centered: true, size: "lg" });
  }
}
