import { NgClass } from "@angular/common";
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
import {ConfigDB} from "../../../data/config";

@Component({
  selector: "app-breadcrumb",
  imports: [RouterModule, NgClass],
  templateUrl: "./breadcrumb.html",
  styleUrls: ["./breadcrumb.scss"],
})
export class Breadcrumb {
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);

  public url: string = "";
  public breadcrumbs:
    | {
        parentBreadcrumb?: string | null;
        parentPath?: string | null;
        childBreadcrumb?: string;
      }
    | undefined;
  public title: string;
    public appName = ConfigDB.data.app_name;
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
      .subscribe((event) => {//todo fix breadcrumb
        let title = event.snapshot.data["title"];
        let parent = event.parent!.snapshot.data["breadcrumb"];
        let parentPath = event.parent!.snapshot.data["path"];
        let child = event.snapshot.data["breadcrumb"];
        this.breadcrumbs = {};
        this.title = title;
        this.breadcrumbs = {
          parentBreadcrumb: parent,
          parentPath: parentPath,
          childBreadcrumb: child,
        };
      });
  }
}
