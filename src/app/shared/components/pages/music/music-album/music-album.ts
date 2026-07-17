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
import {ConfigDB} from "../../../../data/config";

@Component({
  selector: "app-music-album",
  imports: [],
  templateUrl: "./music-album.html",
  styleUrls: ["./music-album.scss"],
})
export class MusicAlbum implements OnInit, OnDestroy {
  private musicService: MusicService = inject(MusicService);
  private destroy$: Subject<boolean> = new Subject<boolean>();

  @Input()
  public album: Album;
  public wordings = ConfigDB.wordings.music.album;

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
    if (!this.musicService.checkAlbum(this.album)) {
      this.musicService.setAlbum(this.album);
    }

    if (!this.isPlaying()) {
      this.handlePlayPause();
    }

    this.musicService.sideBar();
  }
}
