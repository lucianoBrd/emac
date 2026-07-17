import {
  Component,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  signal,
  ViewChild,
  WritableSignal,
} from "@angular/core";

import { Subject, takeUntil } from "rxjs";

import { ConfigDB } from "../../../../data/config";
import { Album } from "../../../../models/shared/album.interface";
import { Title } from "../../../../models/shared/title.interface";
import { MusicService } from "../../../../service/music.service";

@Component({
  selector: "app-music-sidebar",
  imports: [],
  templateUrl: "./music-sidebar.html",
  styleUrls: ["./music-sidebar.scss"],
})
export class MusicSidebar implements OnInit, OnDestroy {
  private musicService: MusicService = inject(MusicService);
  private destroy$: Subject<boolean> = new Subject<boolean>();

  @ViewChild("jpProgress") jpProgress: ElementRef<HTMLElement>;

  public album: Album;
  public sideBarDisplay: string = "none";
  public wordings = ConfigDB.wordings.general.empty_items;

  currentTrackIndex: WritableSignal<number> = signal(0);
  currentTrack: WritableSignal<Title | undefined> = signal(undefined);
  isPlaying: WritableSignal<boolean> = signal(false);
  progress: WritableSignal<number> = signal(0);

  ngOnInit() {
    this.musicService.currentTrackIndex$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: number): void => {
        this.currentTrackIndex.set(data);
      });
    this.musicService.currentTrack$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: Title | undefined): void => {
        this.currentTrack.set(data);
      });
    this.musicService.isPlaying$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: boolean): void => {
        this.isPlaying.set(data);
      });
    this.musicService.progress$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: number): void => {
        this.progress.set(data);
      });
    this.musicService.sidebar$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: boolean): void => {
        if (!data) {
          return;
        }
        this.sideBar();
      });
    this.musicService.album$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: Album | undefined): void => {
        if (!data) {
          return;
        }
        this.album = data;
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  sideBar() {
    this.sideBarDisplay == "none"
      ? (this.sideBarDisplay = "block")
      : (this.sideBarDisplay = "none");
  }

  handlePlayPause() {
    this.musicService.handlePlayPause();
  }

  handleNext() {
    this.musicService.handleNext();
  }

  handlePrevious() {
    this.musicService.handlePrevious();
  }

  handleTrackSelectByTitle(title: Title): void {
    this.musicService.handleTrackSelectByTitle(title);
  }

  handleSeek(event: PointerEvent) {
    const bcr = this.jpProgress.nativeElement.getBoundingClientRect();
    this.musicService.handleSeek(
      ((event.clientX - bcr.left) / bcr.width) * 100,
    );
  }
}
