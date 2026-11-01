import { EmacDB } from "./emac";
import records from "./promotions.generated.json";
import { Promotion } from "../models/promotion.interface";

type SerializedPromotion = Omit<Promotion, "startDate" | "endDate"> & {
  startDate: string;
  endDate: string;
};

// Input is validated by scripts/generate-promotions.mjs before Angular starts.
export class PromotionDB {
  static readonly list: Promotion[] = (
    records as unknown as SerializedPromotion[]
  ).map((record) => ({
    ...record,
    startDate: new Date(`${record.startDate}T12:00:00`),
    endDate: new Date(`${record.endDate}T12:00:00`),
    info: {
      ...record.info,
      subTitle: "<span>L'</span>" + EmacDB.emac.info.title,
    },
  }));
}
