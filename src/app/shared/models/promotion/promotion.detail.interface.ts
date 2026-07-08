import {Header} from "../shared/header.interface";
import {Info} from "../shared/info.interface";
import {About} from "../shared/about.interface";

export interface PromotionDetail {
  id: Readonly<string>;
  header: Header;
  info: Info;
  about?: About;
}
