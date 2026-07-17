import { GalleryType } from "../../enum/gallery.type";
import { Promotion } from "../../models/promotion.interface";
import { EmacDB } from "../emac";

export class ColBourgoinDB {
  static promotion: Promotion = {
    id: "col-bourgoin",
    title: "Colonel BOURGOIN",
    number: 6,
    logo: "assets/images/promotion/col-bourgoin.png",
    startDate: new Date(2025, 1, 1),
    endDate: new Date(2026, 1, 1),
    header: {
      id: "col-bourgoin",
      logo: "assets/images/promotion/col-bourgoin.png",
      background: "assets/images/promotion/col-bourgoin/header.jpg",
      text: ["Colonel Pierre-Louis", "Bourgoin"],
    },
    info: {
      id: "col-bourgoin",
      title: "<span>Promotion</span> Colonel BOURGOIN",
      subTitle: "<span>L'</span>" + EmacDB.emac.info.title,
      description: [
        "Le colonel Pierre-Louis Bourgoin naît le 4 décembre 1907 à Cherchell, en Algérie. À sa sortie de l’École normale d’instituteurs d’Alger, il demande à être muté en Afrique noire pour pouvoir s’adonner à son activité favorite : la chasse aux grands fauves. Il effectue alors son service militaire au 3e régiment de tirailleurs algériens en tant que sous-lieutenant de réserve, en 1929. Rien, sinon son tempérament hors du commun, ne le prédispose alors aux honneurs qu’il recevra plus tard.",
        "À l’été 1940, lieutenant de réserve, il prend part au ralliement de l’Oubangui-Chari à la France Libre. Incorporé au bataillon de marche n°2 du commandant de Roux, il y commande le Groupe franc. Condamné à mort par le régime de Vichy pour faits de résistance, il est promu capitaine dans la foulée.",
        "Chef d’une bravoure exceptionnelle, il se distingue lors de la campagne de Syrie en juin 1941, où il est blessé par un éclat d’obus. Passé au Groupe de bombardement Lorraine, intégré à la Special Air Service Brigade (SAS), il prend part à la campagne de Libye à la tête de l’échelon terrestre, menant raids et sabotages sur les arrières ennemis et les aérodromes allemands. Il y est blessé par balle au genou et subit un accident d’avion qui lui provoque de multiples fractures costales. Malgré ces épreuves, il effectue son stage de commando parachutiste pour être affecté aux services secrets britanniques.",
        "Spécialiste du sabotage et du renseignement, il conduit des missions spéciales en Tunisie. Le 23 février 1943, lors d’un coup de main derrière les lignes ennemies, il est grièvement blessé par le mitraillage d’un avion ennemi. Meurtri de trente-sept blessures, Bourgoin traverse le désert en solitaire – tous les autres occupants de la jeep ayant été tués – pour être secouru par une patrouille britannique. Amputé du bras droit, il met sept mois à retrouver la condition nécessaire pour reprendre le combat. À l’hôpital déjà, il recrute de nouveaux volontaires pour les parachutistes : rien ne peut éteindre sa flamme combattante.",
        "Rétabli, il rejoint l’Angleterre. Promu commandant, il prend en novembre 1943 le commandement du 4e bataillon d’infanterie de l’air, futur 2e régiment de chasseurs parachutistes (2e RCP). En Écosse, les 435 hommes du Bataillon du Ciel se préparent à la grande bataille. À une époque où les parachutistes français sont encore tenus à l’écart des opérations, Bourgoin impose avec force leur droit à combattre pour la libération de la France. Son énergie et sa détermination convainquent le commandement allié, qui confie au régiment des missions de sacrifice et fait des parachutistes un élément clé de la manoeuvre.",
        "Dans la nuit du 10 au 11 juin 1944, en dépit de son handicap, « le Manchot » est largué avec un parachute bleu blanc rouge au-dessus de Saint-Marcel, en Bretagne, où il rejoint ses hommes, premiers engagés sur le sol national. Bourgoin rassemble autour de lui 3 000 maquisards et fixe 85 000 Allemands pour leur interdire l’accès à la Normandie. Le 18 juin, à Saint- Marcel, 2 400 résistants et parachutistes affrontent le double d’effectifs ennemis. Au prix de lourdes pertes, Bourgoin et les FFI permettent la jonction avec l’armée du général Patton. Exaspérés, les Allemands mettent la tête du « Manchot » à prix ; tous les amputés d’un bras en Bretagne sont arrêtés.",
        "En août 1944, il couvre avec son 2e RCP la progression de l’armée alliée en Bretagne : c’est l’opération Spencer. À Saint-Pierre-le-Moûtier, ses « sticks » capturent 3 000 Allemands et s’emparent d’un matériel considérable. C’est ensuite la libération de Vannes, puis de Paris. Après trois mois de combats ininterrompus, le 2e RCP est finalement mis au repos.",
        "Élevé au rang de lieutenant-colonel, Pierre-Louis Bourgoin ouvre le défilé militaire des troupes à pieds sur les Champs Élysées devant le général de Gaulle et Winston Churchill, le 11 novembre 1944. À cette occasion, le 2e RCP reçoit du chef de la France Libre la Croix de la Libération, accompagnée de ces mots : « Formation d’élite qui, sous les ordres du lieutenantcolonel Bourgoin, a eu l’insigne honneur d’être la première unité française à combattre à nouveau sur le sol de la Patrie […] A eu une grande part dans le succès de l’offensive alliée et a été à l’origine de la libération de la Bretagne. »",
        "Nommé inspecteur des parachutistes en novembre 1944, Bourgoin est démobilisé l’année suivante. En 1949, il devient inspecteur général des chasses pour la France et l’Outre-mer, et est nommé colonel de réserve. Député de Paris à partir de 1958, il seconde la présidence de l’Association de soutien au général de Gaulle. Éprouvé par la maladie, il démissionne en mai 1970 et s’éteint quelques jours plus tard, le 11 mai, à Paris. Il repose à Plumelec (Morbihan), aux côtés de ses hommes.",
        "Chef d’un courage indomptable, il exerçait un ascendant naturel sur ses troupes, car il avait le don du commandement et la passion de servir. De l’Afrique au maquis breton, du ciel d’Angleterre aux plaines de France, Pierre-Louis Bourgoin a incarné l’audace, la fidélité et le dévouement. Son parcours, marqué par le sacrifice et la foi dans la France Libre, illustre pleinement la devise de notre école : « L’audace de servir. »",
      ],
    },
    about: {
      id: "col-bourgoin",
      title: "L’<span>insigne</span> de promotion",
      background: "assets/images/promotion/col-bourgoin/bg2.jpg",
      image: "assets/images/promotion/col-bourgoin.png",
      description: [
        "Bouclier à la lisière d’or parti d’hermine et de sable broché d’une épée haute d’argent à la lame chargée du grade et du nom en lettres capitales de sable aussi « COL BOURGOIN », accompagnée à dextre d’une Croix de Lorraine de sable mouvant de la lame et à senestre d’une partie de l’écusson aux armes du « Special Air Service » (SAS) ; sur le tout banderole d’azur surlignée de gueules chargée de la devise en anglais des SAS « WHO DARES WINS » (qui ose gagne) en lettres capitales d’or, en pointe brochant la garde d’or plaque de Grand-croix de la Légion d’honneur.",
        '<i class="fa fa-angle-double-right font-secondary"></i> L’écu reprend la forme traditionnelle des insignes de promotion de l’EMAC.',
        '<i class="fa fa-angle-double-right font-secondary"></i> L’épée portant le nom de notre parrain est le symbole du commandement.',
        '<i class="fa fa-angle-double-right font-secondary"></i> Le fond blanc recouvert d’hermines fait référence à la Bretagne et plus particulièrement au maquis de Saint-Marcel, lieu où il a été parachuté et a combattu en juin 1944 avec son état-major et une compagnie lors des opérations de la bataille de Normandie, pour encadrer la résistance et fixer les troupes allemandes.',
        '<i class="fa fa-angle-double-right font-secondary"></i> La Croix de Lorraine rappelle que notre parrain est membre de l’Ordre de la Libération.',
        '<i class="fa fa-angle-double-right font-secondary"></i> L’insigne des SAS, une banderole frappée de l’épitaphe « who dares wins » surmontée d’un glaive ailé sur fond noir, couleur des opérations spéciales, évoque son appartenance à cette unité et notamment au 4e régiment du Special Air Service qu’il commandera à partir de novembre 1943.',
        '<i class="fa fa-angle-double-right font-secondary"></i> La Grand-croix de la Légion d’honneur correspond à la plus haute distinction décernée à notre parrain.',
      ],
    },
    song: {
      id: "col-bourgoin",
      title: "<span>Chant</span> de promotion",
      description: "",
      name: "Chant de la promotion Colonel Bourgoin",
      verse: [
        {
          id: "col-bourgoin",
          title: "Couplet 1",
          description: [
            "En la brûlante Cherchell s’écrit votre destin,",
            "Fier officier Français sur le sol algérien.",
            "Vous instruisez vos hommes au troisième tirailleur",
            "Et forgez votre envie de service et d’honneur.",
            "Ces vertus immuables vous poussent à combattre,",
            "Pour la France meurtrie que l’ennemi veut abattre.",
          ],
        },
        {
          id: "col-bourgoin",
          title: "Refrain",
          description: [
            "Colonel Bourgoin, père des bataillons du ciel",
            "Consacrez-nous à votre héritage immortel",
            "Que votre main sans faille protège vos officiers",
            "A l’heure de la bataille sous le feu et l’acier",
            "Puisant dans votre audace sa fougue et sa passion",
            "S’élance vaillamment la jeune promotion",
          ],
        },
        {
          id: "col-bourgoin",
          title: "Couplet 2",
          description: [
            "Quand l’ombre de la guerre menace la Patrie,",
            "Se dressent les forces libres en Oubangui-Chari.",
            "En fier lieutenant vous gagnez les groupes francs",
            "Et combattez Rommel aux confins du Levant.",
            "Le renard du désert met votre tête à prix,",
            "Dédaignant vos blessures, vous joignez la Libye.",
          ],
        },
        {
          id: "col-bourgoin",
          title: "Couplet 3",
          description: [
            "Au cri de « Qui ose gagne », avec les SAS,",
            "Tripoli vous entend saper les lignes adverses.",
            "Vos mitrailleuses grondent dans toute la Tunisie,",
            "Au gré de coups d’éclats accablant l’ennemi.",
            "Blessé par trente-sept fois vous résistez encore",
            "Et enfoui sous le sable, échappez à la mort.",
          ],
        },
        {
          id: "col-bourgoin",
          title: "Couplet 4",
          description: [
            "Depuis l’île du Nord vous sautez sur la France,",
            "Sous la voile tricolore rejaillit l’espérance.",
            "Dans la lande bretonne vous ralliez les maquis,",
            "S’embrase Saint-Marcel sous vos ailes hardies.",
            "Vous anéantissez l’orgueil des oppresseurs,",
            "Pour libérer Paris aux clameurs des vainqueurs.",
          ],
        },
        {
          id: "col-bourgoin",
          title: "Couplet 5",
          description: [
            "Ce soir les cieux se fendent, reflétant votre ardeur.",
            "Fléchissant le genou le coeur plein de ferveur,",
            "Nous jurons d’être droits à l’heure des assauts,",
            "Intrépides et fiers, sans craintes ni sursauts.",
            "Qu’à votre nom glorieux soit lié pour toujours,",
            "L’hommage du sang versé en notre dernier jour.",
          ],
        },
      ],
      music: {
        id: 'chant-promotion',
        name: "Chant promotion",
        subName: "Colonel Bourgoin",
        image: "assets/images/promotion/col-bourgoin.png",
        titles: [
          {
            id: 0,
            name: "Chant de la promotion Colonel Bourgoin",
            file: "assets/music/promotion/col-bourgoin/amarante/02 - Chant de la promotion Colonel Bourgoin.mp3",
          },
        ],
        platforms: [],
        slug: "chant-de-la-promotion-colonel-bourgoin",
      },
    },
    album: {
      id: 'amarante',
      name: "Amarante",
      subName: "Promotion Colonel Bourgoin",
      image: "assets/images/promotion/col-bourgoin/amarante.jpeg",
      titles: [
        {
          id: 1,
          name: "01 - L'audace de Servir",
          file: "assets/music/promotion/col-bourgoin/amarante/01 - L'audace de Servir.mp3",
        },
        {
          id: 2,
          name: "02 - Chant de la promotion Colonel Bourgoin",
          file: "assets/music/promotion/col-bourgoin/amarante/02 - Chant de la promotion Colonel Bourgoin.mp3",
        },
        {
          id: 3,
          name: "03 - Chant de la promotion Capitaine Bergot",
          file: "assets/music/promotion/col-bourgoin/amarante/03 - Chant de la promotion Capitaine Bergot.mp3",
        },
        {
          id: 4,
          name: "04 - Monsieur de Turenne",
          file: "assets/music/promotion/col-bourgoin/amarante/04 - Monsieur de Turenne.mp3",
        },
        {
          id: 5,
          name: "05 - Chant de la promotion Division Marocaine",
          file: "assets/music/promotion/col-bourgoin/amarante/05 - Chant de la promotion Division Marocaine.mp3",
        },
        {
          id: 6,
          name: "06 - Chant de la promotion Victoire de la Marne",
          file: "assets/music/promotion/col-bourgoin/amarante/06 - Chant de la promotion Victoire de la Marne.mp3",
        },
        {
          id: 7,
          name: "07 - Verdun",
          file: "assets/music/promotion/col-bourgoin/amarante/07 - Verdun.mp3",
        },
        {
          id: 8,
          name: "08 - Qui ose gagne",
          file: "assets/music/promotion/col-bourgoin/amarante/08 - Qui ose gagne.mp3",
        },
        {
          id: 9,
          name: "09 - Chant de bataillon de marche de l'Oubangui-Chari",
          file: "assets/music/promotion/col-bourgoin/amarante/09 - Chant de bataillon de marche de l'Oubangui-Chari.mp3",
        },
        {
          id: 10,
          name: "10 - Chant des Tirailleurs",
          file: "assets/music/promotion/col-bourgoin/amarante/10 - Chant des Tirailleurs.mp3",
        },
        {
          id: 11,
          name: "11 - Les oies sauvages",
          file: "assets/music/promotion/col-bourgoin/amarante/11 - Les oies sauvages.mp3",
        },
        {
          id: 12,
          name: "12 - It’s a long way to Tipperary",
          file: "assets/music/promotion/col-bourgoin/amarante/12 - It’s a long way to Tipperary.mp3",
        },
        {
          id: 13,
          name: "13 - Agni Parthene",
          file: "assets/music/promotion/col-bourgoin/amarante/13 - Agni Parthene.mp3",
        },
        {
          id: 14,
          name: "14 - Rappelle toi Jeanne",
          file: "assets/music/promotion/col-bourgoin/amarante/14 - Rappelle toi Jeanne.mp3",
        },
        {
          id: 15,
          name: "15 - Salve Regina des bergers du Rouergue",
          file: "assets/music/promotion/col-bourgoin/amarante/15 - Salve Regina des bergers du Rouergue.mp3",
        },
        {
          id: 16,
          name: "16 - Omni die dic Mariae",
          file: "assets/music/promotion/col-bourgoin/amarante/16 - Omni die dic Mariae.mp3",
        },
        {
          id: 17,
          name: "17 - Je ne l’ose dire",
          file: "assets/music/promotion/col-bourgoin/amarante/17 - Je ne l’ose dire.mp3",
        },
        {
          id: 18,
          name: "18 - Le tourdion",
          file: "assets/music/promotion/col-bourgoin/amarante/18 - Le tourdion.mp3",
        },
        {
          id: 19,
          name: "19 - Prêt dès ce soir",
          file: "assets/music/promotion/col-bourgoin/amarante/19 - Prêt dès ce soir.mp3",
        },
      ],
      platforms: [
        {
          link: "https://www.deezer.com/fr/",
          title: "Deezer",
          icon: "deezer",
        },
      ],
      slug: "amarante-promotion-colonel-bourgoin",
    },
    footer: {
      id: "col-bourgoin",
      title: "Décorations",
      background: "assets/images/promotion/col-bourgoin/bg2.jpg",
      image: "assets/images/promotion/col-bourgoin/about.jpg",
      logo: "assets/images/promotion/col-bourgoin/logo.png",
      text: [
        "Grand-croix de la Légion d’honneur",
        "Compagnon de la Libération (décret du 8 juillet 1943)",
        "Croix de guerre 1939-1945 (9 palmes, 2 étoiles d’argent)",
        "Médaille de la Résistance avec rosette",
        "Médaille coloniale",
        "Distinguished Service Order (Royaume-Uni)",
      ],
    },
    social: {
      id: "col-bourgoin",
      background: "assets/images/promotion/col-bourgoin/logo.png",
      social: [
        {
          link: "https://www.instagram.com/promotion_bourgoin/",
          title: "Instagram bourgoin",
          icon: "instagram",
        },
      ],
    },
    gallery: {
      id: "col-bourgoin",
      title: "Galerie",
      description: "Galerie de la promotion Colonel Bourgoin",
      gallery: [
        {
          image: "assets/images/promotion/col-bourgoin/gallery/14.jpg",
          type: GalleryType.image,
          description: "14 compagnie",
        },
        {
          image: "assets/images/promotion/col-bourgoin/gallery/15.jpg",
          type: GalleryType.image,
          description: "15 compagnie",
        },
        {
          image: "assets/images/promotion/col-bourgoin/gallery/13.jpg",
          type: GalleryType.image,
          description: "13 compagnie",
        },
        {
          image: "https://www.youtube.com/embed/YpYa_hMUw9I",
          type: GalleryType.youtube,
          description: "Baptême de la promotion",
          thumb: "assets/images/promotion/col-bourgoin/gallery/bapteme.jpg",
        },
        {
          image: "https://www.youtube.com/embed/mfTEyaPnYiE?start=3124",
          type: GalleryType.youtube,
          description: "Défilé du 14 juillet 2026",
          thumb: "assets/images/promotion/col-bourgoin/gallery/defile.JPG",
        },
        {
          image: "assets/images/promotion/col-bourgoin/gallery/cnec.mp4",
          type: GalleryType.video,
          mimeType: "video/mp4",
          description: "Cérémonie de remise des brevets CNEC",
        },
        {
          image: "assets/images/promotion/col-bourgoin/gallery/necropole.jpg",
          type: GalleryType.image,
        },
        {
          image: "assets/images/promotion/col-bourgoin/gallery/verdun.jpg",
          type: GalleryType.image,
        },
      ],
    },
  };
}
