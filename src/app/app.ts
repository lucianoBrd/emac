import { Component, inject } from "@angular/core";
import { NavigationEnd, Router, RouterOutlet } from "@angular/router";

import { Loader } from "./shared/components/loader/loader";
import { Meta } from "./shared/components/meta/meta";
import { ConfigDB } from "./shared/data/config";
import { CustomizerService } from "./shared/service/customizer.service";

@Component({
  selector: "app-root",
  imports: [RouterOutlet, Loader, Meta],
  templateUrl: "./app.html",
  styleUrl: "./app.scss",
})
export class App {
  public customize: CustomizerService = inject(CustomizerService);
  public wordingsSettings = ConfigDB.wordings.settings;

  public url: string;
  public layoutType: string = "light";

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.url = event.url;
      }
    });
  }

  customizeLayoutVersion(val: string) {
    this.customize.setLayoutVersion(val);
    this.layoutType = val;
  }

  customizeLayoutType(val: string) {
    this.customize.setLayoutType(val);
    this.layoutType = val;
  }
}
