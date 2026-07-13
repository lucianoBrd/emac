import { GalleryType } from "../../enum/gallery.type";

export interface Gallery {
  id: Readonly<string>;
  title: string;
  description: string;
  gallery: Item[];
}

export interface Item {
  image: string;
  thumb?: string;
  mimeType?: string;
  description?: string;
  type: GalleryType;
}
