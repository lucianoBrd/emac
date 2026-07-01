import { Promotion } from "../../models/promotion.interface";

export class PromotionListDB {
  static readonly list: Promotion[] = [
    {
      id: "gal-morel",
      title: "Général René MOREL",
      number: 3,
      logo: "assets/images/promotion/gal-morel.png",
      startDate: new Date(2022, 1, 1),
      endDate: new Date(2023, 1, 1),
    },
    {
      id: "ltn-michard",
      title: "Lieutenant MICHARD",
      number: 4,
      logo: "assets/images/promotion/ltn-michard.PNG",
      startDate: new Date(2023, 1, 1),
      endDate: new Date(2024, 1, 1),
    },
    {
      id: "ces-chomel-de-jarnieu",
      title: "Chef d’escadrons CHOMEL de JARNIEU",
      number: 5,
      logo: "assets/images/promotion/ces-chomel-de-jarnieu.PNG",
      startDate: new Date(2024, 1, 1),
      endDate: new Date(2025, 1, 1),
    },
    {
      id: "col-bourgoin",
      title: "Colonel BOURGOIN",
      number: 6,
      logo: "assets/images/promotion/col-bourgoin.png",
      startDate: new Date(2025, 1, 1),
      endDate: new Date(2026, 1, 1),
    },
  ];
}
