import { Injectable } from "@angular/core";

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
