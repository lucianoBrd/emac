import {
  afterNextRender,
  Component,
  DestroyRef,
  ElementRef,
  Input,
} from "@angular/core";

import type { HTMLVanillaTiltElement } from "vanilla-tilt";

import { Header as HeaderInterface } from "../../../models/shared/header.interface";

@Component({
  selector: "app-header",
  imports: [],
  templateUrl: "./header.html",
  styleUrls: ["./header.scss"],
})
export class Header {
  @Input()
  public header: HeaderInterface;

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
        perspective: 400,
      });
    });
    destroyRef.onDestroy(() => {
      destroyed = true;
      elements?.forEach((element) => element.vanillaTilt?.destroy());
    });
  }
}
