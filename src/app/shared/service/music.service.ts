import { isPlatformBrowser } from "@angular/common";
import { inject, PLATFORM_ID, Injectable, OnDestroy } from "@angular/core";

import { ToastrService } from "ngx-toastr";
import { BehaviorSubject } from "rxjs";

import { AudioCache } from "./audio-cache";
import { Album } from "../models/shared/album.interface";
import { Title } from "../models/shared/title.interface";

@Injectable({
  providedIn: "root",
})
export class MusicService implements OnDestroy {
  private album = new BehaviorSubject<Album | undefined>(undefined);
  album$ = this.album.asObservable();

  private sidebar = new BehaviorSubject<boolean>(false);
  sidebar$ = this.sidebar.asObservable();

  private currentTrackIndex = new BehaviorSubject<number>(0);
  currentTrackIndex$ = this.currentTrackIndex.asObservable();

  private currentTrack = new BehaviorSubject<Title | undefined>(undefined);
  currentTrack$ = this.currentTrack.asObservable();

  private isPlaying = new BehaviorSubject<boolean>(false);
  isPlaying$ = this.isPlaying.asObservable();

  private progress = new BehaviorSubject<number>(0);
  progress$ = this.progress.asObservable();

  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private audio: HTMLAudioElement | null = null;
  private audioCache = new AudioCache();
  private objectUrl: string | undefined;
  private trackReady: Promise<void> = Promise.resolve();
  private toastrService: ToastrService = inject(ToastrService);

  sideBar(): void {
    this.sidebar.next(true);
  }

  setAlbum(album: Album): void {
    this.album.next(album);
    this.currentTrackIndex.next(0);
    this.currentTrack.next(this.getCurrentTrack());
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

  loadTrack(): void {
    if (!this.isBrowser || !this.album.value) return;
    this.audio?.pause();
    this.progress.next(0);
    if (this.objectUrl) URL.revokeObjectURL(this.objectUrl);
    this.objectUrl = undefined;
    const file = this.getCurrentTrack()?.file;
    if (!file) {
      this.audio = null;
      this.isPlaying.next(false);
      return;
    }
    const audio = new Audio();
    audio.preload = "metadata";
    this.audio = audio;
    this.trackReady = this.audioCache.get(file).then((blob) => {
      if (this.audio !== audio) return;
      if (blob) this.objectUrl = URL.createObjectURL(blob);
      audio.src = this.objectUrl ?? file;
    });
    audio.addEventListener("timeupdate", this.updateProgress.bind(this));
    audio.addEventListener("ended", this.handleNext.bind(this));
    audio.addEventListener("canplay", () => this.toastrService.clear());
    audio.addEventListener(
      "playing",
      () => {
        if (this.audio === audio) void this.audioCache.store(file);
      },
      { once: true },
    );
    audio.addEventListener("error", () => {
      if (this.audio !== audio) return;
      this.toastrService.error(
        "Impossible de charger ce chant. Hors connexion, il doit avoir été mis en cache auparavant.",
      );
      this.isPlaying.next(false);
    });
  }

  handlePlayPause(): void {
    if (!this.audio) return;
    if (this.isPlaying.value) {
      this.isPlaying.next(false);
      this.audio.pause();
    } else {
      void this.playCurrentTrack();
    }
  }

  private async playCurrentTrack(): Promise<void> {
    const audio = this.audio;
    if (!audio) return;
    this.isPlaying.next(true);
    try {
      await this.trackReady;
      if (this.audio !== audio || !this.isPlaying.value) return;
      await audio.play();
    } catch {
      if (this.audio !== audio || !this.isPlaying.value) return;
      this.isPlaying.next(false);
      this.toastrService.error("La lecture a échoué. Veuillez réessayer.");
    }
  }

  ngOnDestroy(): void {
    this.audio?.pause();
    this.audio = null;
    if (this.objectUrl) URL.revokeObjectURL(this.objectUrl);
  }

  handleNext() {
    if (!this.album.value) {
      return;
    }
    this.currentTrackIndex.next(
      (this.currentTrackIndex.value + 1) % this.getTracks().length,
    );
    this.currentTrack.next(this.getCurrentTrack());
    this.loadTrack();
    void this.playCurrentTrack();
  }

  handlePrevious() {
    if (!this.album.value) {
      return;
    }
    this.currentTrackIndex.next(
      (this.currentTrackIndex.value - 1 + this.getTracks().length) %
        this.getTracks().length,
    );
    this.currentTrack.next(this.getCurrentTrack());
    this.loadTrack();
    void this.playCurrentTrack();
  }

  handleTrackSelect(index: number) {
    this.currentTrackIndex.next(index);
    this.currentTrack.next(this.getCurrentTrack());
    this.loadTrack();
    void this.playCurrentTrack();
  }

  handleTrackSelectByTitle(title: Title): void {
    const index: number = this.getTracks().findIndex(
      (t: Title): boolean => title === t,
    );
    if (index === -1) {
      return;
    }
    this.handleTrackSelect(index);
  }

  handleSeek(value: number): void {
    const duration = this.audio?.duration;
    if (
      !this.audio ||
      !duration ||
      !Number.isFinite(duration) ||
      !Number.isFinite(value)
    )
      return;
    const progress = Math.min(100, Math.max(0, value));
    this.audio.currentTime = (progress / 100) * duration;
    this.progress.next(progress);
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
