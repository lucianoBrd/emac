import { Component, Input } from "@angular/core";

import { Song as SongInterface } from "../../../models/shared/song.interface";
import { MusicPlayer } from "../music/music-player/music-player";

@Component({
  selector: "app-song",
  imports: [MusicPlayer],
  templateUrl: "./song.html",
  styleUrls: ["./song.scss"],
})
export class Song {
  @Input()
  public song: SongInterface;
}
