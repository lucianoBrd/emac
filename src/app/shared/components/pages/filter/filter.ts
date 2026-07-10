import {
  Component,
  Input,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";

import { debounceTime, Observable, Subject, takeUntil } from "rxjs";

import { ConfigDB } from "../../../data/config";

@Component({
  selector: "app-filter",
  imports: [ReactiveFormsModule],
  templateUrl: "./filter.html",
  styleUrls: ["./filter.scss"],
})
export class Filter implements OnInit, OnDestroy {
  public wordings = ConfigDB.wordings.general.search;
  @Input()
  public filter: (search: string) => void;

  public search = new FormControl();
  private search$: Observable<string> = this.search.valueChanges;

  private destroy$: Subject<boolean> = new Subject<boolean>();

  ngOnInit() {
    this.search$
      .pipe(debounceTime(700), takeUntil(this.destroy$))
      .subscribe((data: string) => {
        let search: string = data;
        if (!search) {
          search = "";
        }
        this.filter(search);
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  filterProjects() {
    let search: string = this.search.value;
    if (!search) {
      search = "";
    }
    this.filter(search);
  }
}
