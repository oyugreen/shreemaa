import type { Metadata } from "next";
import { DistributionView } from "@/components/businesses/DistributionView";
import { FIGURES } from "@/config/site";

export const metadata: Metadata = {
  title: "Distribution Network",
  description: `India's leading distribution house for consumer brands, reaching ${FIGURES.retailers.prose} retailers through ${FIGURES.distributors.prose} distribution partners and a national field force.`,
  openGraph: {
    title: "Distribution Network · SMG",
    description: "India's leading distribution house for consumer brands.",
  },
  twitter: {
    description: "India's leading distribution house for consumer brands.",
  },
  alternates: {
    canonical: "/businesses/distribution-network",
  },
};

export default function DistributionNetworkPage() {
  return <DistributionView />;
}
