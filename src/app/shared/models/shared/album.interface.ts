import { Platform } from "./platform.interface";
import { Title } from "./title.interface";

export interface Album {
  id: Readonly<string>;
  name: string;
  subName?: string;
  image: string;
  titles: Title[];
  platforms: Platform[];
  slug: string;
}
