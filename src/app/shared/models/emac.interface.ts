import { Tradition } from "./emac/tradition.interface";
import { About } from "./shared/about.interface";
import { Header } from "./shared/header.interface";
import { Info } from "./shared/info.interface";
import { Social } from "./shared/social.interface";
import { Song } from "./shared/song.interface";

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
