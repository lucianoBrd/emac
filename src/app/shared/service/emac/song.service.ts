import { Injectable } from "@angular/core";

import { AboutListDB } from "../../data/emac/about-list";
import { About } from "../../models/emac/about.interface";
import {Song} from "../../models/emac/song.interface";
import {SongListDB} from "../../data/emac/song-list";

@Injectable({
  providedIn: "root",
})
export class SongService {
  getSongs(): Song[] {
    return SongListDB.list
      .slice()
      .sort((a: Song, b: Song): number => a.id - b.id);
  }
}
