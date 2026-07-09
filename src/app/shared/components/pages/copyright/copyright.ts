import { Component, inject, Input } from "@angular/core";

import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

import { ConfigDB } from "../../../data/config";
import { EmacDB } from "../../../data/emac";
import { Social } from "../../../models/shared/social.interface";

@Component({
  selector: "app-copyright",
  imports: [],
  templateUrl: "./copyright.html",
  styleUrls: ["./copyright.scss"],
})
export class Copyright {
  public wordings = {
    general: ConfigDB.wordings.general,
    privacy_policy: ConfigDB.wordings.privacy_policy,
    app_name: ConfigDB.data.app_name,
  };
  public social: Social = EmacDB.emac.social;
  public year: number = new Date().getFullYear();
  @Input()
  public copyrightClass: string = "";

  private modalService = inject(NgbModal);

  openVerticallyCentered(content: unknown) {
    this.modalService.open(content, { centered: true, size: "lg" });
  }
}
