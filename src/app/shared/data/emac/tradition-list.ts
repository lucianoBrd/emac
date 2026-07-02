import { Tradition } from "../../models/emac/tradition.interface";

export class TraditionListDB {
  static list: Tradition[] = [
    {
      id: 1,
      title: "La remise des calots de tradition",
      description:
        "À la fin de la guerre d’Algérie, le calot est la coiffe règlementaire des unités terrestres françaises. Celui-ci est par la suite remplacé par le béret. Le calot reste cependant un symbole fort de cohésion, porté dans de nombreux régiments. Ce couvre-chef, à la couleur bleu horizon de l’école, est porté par les élèves-officiers lors des évènements de tradition et de vie de promotion. La cérémonie de remise des calots est l’occasion d’échanges entre promotions, les élèves-officiers se voyant remettre leur calot par la génération précédente.",
      image: "assets/images/emac/calot.jpg",
    },
    {
      id: 2,
      title: "La remise des « Alphas »",
      description:
        "L’Alpha est le premier galon que reçoivent les élèvesofficiers. Hautement symbolique, cette remise marque la fin de la période d’incorporation des recrues, dans les premières semaines. Cette cérémonie marque ainsi l’entrée des élèves au sein de l’Académie militaire. La cérémonie est précédée d’une marche durant laquelle les instructeurs présentent les hauts lieux de tradition du camp de Coëtquidan. Cette marche est l’occasion pour les futurs officiers de réfléchir au sens de leur engagement.",
      image: "assets/images/emac/alpha.jpg",
    },
    {
      id: 3,
      title: "L’adoubement",
      description:
        "La remise des sabres symbolise l’accès à l’état d’officier, notamment à travers la symbolique de la chevalerie médiévale. Selon cette tradition, tout écuyer qui aspire au statut de chevalier reçoit ses armes et son armure au cours de l’adoubement. Le sabre représente l’état d’officier et est le symbole du commandement. L’ancien insigne de grade d’élève-officier de réserve (EOR), aussi appelé la « crevette », statut dont les aspirants de l’EMAC sont héritiers depuis la Première Guerre mondiale, est toujours porté par les stagiaires appartenant à la réserve opérationnelle.",
      image: "assets/images/emac/adoubement.jpg",
    },
    {
      id: 4,
      title: "La présentation au Drapeau",
      description:
        "Depuis la création de l’École militaire des aspirants de Coëtquidan, les officiers sous-contrat disposent d’un drapeau qui leur est propre et dont ils ont la garde partagée avec leurs cadres. Cette cérémonie est un rite marquant dans la vie de tout soldat. La présentation au Drapeau est d’abord la présentation d’un héritage, qu’il faut préserver et entretenir. Il s’agit également d’un lien fort entre les membres d’une même unité, qui se rassemblent autour de ses couleurs. La prise d’armes est précédée d’une veillée au Drapeau au Musée de l’Officier, où toute la promotion se relaie en section pour honorer les couleurs de la Nation ainsi que ses ainés.",
      image: "assets/images/emac/drapeau.jpg",
    },
    {
      id: 5,
      title: "La remise des képis",
      description:
        "La remise des képis est un moment charnière dans le parcours de tradition des élèves-officiers. Tout d’abord parce que celui-ci se mérite. Les aspirants se voient remettre leur képi par leurs cadres, après une marche aux alentours du camp de Coëtquidan. Ce moment unique est l’occasion pour les élèves-officiers de marquer un peu plus leur appartenance au corps des officiers.",
      image: "assets/images/emac/kepi.jpg",
    },
    {
      id: 6,
      title: "Le baptême de promotion",
      description:
        "La cérémonie majeure de l’EMAC est, comme pour les autres écoles, le baptême de promotion. Depuis la monarchie de Juillet, il est de coutume de donner un parrain aux promotions des écoles d’officiers de l’armée de Terre. Ce parrain est choisi pour ses qualités d’officier, de soldat et d’homme, qui ont valeur d’exemple pour la nouvelle promotion. Les promotions précédentes ont ainsi choisi pour parrains : Maurice Genevoix, Général Morel, Général Bellec, Lieutenant Michard, Chef d’escadrons Chomel de Jarnieu.",
      image: "assets/images/emac/bapteme.jpg",
    },
  ];
}
