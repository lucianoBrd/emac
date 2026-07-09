import { Component, Input } from "@angular/core";

import {
  NgbAccordionBody,
  NgbAccordionButton,
  NgbAccordionCollapse,
  NgbAccordionDirective,
  NgbAccordionHeader,
  NgbAccordionItem,
} from "@ng-bootstrap/ng-bootstrap";

import { ConfigDB } from "../../../data/config";
import { Info as InfoInterface } from "../../../models/shared/info.interface";

@Component({
  selector: "app-info",
  imports: [
    NgbAccordionBody,
    NgbAccordionButton,
    NgbAccordionCollapse,
    NgbAccordionDirective,
    NgbAccordionHeader,
    NgbAccordionItem,
  ],
  templateUrl: "./info.html",
  styleUrls: ["./info.scss"],
})
export class Info {
  public wordings = ConfigDB.wordings.general;
  @Input()
  public info: InfoInterface;
}
