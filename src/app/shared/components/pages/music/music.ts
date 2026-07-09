import { Component, Input } from "@angular/core";

import { Song as SongInterface } from "../../../models/shared/song.interface";

@Component({
  selector: "app-music",
  imports: [],
  templateUrl: "./music.html",
  styleUrls: ["./music.scss"],
})
export class Music {
  @Input()
  public song: SongInterface;
}
