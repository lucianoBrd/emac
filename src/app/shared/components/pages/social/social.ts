import { Component, Input } from "@angular/core";

import { Social as SocialInterface } from "../../../models/shared/social.interface";

@Component({
  selector: "app-social",
  templateUrl: "./social.html",
  styleUrls: ["./social.scss"],
})
export class Social {
  @Input()
  public social: SocialInterface;
}
