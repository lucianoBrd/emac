import { Injectable } from "@angular/core";

import { AboutListDB } from "../../data/emac/about-list";
import { About } from "../../models/emac/about.interface";
import {Social} from "../../models/emac/social.interface";
import {SocialListDB} from "../../data/emac/social-list";

@Injectable({
  providedIn: "root",
})
export class SocialService {
  getSocials(): Social[] {
    return SocialListDB.list
      .slice()
      .sort((a: Social, b: Social): number => a.id - b.id);
  }
}
