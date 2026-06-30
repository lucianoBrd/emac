import { Component, DOCUMENT, inject, Inject, Renderer2 } from "@angular/core";
import { NavigationEnd, Router, RouterOutlet } from "@angular/router";

import { Loader } from "./shared/components/loader/loader";
import { Meta } from "./shared/components/meta/meta";
import { CustomizerService } from "./shared/service/customizer.service";
import {ConfigDB} from "./shared/data/config";

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

  constructor(
    private router: Router,
    private _renderer2: Renderer2,
    @Inject(DOCUMENT) private _document: Document,
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.url = event.url;
      }
    });
  }

  public ngOnInit() {
    let script = this._renderer2.createElement("script");
    script.src = `/assets/tilt.js`;
    this._renderer2.appendChild(this._document.body, script);
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
