import { Component, inject, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";

import { Subject, takeUntil } from "rxjs";

import { ConfigDB } from "../../../data/config";

@Component({
  selector: "app-breadcrumb",
  imports: [RouterModule],
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
        const title = data["title"];
          const child = data["breadcrumb"];
          const parentBreadcrumb = data["parentBreadcrumb"];
          const parentPath = data["parentPath"];
          const pathParameter = data["pathParameter"];
        this.title = title;
        this.childBreadcrumb = child;

        if (parentBreadcrumb) {
            this.activatedRoute.params
                .pipe(takeUntil(this.destroy$))
                .subscribe((params) => {
                    const parameter: string = params[pathParameter];
                    if (parameter) {
                        this.parentBreadcrumb = parentBreadcrumb.replace(":" + pathParameter, parameter);
                        this.parentPath = parentPath.replace(":" + pathParameter, parameter);
                    } else {
                        this.parentBreadcrumb = parentBreadcrumb;
                        this.parentPath = parentPath;
                    }
                });
        }
      });
    // if (this.activatedRoute.parent) {
    //   this.activatedRoute.parent.data
    //     .pipe(takeUntil(this.destroy$))
    //     .subscribe((data) => {
    //         const parent = data["breadcrumb"];
    //         const parentPath = data["path"];
    //       this.parentBreadcrumb = parent;
    //       this.parentPath = parentPath;
    //     });
    // }
  }
}
