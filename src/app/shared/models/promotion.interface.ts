import { About } from "./shared/about.interface";
import { Footer } from "./shared/footer.interface";
import { Gallery } from "./shared/gallery.interface";
import { Header } from "./shared/header.interface";
import { Info } from "./shared/info.interface";
import { Social } from "./shared/social.interface";
import { Song } from "./shared/song.interface";

export interface Promotion {
  id: Readonly<string>;
  title: string;
  number: Readonly<number>;
  logo: string;
  startDate: Date;
  endDate: Date;
  header: Header;
  info: Info;
  about?: About;
  song?: Song;
  footer?: Footer;
  social?: Social;
  gallery?: Gallery;
}
