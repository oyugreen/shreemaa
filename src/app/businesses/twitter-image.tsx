import { renderOgImage } from "@/lib/ogImage";

export const alt = "Shri Maa Group businesses";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function TwitterImage() {
  return renderOgImage({ eyebrow: "Our businesses", title: "Four businesses. One commerce engine." });
}
