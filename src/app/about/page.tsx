import type { Metadata } from "next";
import { AboutView } from "@/components/about/AboutView";

export const metadata: Metadata = {
  title: "About",
  description:
    "Shri Maa Group is a global commerce and distribution house, building the infrastructure, technology and networks that move products from the world's leading brands to millions of consumers.",
  openGraph: {
    title: "About · Shri Maa Group",
    description: "A global commerce and distribution house, connecting brands, markets and consumers across continents since 1997.",
  },
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return <AboutView />;
}
