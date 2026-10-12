import type { Metadata } from "next";
import { HomeView } from "@/components/home/HomeView";
import { COMPANY_NAME, CONTACT, FIGURES, FOUNDED_YEAR, OFFICES, OYU_GREEN_URL, SITE_URL, SOCIAL } from "@/config/site";

export const metadata: Metadata = {
  title: "Shri Maa Group · The Launchpad for Global Brands",
  description: `India's leading distribution house and a global commerce group, reaching ${FIGURES.consumersReached.prose} consumers through ${FIGURES.retailers.prose} retailers and ${FIGURES.fulfilmentCentres.prose} fulfilment centres.`,
  openGraph: {
    title: "Shri Maa Group · The Launchpad for Global Brands",
    description: "Helping brands scale across e-commerce, distribution and global trade.",
  },
  alternates: {
    canonical: "/",
  },
};

const corporateOffice = OFFICES[0];

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: COMPANY_NAME,
  alternateName: "SMG",
  url: SITE_URL,
  logo: `${SITE_URL}/icon.png`,
  foundingDate: String(FOUNDED_YEAR),
  email: CONTACT.email,
  ...(CONTACT.phone ? { telephone: CONTACT.phone } : {}),
  address: {
    "@type": "PostalAddress",
    streetAddress: "Enkay Centre, Udyog Vihar Phase 5, Sector 19",
    addressLocality: "Gurugram",
    addressRegion: corporateOffice.state,
    postalCode: "122016",
    addressCountry: "IN",
  },
  sameAs: [SOCIAL.linkedin, SOCIAL.instagram, OYU_GREEN_URL].filter(Boolean),
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c") }}
      />
      <HomeView />
    </>
  );
}
