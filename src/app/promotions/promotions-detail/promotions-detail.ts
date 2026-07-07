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

import { Breadcrumb } from "../../shared/components/pages/breadcrumb/breadcrumb";
import { Filter } from "../../shared/components/pages/filter/filter";
import { Footer } from "../../shared/components/pages/footer/footer";
import { Header } from "../../shared/components/pages/header/header";
import { Nav } from "../../shared/components/pages/nav/nav";
import { ConfigDB } from "../../shared/data/config";
import { Promotion } from "../../shared/models/promotion.interface";
import { FilterService } from "../../shared/service/filter.service";
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
    Footer,
    RouterOutlet,
    Header,
  ],
  templateUrl: "./promotions-detail.html",
  styleUrls: ["./promotions-detail.scss"],
})
export class PromotionsDetail implements OnInit, OnDestroy {
  private promotionService: PromotionService = inject(PromotionService);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private destroy$: Subject<boolean> = new Subject<boolean>();

  public wordings = ConfigDB.wordings.emac.header;

  public promotion: Promotion | undefined;

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(takeUntil(this.destroy$))
      .subscribe((params) => {
        /* Get slug */
        let promotionId: string = params["promotionId"];

        if (promotionId) {
          this.promotion = this.promotionService.getPromotion(promotionId);
        }
      });
  }
}
