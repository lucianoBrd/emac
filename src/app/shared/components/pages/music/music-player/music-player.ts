import {
  Component,
  inject,
  Input,
  OnDestroy,
  OnInit,
  signal,
  WritableSignal,
} from "@angular/core";

import { Subject, takeUntil } from "rxjs";

import { Album } from "../../../../models/shared/album.interface";
import { MusicService } from "../../../../service/music.service";

@Component({
  selector: "app-music-player",
  imports: [],
  templateUrl: "./music-player.html",
  styleUrls: ["./music-player.scss"],
})
export class MusicPlayer implements OnInit, OnDestroy {
  private musicService: MusicService = inject(MusicService);
  private destroy$: Subject<boolean> = new Subject<boolean>();

  @Input()
  public album: Album;

  isPlaying: WritableSignal<boolean> = signal(false);

  ngOnInit() {
    this.musicService.isPlaying$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: boolean): void => {
        if (!this.musicService.checkAlbum(this.album)) {
          this.isPlaying.set(false);
          return;
        }
        this.isPlaying.set(data);
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  handlePlayPause() {
    if (!this.musicService.checkAlbum(this.album)) {
      this.musicService.setAlbum(this.album);
    }

    this.musicService.handlePlayPause();
  }

  sideBar(): void {
    this.musicService.setAlbum(this.album);
    this.musicService.sideBar();
  }
}
