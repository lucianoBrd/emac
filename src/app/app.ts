import {Component, inject, signal, WritableSignal} from "@angular/core";
import { NavigationEnd, Router, RouterOutlet } from "@angular/router";

import { Loader } from "./shared/components/loader/loader";
import { Meta } from "./shared/components/meta/meta";
import { ConfigDB } from "./shared/data/config";
import { CustomizerService } from "./shared/service/customizer.service";
import {MusicSidebar} from "./shared/components/pages/music/music-sidebar/music-sidebar";
import {MusicService} from "./shared/service/music.service";
import {takeUntil} from "rxjs";
import {Title} from "./shared/models/shared/title.interface";

@Component({
  selector: "app-root",
    imports: [RouterOutlet, Loader, Meta, MusicSidebar],
  templateUrl: "./app.html",
  styleUrl: "./app.scss",
})
export class App {
  private musicService: MusicService = inject(MusicService);
  public customize: CustomizerService = inject(CustomizerService);
  public wordingsSettings = ConfigDB.wordings.settings;

  public url: string;
  public layoutType: string = "light";
  currentTrack: WritableSignal<Title|undefined> = signal(undefined);

  constructor(private router: Router) {
    this.router.events.subscribe((event): void => {
      if (!(event instanceof NavigationEnd)) {
        return;
      }
      this.url = event.url;
      window.scrollTo(0, 0);
    });
    this.musicService.currentTrack$
        .subscribe((data: Title|undefined): void => {
          this.currentTrack.set(data);
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

  sideBar(): void {
    this.musicService.sideBar();
  }
}
