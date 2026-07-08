import {PromotionDetail} from "./promotion/promotion.detail.interface";
import {Header} from "./shared/header.interface";
import {Info} from "./shared/info.interface";
import {About} from "./shared/about.interface";

export interface Emac {
  id: Readonly<string>;
  keywords: string;
  title: string;
  description: string;
  header: Header;
  info: Info;
  about: About;
}
