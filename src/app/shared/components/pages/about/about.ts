import {
  afterNextRender,
  Component,
  DestroyRef,
  ElementRef,
  Input,
} from "@angular/core";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { ConfigDB } from "../../../data/config";
import { About as AboutInterface } from "../../../models/shared/about.interface";

import type { HTMLVanillaTiltElement } from "vanilla-tilt";

@Component({
  selector: "app-about",
  imports: [NgbModule],
  templateUrl: "./about.html",
  styleUrls: ["./about.scss"],
})
export class About {
  @Input()
  public about: AboutInterface;
  public wordings = ConfigDB.wordings.general;

  constructor(el: ElementRef<HTMLElement>, destroyRef: DestroyRef) {
    let destroyed = false;
    let elements: NodeListOf<HTMLVanillaTiltElement> | undefined;
    afterNextRender(async () => {
      const { default: VanillaTilt } = await import("vanilla-tilt");
      if (destroyed) return;
      elements =
        el.nativeElement.querySelectorAll<HTMLVanillaTiltElement>(
          "[data-tilt]",
        );
      VanillaTilt.init(Array.from(elements), {
        max: 3,
        speed: 400,
        perspective: 500,
      });
    });
    destroyRef.onDestroy(() => {
      destroyed = true;
      elements?.forEach((element) => element.vanillaTilt?.destroy());
    });
  }
}
