import {
  Component,
  inject,
  Input,
  OnDestroy,
  OnInit,
  signal,
  WritableSignal,
} from "@angular/core";

import { ToastrService } from "ngx-toastr";
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

  public album: Album;
  public sideBarDisplay: string = "none";
  public wordings = ConfigDB.wordings.general.empty_items;

  currentTrackIndex: WritableSignal<number> = signal(0);
  isPlaying: WritableSignal<boolean> = signal(false);
  progress: WritableSignal<number> = signal(0);

  ngOnInit() {
    this.musicService.currentTrackIndex$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: number): void => {
        this.currentTrackIndex.set(data);
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

  getCurrentTrack(): Title {
    return this.musicService.getCurrentTrack();
  }

  handlePlayPause() {
    this.musicService.handlePlayPause();
  }

  scrollToCurrentTrack() {
    // const container = this.trackListContainer.nativeElement;
    // const selectedTrack = container.children[this.currentTrackIndex()];
    // if (selectedTrack) {
    //   selectedTrack.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    // }
  }

  handleNext() {
    this.musicService.handleNext();
  }

  handlePrevious() {
    this.musicService.handlePrevious();
  }

  handleTrackSelect(index: number) {
    this.musicService.handleTrackSelect(index);
  }

  handleSeek(event: Event) {
    this.musicService.handleSeek(event);
  }

  updateProgress() {
    this.musicService.updateProgress();
  }
}
