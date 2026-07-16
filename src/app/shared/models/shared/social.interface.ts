import { Platform } from "./platform.interface";

export interface Social {
  id: Readonly<string>;
  background: string;
  social: Platform[];
}
