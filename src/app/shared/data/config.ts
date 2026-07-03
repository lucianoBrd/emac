export class ConfigDB {
  static inMaintenance: boolean = false;
  static data = {
    settings: {
      layout_type: "ltr",
      layout_version: "light",
    },
    app_name: "EMAC",
    keywords: "emac,ecole militaire des aspirants de coetquidant",
  };
  static wordings = {
    settings: {
      dark: "Sombre",
      light: "Clair",
      rtl: "Dag",
      ltr: "Gad",
    },
    general: {
      goHome: "Retour à l'accueil",
      home: "Accueil",
      about: "À propos",
      blog: "Blog",
      gallery: "Galerie",
      social: "Réseaux sociaux",
      back: "Retour",
      learn_more: "Plus d'information",
      close: "Fermer",
    },
    page_not_found: {
      title: "Page non trouvée",
      description:
        "La page que vous essayez d'atteindre n'est pas disponible actuellement. Cela peut être dû au fait que la page n'existe pas ou a été déplacée.",
    },
    maintenance: {
      title: "Maintenance",
      description: "Maintenance en cours",
      back_soon: "Nous serons bientôt de retour",
    },
    promotion: {
      title: "Promotions",
      see_all: "Voir toutes",
      current: "Promotion actuelle",
      number: "Promotion n°",
    },
    emac: {
      title: "École militaire des aspirants de Coëtquidan",
      description:
        "L'École militaire des aspirants de Coëtquidan (EMAC), anciennement 4e bataillon de l'École spéciale militaire de Saint-Cyr (E.S.M. 4), est l'une des trois écoles de formation des officiers français de l'Armée de terre. Elle fait partie de l'Académie militaire de Saint-Cyr Coëtquidan, implantée dans le camp militaire de même nom situé sur le territoire de la commune de Guer, dans le département du Morbihan, en région Bretagne.",
      keywords:
        "emac,École militaire des aspirants de Coëtquidan,amscc,officiers sous contrat",
      info: {
        description:
          "L'<span>École militaire des aspirants de Coëtquidan (EMAC)</span>, anciennement <span>4e bataillon de l'École spéciale militaire de Saint-Cyr (E.S.M. 4)</span>, est l'une des trois écoles de formation des officiers français de l'Armée de terre.<br> Elle fait partie de l'<span>Académie militaire de Saint-Cyr Coëtquidan</span>, implantée dans le camp militaire de même nom situé sur le territoire de la commune de <span>Guer</span>, dans le département du Morbihan, en région Bretagne.",
        title:
          "É<span class=\"text-lowercase\">cole</span> m<span class=\"text-lowercase\">ilitaire des </span>a<span class=\"text-lowercase\">spirants de </span>C<span class=\"text-lowercase\">oëtquidan</span>",
      },
      song: {
        title: "Chant de l’<span>EMAC</span>",
        name: "Pour l’audace de servir",
        description:
          "Ce chant a été écrit en <span>1994</span> sur ordre du Lieutenant-colonel Lautier commandant le <span>4e bataillon de l'école spéciale militaire de Saint-Cyr (ESM4)</span>.",
      },
      tradition: {
        title: "Traditions de l'<span>EMAC</span>",
        description:
          "L’EMAC, héritière des écoles qui l’ont précédée, dispose d’un parcours de tradition qui jalonne la formation des élèves officiers. Celui-ci marque leur intégration au sein de l’armée de Terre tout en favorisant le développement d’un <span>esprit de corps</span> au sein de la promotion.<br> Les traditions, de même que le cérémonial, ont ainsi vocation à inculquer aux futurs officiers un <span>socle de valeurs communes</span>.",
      },
      about: {
        title: "Histoire de l’<span>EMAC</span>",
        school_class: "« L’Audace de Servir »",
        class: "Devise",
      },
      contact: {
        address: [
          "École militaire des aspirants de Coëtquidan",
          "Académie militaire de Saint-Cyr Coëtquidan",
            "56381 GUER Cedex",
            "France",
        ],
      },
    },
  };
}
