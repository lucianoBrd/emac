import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class FilterService {
  public transform(items: any[], searchText: string): any[] {
    if (!items) return [];
    if (!searchText) return items;

    return items.filter((item) => {
      return Object.keys(item).some((key) => {
        return String(item[key])
          .toLowerCase()
          .includes(searchText.toLowerCase());
      });
    });
  }
}
