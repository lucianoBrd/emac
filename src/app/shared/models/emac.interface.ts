import {PromotionDetail} from "./promotion/promotion.detail.interface";
import {Header} from "./shared/header.interface";

export interface Emac {
  id: Readonly<string>;
  keywords: string;
  title: string;
  description: string;
  header: Header;
}
