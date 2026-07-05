import {Component, inject, Input} from "@angular/core";

import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

import { TapToTop } from "../../tap-to-top/tap-to-top";
import { ConfigDB } from "../../../data/config";
import { SocialListDB } from "../../../data/emac/social-list";
import { Social } from "../../../models/emac/social.interface";
import { SocialService } from "../../../service/emac/social.service";

@Component({
  selector: "app-copyright",
  imports: [TapToTop],
  templateUrl: "./copyright.html",
  styleUrls: ["./copyright.scss"],
})
export class Copyright {
  public wordings = {
    general: ConfigDB.wordings.general,
    privacy_policy: ConfigDB.wordings.privacy_policy,
    app_name: ConfigDB.data.app_name,
  };
  public socials: Social[] = SocialListDB.list;
  public year: number = new Date().getFullYear();
  @Input()
  public copyrightClass: string = "";

  private modalService = inject(NgbModal);

  constructor(private socialService: SocialService) {
    this.socials = this.socialService.getSocials();
  }

  openVerticallyCentered(content: unknown) {
    this.modalService.open(content, { centered: true, size: "lg" });
  }
}
