import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { generatePromotions, loadPromotions } from "./generate-promotions.mjs";
import { generateEmac, loadEmac } from "./generate-emac.mjs";

export function generateContent() {
  // Validate everything before replacing the last valid development content.
  const emac = loadEmac();
  const promotions = loadPromotions();
  generateEmac(emac);
  generatePromotions(promotions);
}

if (
  process.argv[1] &&
  resolve(process.argv[1]) === fileURLToPath(import.meta.url)
)
  generateContent();
