import { Social } from "../../models/emac/social.interface";

export class SocialListDB {
  static list: Social[] = [
    {
      id: 1,
      link: "https://www.facebook.com/saintcyrcoetquidan",
      title: "Facebook AMSCC",
      fa: "fa fa-facebook",
    },
    {
      id: 2,
      link: "https://x.com/SaintCyrCoet",
      title: "Twitter AMSCC",
      fa: "fa fa-twitter",
    },
    {
      id: 3,
      link: "https://www.instagram.com/saintcyrcoetquidan/",
      title: "Instagram AMSCC",
      fa: "fa fa-instagram",
    },
    {
      id: 4,
      link: "https://www.terre.defense.gouv.fr/amscc/devenir-officier/ecole-militaire-aspirants-coetquidan",
      title: "Terre Defense",
      fa: "fa fa-book",
    },
  ];
}
