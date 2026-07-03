import {Counter} from "../../models/emac/counter.interface";
import {PromotionListDB} from "../promotion/promotion-list";

export class CounterListDB {
  static list: Counter[] = [
    {
      id: 1,
      count: PromotionListDB.list.length.toString(),
      title: "Promotions",
      icon: "users",
    },
    {
      id: 2,
      count: "6 juillet 2021",
      title: "Création de l'EMAC",
      icon: "play",
    },
    {
      id: 3,
      count: "1200",
      title: "Stagiaires par année",
      icon: "book",
    },
    {
      id: 4,
      count: "1/3",
      title: "Officiers ADT recrutés sont OSC",
      icon: "user-plus",
    },
  ];
}
