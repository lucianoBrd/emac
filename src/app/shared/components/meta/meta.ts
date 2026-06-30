import { Component, inject } from "@angular/core";
import {
  ActivatedRoute,
  NavigationEnd,
  PRIMARY_OUTLET,
  Router,
  RouterModule,
} from "@angular/router";

import { map } from "rxjs";
import { filter } from "rxjs/operators";

import { MetaService } from "../../service/meta.service";

@Component({
  selector: "app-meta",
  imports: [RouterModule],
  templateUrl: "./meta.html",
  styleUrls: ["./meta.scss"],
})
export class Meta {
  private metaService = inject(MetaService);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);

  public url: string = "";

  constructor() {
    this.router.events
      .pipe(
        filter((event) => {
          if (event instanceof NavigationEnd) {
            this.url = event.url;
          }
          return event instanceof NavigationEnd;
        }),
      )
      .pipe(map(() => this.activatedRoute))
      .pipe(
        map((route) => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
      )
      .pipe(filter((route) => route.outlet === PRIMARY_OUTLET))
      .subscribe((event) => {
        const title = event.snapshot.data["title"];
        const description = event.snapshot.data["description"];
        const keywords = event.snapshot.data["keywords"];
        this.metaService.setTitle(title);
        this.metaService.setDescription(description);
        this.metaService.setKeywords(keywords);
      });
  }
}
