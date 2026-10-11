import { renderOgImage } from "@/lib/ogImage";

export const alt = "Rio World, global trade and exports at Shri Maa Group";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return renderOgImage({ eyebrow: "Global Trade & Exports · Rio World", title: "Sourcing the world. Exporting India." });
}
