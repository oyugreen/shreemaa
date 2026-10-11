import { renderOgImage } from "@/lib/ogImage";

export const alt = "Distribution Network at Shri Maa Group";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return renderOgImage({ eyebrow: "Distribution Network", title: "India's leading distribution house." });
}
