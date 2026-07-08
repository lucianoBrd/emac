import {Emac} from "../models/emac.interface";

export class EmacDB {
  static emac: Emac = {
    id: "emac",
    header: {
      id: "emac",
      logo: "assets/images/logo/emac.svg",
      background: "assets/images/emac/header.jpg",
      text: ["École militaire", "des aspirants", "de Coëtquidan"],
    },
    info: {
      id: "emac",
      title: 'É<span class="text-lowercase">cole</span> m<span class="text-lowercase">ilitaire des </span>a<span class="text-lowercase">spirants de </span>C<span class="text-lowercase">oëtquidan</span>',
      description: [
          "L'<strong>École militaire des aspirants de Coëtquidan (EMAC)</strong>, anciennement <strong>4e bataillon de l'École spéciale militaire de Saint-Cyr (E.S.M. 4)</strong>, est l'une des trois écoles de formation des officiers français de l'Armée de terre.",
        "Elle fait partie de l'<strong>Académie militaire de Saint-Cyr Coëtquidan</strong>, implantée dans le camp militaire de même nom situé sur le territoire de la commune de <strong>Guer</strong>, dans le département du Morbihan, en région Bretagne."
      ],
    },
    title: "École militaire des aspirants de Coëtquidan",
    description:
        "L'École militaire des aspirants de Coëtquidan (EMAC), anciennement 4e bataillon de l'École spéciale militaire de Saint-Cyr (E.S.M. 4), est l'une des trois écoles de formation des officiers français de l'Armée de terre. Elle fait partie de l'Académie militaire de Saint-Cyr Coëtquidan, implantée dans le camp militaire de même nom situé sur le territoire de la commune de Guer, dans le département du Morbihan, en région Bretagne.",
    keywords:
        "emac,École militaire des aspirants de Coëtquidan,amscc,officiers sous contrat",

  };
}
