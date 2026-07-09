import { EmacDB } from "./emac";
import { Promotion } from "../models/promotion.interface";
import { ColBourgoinDB } from "./promotion/col-bourgoin";

export class PromotionDB {
  static readonly list: Promotion[] = [
    {
      id: "slt-maurice-genevoix",
      title: "Sous-lieutenant Maurice GENEVOIX",
      number: 1,
      logo: "assets/images/promotion/slt-maurice-genevoix.PNG",
      startDate: new Date(2020, 1, 1),
      endDate: new Date(2021, 1, 1),
      header: {
        id: "slt-maurice-genevoix",
        logo: "assets/images/promotion/slt-maurice-genevoix.PNG",
        background: null,
        text: [],
      },
      info: {
        id: "slt-maurice-genevoix",
        title: "Promotion <span>Sous-lieutenant Maurice GENEVOIX</span>",
        subTitle: "<span>L'</span>" + EmacDB.emac.info.title,
        description: [],
      },
    },
    {
      id: "gal-bellec",
      title: "Général Jean-Charles BELLEC",
      number: 2,
      logo: "assets/images/promotion/gal-bellec.png",
      startDate: new Date(2021, 1, 1),
      endDate: new Date(2022, 1, 1),
      header: {
        id: "gal-bellec",
        logo: "assets/images/promotion/gal-bellec.png",
        background: null,
        text: [],
      },
      info: {
        id: "gal-bellec",
        title: "Promotion <span>Général Jean-Charles BELLEC</span>",
        subTitle: "<span>L'</span>" + EmacDB.emac.info.title,
        description: [],
      },
    },
    {
      id: "gal-morel",
      title: "Général René MOREL",
      number: 3,
      logo: "assets/images/promotion/gal-morel.PNG",
      startDate: new Date(2022, 1, 1),
      endDate: new Date(2023, 1, 1),
      header: {
        id: "gal-morel",
        logo: "assets/images/promotion/gal-morel.PNG",
        background: null,
        text: [],
      },
      info: {
        id: "gal-morel",
        title: "Promotion <span>Général René MOREL</span>",
        subTitle: "<span>L'</span>" + EmacDB.emac.info.title,
        description: [],
      },
    },
    {
      id: "ltn-michard",
      title: "Lieutenant MICHARD",
      number: 4,
      logo: "assets/images/promotion/ltn-michard.PNG",
      startDate: new Date(2023, 1, 1),
      endDate: new Date(2024, 1, 1),
      header: {
        id: "ltn-michard",
        logo: "assets/images/promotion/ltn-michard.PNG",
        background: null,
        text: [],
      },
      info: {
        id: "ltn-michard",
        title: "Promotion <span>Lieutenant MICHARD</span>",
        subTitle: "<span>L'</span>" + EmacDB.emac.info.title,
        description: [],
      },
    },
    {
      id: "ces-chomel-de-jarnieu",
      title: "Chef d’escadrons CHOMEL de JARNIEU",
      number: 5,
      logo: "assets/images/promotion/ces-chomel-de-jarnieu.PNG",
      startDate: new Date(2024, 1, 1),
      endDate: new Date(2025, 1, 1),
      header: {
        id: "ces-chomel-de-jarnieu",
        logo: "assets/images/promotion/ces-chomel-de-jarnieu.PNG",
        background: null,
        text: [],
      },
      info: {
        id: "ces-chomel-de-jarnieu",
        title: "Promotion <span>Chef d’escadrons CHOMEL de JARNIEU</span>",
        subTitle: "<span>L'</span>" + EmacDB.emac.info.title,
        description: [],
      },
    },
    ColBourgoinDB.promotion,
  ];
}
