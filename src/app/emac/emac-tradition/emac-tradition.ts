import { Component, inject } from "@angular/core";

import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { CarouselModule } from "ngx-owl-carousel-o";

import { ConfigDB } from "../../shared/data/config";
import { EmacDB } from "../../shared/data/emac";
import { Tradition } from "../../shared/models/emac/tradition.interface";

@Component({
  selector: "emac-tradition",
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
