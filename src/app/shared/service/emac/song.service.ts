import { Injectable } from "@angular/core";

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
