import {PromotionDetail} from "./promotion/promotion.detail.interface";

export interface Promotion {
  id: Readonly<string>;
  title: string;
  number: Readonly<number>;
  logo: string;
  startDate: Date;
  endDate: Date;
  detail: PromotionDetail;
}
