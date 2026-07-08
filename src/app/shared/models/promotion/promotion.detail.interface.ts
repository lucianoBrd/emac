import {Header} from "../shared/header.interface";
import {Info} from "../shared/info.interface";

export interface PromotionDetail {
  id: Readonly<string>;
  header: Header;
  info: Info;
}
