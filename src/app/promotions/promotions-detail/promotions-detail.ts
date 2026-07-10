import { DatePipe } from "@angular/common";
import {
  Component,
  inject,
  Input as RouterInput,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { ActivatedRoute, RouterLink, RouterOutlet } from "@angular/router";

import { CarouselModule } from "ngx-owl-carousel-o";
import { Subject, takeUntil } from "rxjs";

import { About } from "../../shared/components/pages/about/about";
import { Breadcrumb } from "../../shared/components/pages/breadcrumb/breadcrumb";
import { Copyright } from "../../shared/components/pages/copyright/copyright";
import { Filter } from "../../shared/components/pages/filter/filter";
import { Footer } from "../../shared/components/pages/footer/footer";
import { Header } from "../../shared/components/pages/header/header";
import { Info } from "../../shared/components/pages/info/info";
import { Nav } from "../../shared/components/pages/nav/nav";
import { Social } from "../../shared/components/pages/social/social";
import { Song } from "../../shared/components/pages/song/song";
import { TapToTop } from "../../shared/components/tap-to-top/tap-to-top";
import { ConfigDB } from "../../shared/data/config";
import { Promotion } from "../../shared/models/promotion.interface";
import { FilterService } from "../../shared/service/filter.service";
import { MetaService } from "../../shared/service/meta.service";
import { PromotionService } from "../../shared/service/promotion.service";

@Component({
  selector: "promotions-detail",
  imports: [
    CarouselModule,
    DatePipe,
    RouterLink,
    Filter,
    Breadcrumb,
    Nav,
    RouterOutlet,
    Header,
    Info,
    About,
    Song,
    Copyright,
    TapToTop,
    Footer,
    Social,
  ],
  templateUrl: "./promotions-detail.html",
  styleUrls: ["./promotions-detail.scss"],
})
export class PromotionsDetail implements OnInit, OnDestroy {
  private promotionService: PromotionService = inject(PromotionService);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private metaService: MetaService = inject(MetaService);
  private destroy$: Subject<boolean> = new Subject<boolean>();

  public promotion: Promotion | undefined;
  public wordings = ConfigDB.wordings.promotion.detail;

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

          if (this.promotion) {
            this.metaService.setKeywords(keywords + "," + this.promotion.title);
            this.metaService.setTitle(keywords + " " + this.promotion.title);
            this.metaService.setDescription(
              this.promotion.info.description.at(0),
            );
          }
        }
      });
  }
}
