import {Album} from "./album.interface";

export interface Song {
  id: Readonly<string>;
  title: string;
  description: string;
  name: string;
  verse: Verse[];
  music?: Album,
}

export interface Verse {
  id: Readonly<string>;
  title: string;
  description: string[];
}
