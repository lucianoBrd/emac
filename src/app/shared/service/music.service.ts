import { inject, Injectable, signal, WritableSignal } from "@angular/core";

import { ToastrService } from "ngx-toastr";
import { BehaviorSubject } from "rxjs";

import { Album } from "../models/shared/album.interface";
import { Title } from "../models/shared/title.interface";

@Injectable({
  providedIn: "root",
})
export class MusicService {
  private album = new BehaviorSubject<Album | undefined>(undefined);
  album$ = this.album.asObservable();

  private sidebar = new BehaviorSubject<boolean>(false);
  sidebar$ = this.sidebar.asObservable();

  private currentTrackIndex = new BehaviorSubject<number>(0);
  currentTrackIndex$ = this.currentTrackIndex.asObservable();

  private isPlaying = new BehaviorSubject<boolean>(false);
  isPlaying$ = this.isPlaying.asObservable();

  private progress = new BehaviorSubject<number>(0);
  progress$ = this.progress.asObservable();

  private audio: HTMLAudioElement | null = null;
  private toastrService: ToastrService = inject(ToastrService);

  sideBar(): void {
    this.sidebar.next(true);
  }

  setAlbum(album: Album): void {
    this.album.next(album);
    this.currentTrackIndex.next(0);
    this.isPlaying.next(false);
    this.progress.next(0);
    this.loadTrack();
  }

  getAlbum(): Album | undefined {
    return this.album.value;
  }

  checkAlbum(album: Album): boolean {
    return this.getAlbum() === album;
  }

  loadTrack() {
    if (!this.album.value) {
      return;
    }
    this.audio?.pause();
    this.audio = new Audio(this.getTracks()[this.currentTrackIndex.value].file);

    this.audio.addEventListener("timeupdate", this.updateProgress.bind(this));
    this.audio.addEventListener("ended", this.handleNext.bind(this));
    this.audio.addEventListener("canplay", (): void =>
      this.toastrService.clear(),
    );
    this.audio.addEventListener("error", (): void => {
      this.toastrService.error(
        "Unable to load audio. Please check the audio source.",
      );
      this.isPlaying.next(false);
    });
  }

  handlePlayPause() {
    if (this.audio) {
      if (this.isPlaying.value) {
        this.audio.pause();
      } else {
        this.audio.play().catch(() => {
          this.toastrService.error("Playback failed. Please try again.");
        });
      }
      this.isPlaying.next(!this.isPlaying.value);
    }
  }

  scrollToCurrentTrack() {
    // const container = this.trackListContainer.nativeElement;
    // const selectedTrack = container.children[this.currentTrackIndex()];
    // if (selectedTrack) {
    //   selectedTrack.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    // }
  }

  handleNext() {
    if (!this.album.value) {
      return;
    }
    this.currentTrackIndex.next(
      (this.currentTrackIndex.value + 1) % this.getTracks().length,
    );
    this.loadTrack();
    this.isPlaying.next(true);
    this.audio?.play();
    this.scrollToCurrentTrack();
  }

  handlePrevious() {
    if (!this.album.value) {
      return;
    }
    this.currentTrackIndex.next(
      (this.currentTrackIndex.value - 1 + this.getTracks().length) %
        this.getTracks().length,
    );
    this.loadTrack();
    this.isPlaying.next(true);
    this.audio?.play();
    this.scrollToCurrentTrack();
  }

  handleTrackSelect(index: number) {
    this.currentTrackIndex.next(index);
    this.loadTrack();
    this.isPlaying.next(true);
    this.audio?.play();
    this.scrollToCurrentTrack();
  }

  handleSeek(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = parseFloat(input.value);
    this.progress.next(value);

    if (this.audio) {
      this.audio.currentTime = (value / 100) * this.audio.duration;
    }
  }

  updateProgress() {
    if (this.audio) {
      const duration = this.audio.duration || 1;
      const currentTime = this.audio.currentTime;
      this.progress.next((currentTime / duration) * 100);
    }
  }

  getTracks(): Title[] {
    if (!this.album.value) {
      return [];
    }
    return this.album.value.titles.filter(
      (title: Title): boolean => title.file !== undefined,
    );
  }

  getCurrentTrack(): Title {
    return this.getTracks()[this.currentTrackIndex.value];
  }
}
