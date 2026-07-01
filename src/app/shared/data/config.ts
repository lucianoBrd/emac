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
    },
    emac: {
      title: "École militaire des aspirants de Coëtquidan",
      description:
        "L'École militaire des aspirants de Coëtquidan (EMAC), anciennement 4e bataillon de l'École spéciale militaire de Saint-Cyr (E.S.M. 4), est l'une des trois écoles de formation des officiers français de l'Armée de terre. Elle fait partie de l'Académie militaire de Saint-Cyr Coëtquidan, implantée dans le camp militaire de même nom situé sur le territoire de la commune de Guer, dans le département du Morbihan, en région Bretagne.",
      keywords:
        "emac,École militaire des aspirants de Coëtquidan,amscc,officiers sous contrat",
    },
  };
}
