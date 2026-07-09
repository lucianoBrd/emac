import {Component, ElementRef, inject} from "@angular/core";

import { CarouselModule } from "ngx-owl-carousel-o";

import { Tradition } from "../../shared/models/emac/tradition.interface";
import {ConfigDB} from "../../shared/data/config";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {EmacDB} from "../../shared/data/emac";

@Component({
  selector: "app-emac-tradition",
  imports: [CarouselModule],
  templateUrl: "./emac-tradition.html",
  styleUrls: ["./emac-tradition.scss"],
})
export class EmacTradition {
  public tradition: Tradition = EmacDB.emac.tradition;
  public wordings = ConfigDB.wordings.general.close;

  private modalService = inject(NgbModal);

  openVerticallyCentered(content: unknown) {
    this.modalService.open(content);
  }
}
