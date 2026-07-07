import { NgClass } from "@angular/common";
import { Component, inject, OnDestroy, OnInit } from "@angular/core";
import {
  ActivatedRoute,
  NavigationEnd,
  PRIMARY_OUTLET,
  Router,
  RouterModule,
} from "@angular/router";

import { map, Subject, takeUntil } from "rxjs";
import { filter } from "rxjs/operators";

import { ConfigDB } from "../../../data/config";

@Component({
  selector: "app-breadcrumb",
  imports: [RouterModule, NgClass],
  templateUrl: "./breadcrumb.html",
  styleUrls: ["./breadcrumb.scss"],
})
export class Breadcrumb implements OnInit, OnDestroy {
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private destroy$: Subject<boolean> = new Subject<boolean>();

  public url: string = "";
  public parentBreadcrumb: string | null;
  public parentPath: string | null;
  public childBreadcrumb: string | null;
  public title: string;
  public appName = ConfigDB.data.app_name;

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  ngOnInit(): void {
    this.activatedRoute.data
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        let title = data["title"];
        let child = data["breadcrumb"];
        this.title = title;
        this.childBreadcrumb = child;
      });
    if (this.activatedRoute.parent) {
      this.activatedRoute.parent.data
        .pipe(takeUntil(this.destroy$))
        .subscribe((data) => {
          let parent = data["breadcrumb"];
          let parentPath = data["path"];
          this.parentBreadcrumb = parent;
          this.parentPath = parentPath;
        });
    }
  }
}
