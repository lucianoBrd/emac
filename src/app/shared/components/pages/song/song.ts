import {Component, Input} from "@angular/core";

import {Song as SongInterface} from "../../../models/shared/song.interface";


@Component({
  selector: "app-song",
  imports: [],
  templateUrl: "./song.html",
  styleUrls: ["./song.scss"],
})
export class Song {
  @Input()
  public song: SongInterface;
}
