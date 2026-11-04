import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class FilterService {
  public transform<T extends object>(
    items: T[] | null | undefined,
    searchText: string,
  ): T[] {
    if (!items) return [];
    if (!searchText) return items;

    return items.filter((item) => {
      return Object.values(item).some((value) => {
        return String(value).toLowerCase().includes(searchText.toLowerCase());
      });
    });
  }
}
