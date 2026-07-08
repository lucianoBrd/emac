
import {Component, Input} from "@angular/core";
import {ConfigDB} from "../../../data/config";
import {
  NgbAccordionBody,
  NgbAccordionButton,
  NgbAccordionCollapse,
  NgbAccordionDirective, NgbAccordionHeader, NgbAccordionItem
} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-info",
  imports: [
    NgbAccordionBody,
    NgbAccordionButton,
    NgbAccordionCollapse,
    NgbAccordionDirective,
    NgbAccordionHeader,
    NgbAccordionItem
  ],
  templateUrl: "./info.html",
  styleUrls: ["./info.scss"],
})
export class Info {
  public wordings = ConfigDB.wordings.general;
  @Input()
  public description: string[];
  @Input()
  public title: string;
  @Input()
  public subTitle?: string;
}
