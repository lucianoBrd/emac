import { Component } from "@angular/core";

import { Song } from "../../shared/models/emac/song.interface";
import { Tradition } from "../../shared/models/emac/tradition.interface";
import { SongService } from "../../shared/service/emac/song.service";
import { TraditionService } from "../../shared/service/emac/tradition.service";
import {ConfigDB} from "../../shared/data/config";

@Component({
  selector: "app-emac-song",
  imports: [],
  templateUrl: "./emac-song.html",
  styleUrls: ["./emac-song.scss"],
})
export class EmacSong {
  public songs: Song[];
  public wording = ConfigDB.wordings.emac.song;

  constructor(private songService: SongService) {
    this.songs = this.songService.getSongs();
  }
}
