import { Promotion } from "../../models/promotion.interface";

export class PromotionListDB {
  static list: Promotion[] = [
    {
      id: "gal-morel",
      title: "Général René MOREL",
      number: 3,
      logo: "assets/images/promotion/gal-morel.png",
      startDate: new Date(2022),
      endDate: new Date(2023),
    },
    {
      id: "ltn-michard",
      title: "Lieutenant MICHARD",
      number: 4,
      logo: "assets/images/promotion/ltn-michard.PNG",
      startDate: new Date(2023),
      endDate: new Date(2024),
    },
    {
      id: "ces-chomel-de-jarnieu",
      title: "Chef d’escadrons CHOMEL de JARNIEU",
      number: 5,
      logo: "assets/images/promotion/ces-chomel-de-jarnieu.PNG",
      startDate: new Date(2024),
      endDate: new Date(2025),
    },
    {
      id: "col-bourgoin",
      title: "Colonel BOURGOIN",
      number: 6,
      logo: "assets/images/promotion/col-bourgoin.png",
      startDate: new Date(2025),
      endDate: new Date(2026),
    },
  ];
}
