import { Promotion } from "../../models/promotion.interface";
import {EmacDB} from "../emac";

export class PromotionListDB {
  static readonly list: Promotion[] = [
    {
      id: "gal-morel",
      title: "Général René MOREL",
      number: 3,
      logo: "assets/images/promotion/gal-morel.PNG",
      startDate: new Date(2022, 1, 1),
      endDate: new Date(2023, 1, 1),
      detail: {
        id: "gal-morel",
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
    },
    {
      id: "ltn-michard",
      title: "Lieutenant MICHARD",
      number: 4,
      logo: "assets/images/promotion/ltn-michard.PNG",
      startDate: new Date(2023, 1, 1),
      endDate: new Date(2024, 1, 1),
      detail: {
        id: "ltn-michard",
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
    },
    {
      id: "ces-chomel-de-jarnieu",
      title: "Chef d’escadrons CHOMEL de JARNIEU",
      number: 5,
      logo: "assets/images/promotion/ces-chomel-de-jarnieu.PNG",
      startDate: new Date(2024, 1, 1),
      endDate: new Date(2025, 1, 1),
      detail: {
        id: "ces-chomel-de-jarnieu",
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
    },
    {
      id: "col-bourgoin",
      title: "Colonel BOURGOIN",
      number: 6,
      logo: "assets/images/promotion/col-bourgoin.png",
      startDate: new Date(2025, 1, 1),
      endDate: new Date(2026, 1, 1),
      detail: {
        id: "col-bourgoin",
        header: {
          id: "col-bourgoin",
          logo: "assets/images/promotion/col-bourgoin.png",
          background: "assets/images/promotion/col-bourgoin/header.jpg",
          text: [
              "Colonel Pierre-Louis",
              "Bourgoin",
          ],
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
      },
    },
  ];
}
