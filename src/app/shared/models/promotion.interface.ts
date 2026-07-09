import {Header} from "./shared/header.interface";
import {Info} from "./shared/info.interface";
import {About} from "./shared/about.interface";
import {Song} from "./shared/song.interface";
import {Footer} from "./shared/footer.interface";
import {Social} from "./shared/social.interface";

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
}
