import { DOCUMENT } from "@angular/common";
import { inject, Injectable } from "@angular/core";
import { Meta, Title } from "@angular/platform-browser";

import { ConfigDB } from "../data/config";
import { EmacDB } from "../data/emac";
import { PromotionDB } from "../data/promotion";

const SITE_URL = "https://st-cyr-emac.org";

@Injectable({ providedIn: "root" })
export class MetaService {
  private document = inject(DOCUMENT);
  private titleService = inject(Title);
  private metaService = inject(Meta);

  private plainText(value: string): string {
    const element = this.document.createElement("div");
    element.innerHTML = value;
    return (element.textContent ?? "").replace(/\s+/g, " ").trim();
  }

  public setTitle(value: string | undefined): void {
    if (!value) return;
    const title = `${this.plainText(value)} | ${ConfigDB.data.app_name}`;
    this.titleService.setTitle(title);
    this.metaService.updateTag({ property: "og:title", content: title });
    this.metaService.updateTag({ name: "twitter:title", content: title });
  }

  public setDescription(value: string | undefined): void {
    if (!value) return;
    const content = this.plainText(value);
    this.metaService.updateTag({ name: "description", content });
    this.metaService.updateTag({ property: "og:description", content });
    this.metaService.updateTag({ name: "twitter:description", content });
  }

  public setKeywords(value: string | undefined): void {
    if (!value) return;
    this.metaService.updateTag({
      name: "keywords",
      content: ConfigDB.data.keywords + "," + value,
    });
  }

  public updatePage(url: string): void {
    const path = url.split(/[?#]/)[0].replace(/\/+$/, "") || "/";
    const match = path.match(/^\/promotions\/([^/]+)(\/gallery)?$/);
    const promotion =
      match && PromotionDB.list.find((item) => item.id === match[1]);
    const gallery = Boolean(match?.[2]);
    const indexable =
      path === "/" ||
      path === "/promotions" ||
      Boolean(promotion && (!gallery || promotion.gallery?.gallery.length));
    const canonicalUrl = `${SITE_URL}${path === "/" ? "/" : path + "/"}`;

    this.document.head
      .querySelectorAll('link[rel="canonical"]')
      .forEach((link) => link.remove());
    this.metaService.updateTag({
      name: "robots",
      content: indexable ? "index, follow" : "noindex, follow",
    });
    if (indexable) {
      const canonical = this.document.createElement("link");
      canonical.rel = "canonical";
      canonical.href = canonicalUrl;
      this.document.head.appendChild(canonical);
      this.metaService.updateTag({ property: "og:url", content: canonicalUrl });
    } else {
      this.metaService.removeTag('property="og:url"');
    }

    let title = ConfigDB.wordings.page_not_found.title;
    let description = ConfigDB.wordings.page_not_found.description;
    let image = EmacDB.emac.header.logo;
    if (path === "/") {
      title = EmacDB.emac.title;
      description = EmacDB.emac.description;
    } else if (path === "/promotions") {
      title = ConfigDB.wordings.promotion.list.title;
      description = ConfigDB.wordings.promotion.list.description
        .join(" ")
        .replaceAll("{{numberOfPromotion}}", String(PromotionDB.list.length));
    } else if (promotion) {
      title = `${gallery ? "Galerie de la promotion" : "Promotion"} ${promotion.title}`;
      description = gallery
        ? promotion.gallery?.description ||
          `Photographies et souvenirs de la promotion ${promotion.title} de l'EMAC.`
        : `Découvrez la promotion ${promotion.title} (${promotion.startDate.getFullYear()}–${promotion.endDate.getFullYear()}) de l'École militaire des aspirants de Coëtquidan : histoire, traditions et souvenirs.`;
      image = promotion.logo;
    } else if (path === "/maintenance") {
      title = ConfigDB.wordings.maintenance.title;
      description = ConfigDB.wordings.maintenance.description;
    }
    this.setTitle(title);
    this.setDescription(description);
    this.metaService.updateTag({ property: "og:type", content: "website" });
    this.metaService.updateTag({ property: "og:site_name", content: "EMAC" });
    this.metaService.updateTag({ property: "og:locale", content: "fr_FR" });
    this.metaService.updateTag({
      property: "og:image",
      content: new URL(image, SITE_URL).href,
    });
    this.metaService.updateTag({
      property: "og:image:alt",
      content: this.plainText(title),
    });
    this.metaService.updateTag({ name: "twitter:card", content: "summary" });
    this.metaService.updateTag({
      name: "twitter:image",
      content: new URL(image, SITE_URL).href,
    });
  }
}
