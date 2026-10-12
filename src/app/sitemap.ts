import type { MetadataRoute } from "next";
import { SITE_URL } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/about",
    "/businesses",
    "/businesses/marketplace-operations",
    "/businesses/distribution-network",
    "/businesses/global-trade",
    "/careers",
    "/jobs",
    "/contact",
    "/privacy",
    "/terms",
  ];

  return paths.map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: "weekly",
    lastModified: new Date(),
  }));
}
