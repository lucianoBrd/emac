import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";

import { ConfigDB } from "../shared/data/config";

@Component({
  selector: "app-page-not-found",
  imports: [RouterLink],
  templateUrl: "./page-not-found.html",
  styleUrls: ["./page-not-found.scss"],
})
export class PageNotFound {
  public wordings = {
    page_not_found: ConfigDB.wordings.page_not_found,
    general: ConfigDB.wordings.general,
  };
}
