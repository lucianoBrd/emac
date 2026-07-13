import { Component, inject, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import {
  Gallery,
  GalleryItem,
  IframeItem,
  ImageItem,
  ImageSize,
  ThumbnailsPosition,
  VideoItem,
} from "ng-gallery";
import { Lightbox } from "ng-gallery/lightbox";
import { CarouselModule } from "ngx-owl-carousel-o";
import { Subject, takeUntil } from "rxjs";

import { Empty } from "../../shared/components/empty/empty";
import { Breadcrumb } from "../../shared/components/pages/breadcrumb/breadcrumb";
import { Copyright } from "../../shared/components/pages/copyright/copyright";
import { Nav } from "../../shared/components/pages/nav/nav";
import { TapToTop } from "../../shared/components/tap-to-top/tap-to-top";
import { ConfigDB } from "../../shared/data/config";
import { GalleryType } from "../../shared/enum/gallery.type";
import { Promotion } from "../../shared/models/promotion.interface";
import {
  Item,
  Gallery as GalleryInterface,
} from "../../shared/models/shared/gallery.interface";
import { MetaService } from "../../shared/service/meta.service";
import { PromotionService } from "../../shared/service/promotion.service";

@Component({
  selector: "promotions-gallery",
  imports: [CarouselModule, Breadcrumb, Nav, Copyright, TapToTop, Empty],
  templateUrl: "./promotions-gallery.html",
  styleUrls: ["./promotions-gallery.scss"],
})
export class PromotionsGallery implements OnInit, OnDestroy {
  private promotionService: PromotionService = inject(PromotionService);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private metaService: MetaService = inject(MetaService);
  protected lightbox: Lightbox = inject(Lightbox);
  private gallery: Gallery = inject(Gallery);
  private destroy$: Subject<boolean> = new Subject<boolean>();

  public promotion: Promotion | undefined;
  public wordings = ConfigDB.wordings.promotion.gallery;
  public items: GalleryItem[];
  public promotionGallery: GalleryInterface | null = null;
  public galleryType: typeof GalleryType = GalleryType;

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  ngOnInit(): void {
    const keywords: string = this.wordings.title;

    this.metaService.setKeywords(keywords);
    this.metaService.setTitle(keywords);
    this.metaService.setDescription(keywords);

    this.activatedRoute.params
      .pipe(takeUntil(this.destroy$))
      .subscribe((params) => {
        /* Get slug */
        let promotionId: string = params["promotionId"];

        if (promotionId) {
          this.promotion = this.promotionService.getPromotion(promotionId);

          if (this.promotion?.gallery) {
            this.promotionGallery = this.promotion.gallery;
            this.updateNgGallery();
            this.metaService.setKeywords(keywords + "," + this.promotionGallery.title);
            this.metaService.setTitle(keywords + " " + this.promotionGallery.title);
            this.metaService.setDescription(
              this.promotionGallery.description,
            );
          }
        }
      });
  }

  updateNgGallery() {
    this.items = [];
    if (this.promotionGallery) {
      this.items = this.promotionGallery.gallery.map(
        (item: Item): ImageItem | VideoItem | IframeItem => {
          switch (item.type) {
            case GalleryType.video:
              return new VideoItem({
                src: [
                  {
                    url: item.image,
                    type: item.mimeType ? item.mimeType : "video/mp4",
                  },
                ],
                thumb: item.thumb
                  ? item.thumb
                  : "assets/images/general/play.png",
                poster: item.thumb
                  ? item.thumb
                  : "assets/images/general/play.png",
                autoplay: true,
                controls: true,
                loop: true,
              });
            case GalleryType.youtube:
              return new IframeItem({
                src: item.image,
                thumb: item.thumb
                  ? item.thumb
                  : "assets/images/general/play.png",
              });
            default:
              return new ImageItem({
                src: item.image,
                thumb: item.thumb ? item.thumb : item.image,
                alt: item.description,
              });
          }
        },
      );
    }

    const lightboxRef = this.gallery.ref("lightbox");
    lightboxRef.setConfig({
      imageSize: ImageSize.Cover,
      thumbPosition: ThumbnailsPosition.Top,
      thumbs: false,
    });
    lightboxRef.load(this.items);
  }
}
