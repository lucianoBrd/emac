import {Header} from "./shared/header.interface";
import {Info} from "./shared/info.interface";
import {About} from "./shared/about.interface";
import {Song} from "./shared/song.interface";
import {Tradition} from "./emac/tradition.interface";
import {Social} from "./shared/social.interface";

export interface Emac {
  id: Readonly<string>;
  keywords: string;
  title: string;
  description: string;
  header: Header;
  info: Info;
  about: About;
  song: Song;
  tradition: Tradition;
  social: Social;
}
