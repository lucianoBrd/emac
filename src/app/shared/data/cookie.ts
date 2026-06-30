import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class Cookie {
  static layoutVersion: string = "layoutVersion";
  static layoutType: string = "layoutType";
  static languageCode: string = "languageCode";
}
