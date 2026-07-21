import { Emac } from "../models/emac.interface";

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
      title:
        'É<span class="text-lowercase">cole</span> m<span class="text-lowercase">ilitaire des </span>a<span class="text-lowercase">spirants de </span>C<span class="text-lowercase">oëtquidan</span>',
      description: [
        "L'<strong>École militaire des aspirants de Coëtquidan (EMAC)</strong>, anciennement <strong>4e bataillon de l'École spéciale militaire de Saint-Cyr (E.S.M. 4)</strong>, est l'une des trois écoles de formation des officiers français de l'Armée de terre.",
        "Elle fait partie de l'<strong>Académie militaire de Saint-Cyr Coëtquidan</strong>, implantée dans le camp militaire de même nom situé sur le territoire de la commune de <strong>Guer</strong>, dans le département du Morbihan, en région Bretagne.",
      ],
    },
    about: {
      id: "emac",
      title: "Histoire de l’<span>EMAC</span>",
      headText: "« L’Audace de Servir »",
      smallText: "Devise",
      background: "assets/images/emac/bg2.jpg",
      image: "assets/images/emac/emac.jpg",
      description: [
        "Le corps des officiers de réserve est officiellement créé en 1875, par la loi du 13 mars. Il subit des pertes colossales pendant la Première Guerre mondiale, à hauteur de 27 000 officiers de réserve, Morts pour la France. À partir de 1919, l’instruction des officiers de réserve se fait aux Écoles de Saint-Cyr et à Saint-Maixent l’École grâce au Bataillon EOR (Élèves-Officiers de Réserve).",
        "Pour son action durant la Grande Guerre, le Bataillon EOR est officiellement rattaché à l’École spéciale militaire (ESM) de Saint-Cyr en 1931, et prend le nom de 3e Bataillon de l’ESM de Saint-Cyr. Pour marquer cette intégration à la vie de l’école, un EOR est présent dans la garde au drapeau l’année suivante.",
        "En 1940, 35 promotions d’EOR étaient sorties des écoles. Une grande partie des 1 400 officiers de réserve formés tombera lors de la bataille de France. Après le débarquement allié en Afrique du Nord, la formation des EOR est déplacée à Cherchell en Algérie, les anciennes écoles étant alors en territoire occupé. C’est ainsi que 5 000 officiers, issus de six promotions, participeront aux combats de la Libération.",
        "Après la Seconde Guerre mondiale, les EOR sont formés à Cherchell pour servir en Afrique du Nord, à Montpellier et à Saint-Maixent pour servir en métropole.",
        "4 000 officiers de réserve issus de ces écoles prendront une part active au conflit indochinois et à la guerre d’Algérie. L’indépendance de l’Algérie marque la fin de la présence des EOR à Cherchell. Désormais, chacune des écoles d’armes assurera la formation des EOR.",
        "À partir de 1967, l’instruction de l’infanterie se scinde en deux. Si les EOR de l’infanterie mécanisée restent à Montpellier, les EOR de l’infanterie motorisée s’installent à Coëtquidan, où ils reprennent leur appellation de 3e Bataillon de l’ESM de Saint-Cyr.",
        "En 1982, alors que la scolarité de l’ESM est portée de 2 à 3 ans, le Bataillon EOR d’infanterie prend l’appellation de Bataillon EOR. Trois filières sont créées à la rentrée 1985 : la filière F1 formant les spécialistes, la filière F2 dispensant une formation toutes armes, et la filière F3 réservée à des formations spécifiques.",
        "En 1998, les filières F1 et F2 sont regroupées sous l’appellation unique « voie commandement ». Le bataillon EOR devient le 4e Bataillon de l’ESM (ou ESM4) à compter de 1991. Avec la professionnalisation, la formation des OSC incombe au 4e Bataillon.",
        "Les OSC se distinguent aujourd’hui sous différentes appellations. Les 14e et 15e compagnies forment les OCS-E (encadrement) et OSC-P (pilotes) et la 13e compagnie forme, quant à elle, les OSC-S (spécialistes), les élèves-officiers polytechniciens, les ingénieurs militaires de l’infrastructure, les ingénieurs des études et techniques de l’armement, les stagiaires des partenariats des grandes écoles et les élèves-officiers de réserve et les volontaires aspirants de l’armée de Terre.",
        "Finalement, c’est le 6 juillet 2021 que se concrétise la création de l’École militaire des aspirants de Coëtquidan avec la remise du drapeau de l’École par Florence Parly, ministre des Armées. L’ancien 4e Bataillon devient une école à part entière au sein de l’Académie militaire de Saint-Cyr Coëtquidan.",
      ],
    },
    song: {
      id: "emac",
      title: "Chant de l’<span>EMAC</span>",
      name: "Pour l’audace de servir",
      description:
        "Ce chant a été écrit en <span>1994</span> sur ordre du Lieutenant-colonel Lautier commandant le <span>4e bataillon de l'école spéciale militaire de Saint-Cyr (ESM4)</span>.",
      verse: [
        {
          id: "emac",
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
          id: "emac",
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
          id: "emac",
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
          id: "emac",
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
      ],
      music: {
        id: "chant-emac",
        name: "Chant EMAC",
        subName: "L’audace de servir",
        image: "assets/images/logo/emac.svg",
        titles: [
          {
            id: 0,
            name: "L’audace de servir",
            file: "assets/music/promotion/col-bourgoin/amarante/01 - L'audace de Servir.mp3",
          },
        ],
        platforms: [],
        slug: "chant-de-l-emac",
      },
    },
    tradition: {
      id: "emac",
      title: "Traditions de l'<span>EMAC</span>",
      description:
        "L’EMAC, héritière des écoles qui l’ont précédée, dispose d’un parcours de tradition qui jalonne la formation des élèves officiers. Celui-ci marque leur intégration au sein de l’armée de Terre tout en favorisant le développement d’un <span>esprit de corps</span> au sein de la promotion.<br> Les traditions, de même que le cérémonial, ont ainsi vocation à inculquer aux futurs officiers un <span>socle de valeurs communes</span>.",
      tradition: [
        {
          title: "La remise des calots de tradition",
          description:
            "À la fin de la guerre d’Algérie, le calot est la coiffe règlementaire des unités terrestres françaises. Celui-ci est par la suite remplacé par le béret. Le calot reste cependant un symbole fort de cohésion, porté dans de nombreux régiments. Ce couvre-chef, à la couleur bleu horizon de l’école, est porté par les élèves-officiers lors des évènements de tradition et de vie de promotion. La cérémonie de remise des calots est l’occasion d’échanges entre promotions, les élèves-officiers se voyant remettre leur calot par la génération précédente.",
          image: "assets/images/emac/calot.jpg",
        },
        {
          title: "La remise des « Alphas »",
          description:
            "L’Alpha est le premier galon que reçoivent les élèves officiers. Hautement symbolique, cette remise marque la fin de la période d’incorporation des recrues, dans les premières semaines. Cette cérémonie marque ainsi l’entrée des élèves au sein de l’Académie militaire. La cérémonie est précédée d’une marche durant laquelle les instructeurs présentent les hauts lieux de tradition du camp de Coëtquidan. Cette marche est l’occasion pour les futurs officiers de réfléchir au sens de leur engagement.",
          image: "assets/images/emac/alpha.jpg",
        },
        {
          title: "L’adoubement",
          description:
            "La remise des sabres symbolise l’accès à l’état d’officier, notamment à travers la symbolique de la chevalerie médiévale. Selon cette tradition, tout écuyer qui aspire au statut de chevalier reçoit ses armes et son armure au cours de l’adoubement. Le sabre représente l’état d’officier et est le symbole du commandement. L’ancien insigne de grade d’élève-officier de réserve (EOR), aussi appelé la « crevette », statut dont les aspirants de l’EMAC sont héritiers depuis la Première Guerre mondiale, est toujours porté par les stagiaires appartenant à la réserve opérationnelle.",
          image: "assets/images/emac/adoubement.jpg",
        },
        {
          title: "La présentation au Drapeau",
          description:
            "Depuis la création de l’École militaire des aspirants de Coëtquidan, les officiers sous-contrat disposent d’un drapeau qui leur est propre et dont ils ont la garde partagée avec leurs cadres. Cette cérémonie est un rite marquant dans la vie de tout soldat. La présentation au Drapeau est d’abord la présentation d’un héritage, qu’il faut préserver et entretenir. Il s’agit également d’un lien fort entre les membres d’une même unité, qui se rassemblent autour de ses couleurs. La prise d’armes est précédée d’une veillée au Drapeau au Musée de l’Officier, où toute la promotion se relaie en section pour honorer les couleurs de la Nation ainsi que ses ainés.",
          image: "assets/images/emac/drapeau.jpg",
        },
        {
          title: "La remise des képis",
          description:
            "La remise des képis est un moment charnière dans le parcours de tradition des élèves-officiers. Tout d’abord parce que celui-ci se mérite. Les aspirants se voient remettre leur képi par leurs cadres, après une marche aux alentours du camp de Coëtquidan. Ce moment unique est l’occasion pour les élèves-officiers de marquer un peu plus leur appartenance au corps des officiers.",
          image: "assets/images/emac/kepi.jpg",
        },
        {
          title: "Le baptême de promotion",
          description:
            "La cérémonie majeure de l’EMAC est, comme pour les autres écoles, le baptême de promotion. Depuis la monarchie de Juillet, il est de coutume de donner un parrain aux promotions des écoles d’officiers de l’armée de Terre. Ce parrain est choisi pour ses qualités d’officier, de soldat et d’homme, qui ont valeur d’exemple pour la nouvelle promotion. Les promotions précédentes ont ainsi choisi pour parrains : Maurice Genevoix, Général Morel, Général Bellec, Lieutenant Michard, Chef d’escadrons Chomel de Jarnieu.",
          image: "assets/images/emac/bapteme.jpg",
        },
      ],
    },
    social: {
      id: "emac",
      background: "assets/images/emac/bg3.jpg",
      social: [
        {
          link: "https://www.facebook.com/saintcyrcoetquidan",
          title: "Facebook AMSCC",
          icon: "facebook",
        },
        {
          link: "https://x.com/SaintCyrCoet",
          title: "Twitter AMSCC",
          icon: "twitter",
        },
        {
          link: "https://www.instagram.com/saintcyrcoetquidan/",
          title: "Instagram AMSCC",
          icon: "instagram",
        },
        {
          link: "https://www.terre.defense.gouv.fr/amscc/devenir-officier/ecole-militaire-aspirants-coetquidan",
          title: "Terre Defense",
          icon: "book",
        },
      ],
    },
    title: "École militaire des aspirants de Coëtquidan",
    description:
      "L'École militaire des aspirants de Coëtquidan (EMAC), anciennement 4e bataillon de l'École spéciale militaire de Saint-Cyr (E.S.M. 4), est l'une des trois écoles de formation des officiers français de l'Armée de terre. Elle fait partie de l'Académie militaire de Saint-Cyr Coëtquidan, implantée dans le camp militaire de même nom situé sur le territoire de la commune de Guer, dans le département du Morbihan, en région Bretagne.",
    keywords:
      "emac,École militaire des aspirants de Coëtquidan,amscc,officiers sous contrat",
  };
}
