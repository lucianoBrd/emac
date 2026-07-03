import { Component, inject } from "@angular/core";

import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

import { TapToTop } from "../../shared/components/tap-to-top/tap-to-top";
import { ConfigDB } from "../../shared/data/config";
import { SocialListDB } from "../../shared/data/emac/social-list";
import { Social } from "../../shared/models/emac/social.interface";
import { SocialService } from "../../shared/service/emac/social.service";

@Component({
  selector: "app-emac-copyright",
  imports: [TapToTop],
  templateUrl: "./event-copyright.html",
  styleUrls: ["./event-copyright.scss"],
})
export class EventCopyright {
  public wordings = {
    general: ConfigDB.wordings.general,
    privacy_policy: ConfigDB.wordings.privacy_policy,
    app_name: ConfigDB.data.app_name,
  };
  public socials: Social[] = SocialListDB.list;
  public year: number = new Date().getFullYear();

  private modalService = inject(NgbModal);

  constructor(private socialService: SocialService) {
    this.socials = this.socialService.getSocials();
  }

  openVerticallyCentered(content: unknown) {
    this.modalService.open(content, { centered: true, size: "lg" });
  }
}
