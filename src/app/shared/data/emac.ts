import record from "./emac.generated.json";
import { Emac } from "../models/emac.interface";

// Edited in content/emac.json through Pages CMS and validated before compilation.
export class EmacDB {
  static readonly emac: Emac = record;
}
