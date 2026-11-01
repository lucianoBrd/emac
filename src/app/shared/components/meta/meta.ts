import { Component, DestroyRef, inject } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { NavigationEnd, Router } from "@angular/router";

import { filter } from "rxjs";

import { MetaService } from "../../service/meta.service";

@Component({
  selector: "app-meta",
  templateUrl: "./meta.html",
  styleUrls: ["./meta.scss"],
})
export class Meta {
  private metaService = inject(MetaService);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  constructor() {
    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd,
        ),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((event) =>
        this.metaService.updatePage(event.urlAfterRedirects),
      );
  }
}
