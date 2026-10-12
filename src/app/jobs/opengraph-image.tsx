import { renderOgImage } from "@/lib/ogImage";

export const alt = "Open roles at Shri Maa Group";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return renderOgImage({ eyebrow: "Careers", title: "Come build something that lasts." });
}
