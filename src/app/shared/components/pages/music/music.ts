import { Component, Input, OnInit, signal } from "@angular/core";

import { Album } from "../../../models/shared/album.interface";

@Component({
  selector: "app-music",
  imports: [],
  templateUrl: "./music.html",
  styleUrls: ["./music.scss"],
})
export class Music implements OnInit {
  @Input()
  public album: Album;

  currentTrackIndex = signal(0);
  isPlaying = signal(false);
  progress = signal(0);
  error = signal<string | null>(null);
  private audio: HTMLAudioElement | null = null;

  ngOnInit() {
    this.loadTrack();
  }

  loadTrack() {
    this.audio?.pause();
    this.audio = new Audio(this.album.titles[this.currentTrackIndex()].file);

    this.audio.addEventListener("timeupdate", this.updateProgress.bind(this));
    this.audio.addEventListener("ended", this.handleNext.bind(this));
    this.audio.addEventListener("canplay", (): void => this.error.set(null));
    this.audio.addEventListener("error", (): void => {
      this.error.set("Unable to load audio. Please check the audio source.");
      this.isPlaying.set(false);
    });
  }

  handlePlayPause() {
    if (this.audio) {
      if (this.isPlaying()) {
        this.audio.pause();
      } else {
        this.audio.play().catch(() => {
          this.error.set("Playback failed. Please try again.");
        });
      }
      this.isPlaying.set(!this.isPlaying());
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
    this.currentTrackIndex.set(
      (this.currentTrackIndex() + 1) % this.album.titles.length,
    );
    this.loadTrack();
    this.isPlaying.set(true);
    this.audio?.play();
    this.scrollToCurrentTrack();
  }

  handlePrevious() {
    this.currentTrackIndex.set(
      (this.currentTrackIndex() - 1 + this.album.titles.length) %
        this.album.titles.length,
    );
    this.loadTrack();
    this.isPlaying.set(true);
    this.audio?.play();
    this.scrollToCurrentTrack();
  }

  handleTrackSelect(index: number) {
    this.currentTrackIndex.set(index);
    this.loadTrack();
    this.isPlaying.set(true);
    this.audio?.play();
    this.scrollToCurrentTrack();
  }

  handleSeek(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = parseFloat(input.value);
    this.progress.set(value);

    if (this.audio) {
      const newTime = (value / 100) * this.audio.duration;
      this.audio.currentTime = newTime;
    }
  }

  updateProgress() {
    if (this.audio) {
      const duration = this.audio.duration || 1;
      const currentTime = this.audio.currentTime;
      this.progress.set((currentTime / duration) * 100);
    }
  }
}
