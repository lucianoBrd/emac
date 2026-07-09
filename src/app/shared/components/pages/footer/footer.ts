import { Component, Input } from "@angular/core";

import { Footer as FooterInterface } from "../../../models/shared/footer.interface";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.html",
  styleUrls: ["./footer.scss"],
})
export class Footer {
  @Input()
  public footer: FooterInterface;
}
