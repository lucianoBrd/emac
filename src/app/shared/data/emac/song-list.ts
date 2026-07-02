import { About } from "../../models/emac/about.interface";
import { Song } from "../../models/emac/song.interface";

export class SongListDB {
  static list: Song[] = [
    {
      id: 1,
      description: [
        "Ils sont nés au sein des corps d’armée",
        "Aspirants rêvant de reconquête,",
        "Pour venger l’affront de la défaite.",
        "Dans la grande guerre, s’est affirmé",
        "Sans faillir leur courage exemplaire",
        "D’officiers au renom légendaire.",
        "L’insigne honneur ils eurent ainsi",
        "De devenir des fils de Saint-Cyr.",
      ],
      title: "I",
    },
    {
      id: 2,
      description: [
        "Fiers officiers, en héritiers,",
        "Instruisons-nous pour vaincre !",
        "Fiers officiers, cœurs sans faiblesse,",
        "Nous ne saurions craindre",
        "Pour l’honneur d’être prêts à périr",
        "Au seul cri de l’audace de servir !",
      ],
      title: "Refrain",
    },
    {
      id: 3,
      description: [
        "Nos anciens de Saint-Maixent, Cherchell",
        "En s’engageant dans l’infanterie",
        "De leur sang par milliers ont écrit",
        "Les hauts faits de l’histoire immortelle.",
        "Des grandes promotions d’aspirants",
        "La guerre a clairsemé bien des rangs",
        "Pour libérer la mère patrie,",
        "Défendre Indochine et Algérie.",
      ],
      title: "II",
    },
    {
      id: 4,
      description: [
        "La paix trouvée, notre formation",
        "Unissant passé et avenir,",
        "Retrouvant les couleurs de Saint-Cyr",
        "Devint quatrième bataillon.",
        "Mille fois chanté ou murmuré,",
        "Méprisant peur, doutes et regrets,",
        "Ce noble récit de notre histoire,",
        "Enflamme nos cœurs épris de gloire.",
      ],
      title: "III",
    },
  ];
}
