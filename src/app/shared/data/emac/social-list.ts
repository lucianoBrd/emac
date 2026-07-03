import { Social } from "../../models/emac/social.interface";

export class SocialListDB {
  static list: Social[] = [
    {
      id: 1,
      link: "https://www.facebook.com/saintcyrcoetquidan",
      title: "Facebook AMSCC",
      icon: "facebook",
    },
    {
      id: 2,
      link: "https://x.com/SaintCyrCoet",
      title: "Twitter AMSCC",
      icon: "twitter",
    },
    {
      id: 3,
      link: "https://www.instagram.com/saintcyrcoetquidan/",
      title: "Instagram AMSCC",
      icon: "instagram",
    },
    {
      id: 4,
      link: "https://www.terre.defense.gouv.fr/amscc/devenir-officier/ecole-militaire-aspirants-coetquidan",
      title: "Terre Defense",
      icon: "book",
    },
    {
      id: 5,
      link: "https://github.com/lucianoBrd/emac/",
      title: "Contribuer",
      icon: "github",
    },
  ];
}
