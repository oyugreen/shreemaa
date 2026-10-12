/**
 * Single source for every company fact the site states: figures, offices,
 * businesses, contact details and outbound links. Pages read from here so the
 * same number can never read differently on two pages.
 *
 * Figures are the values SMG confirmed in the Oct 2026 website change list.
 * Change a figure here and every page, meta description and stat updates.
 *
 * Links left as "" are not rendered anywhere until a real URL is filled in;
 * a dead link is worse than none.
 */

export const SITE_URL = "https://www.shrimaa.com";
export const COMPANY_NAME = "Shri Maa Group";

// ── Figures ────────────────────────────────────────────────────────────────
// `to` + `suffix` feed the animated <Counter>; `text` is the compact form for
// stat tiles; `prose` is the form used in sentences and meta descriptions.
export type Figure = { to: number; suffix: string; text: string; prose: string };

const figure = (to: number, suffix: string, prose: string): Figure => ({
  to,
  suffix,
  text: `${to.toLocaleString("en-IN")}${suffix}`,
  prose,
});

export const FOUNDED_YEAR = 1997;

export const FIGURES = {
  retailers: figure(80, "K+", "80,000+"),
  distributors: figure(600, "+", "600+"),
  manufacturers: figure(100, "+", "100+"),
  warehousingSqFt: figure(150, "K sq ft", "150,000 sq ft"),
  fulfilmentCentres: figure(70, "+", "70+"),
  marketplaceOrdersPerMonth: figure(1, "M+", "1 million+"),
  consumersReached: figure(300, "M+", "300 million"),
  yearsInBusiness: figure(30, "", "30 years"),
  teamMembers: figure(500, "+", "500+"),
  pincodeCoverage: figure(80, "%", "80%"),
} as const;

/** Scale without a revenue figure: devices moved, as a rate. */
export const DEVICE_THROUGHPUT = {
  stat: "1 every 8 sec",
  label: "Smartphones delivered",
  caption: "50 lakh+ devices delivered every year, day and night",
};

// ── Offices ────────────────────────────────────────────────────────────────
// Gurgaon leads every office list. There is no headquarters label anywhere on
// the site. `address` / `mapQuery` are filled only where the address is
// confirmed; the others list without a map link until SMG supplies one.
export type Office = {
  city: string;
  country: string;
  state: string;
  role: string;
  focus: string;
  /** [lng, lat] */
  coords: [number, number];
  address?: string;
  mapQuery?: string;
};

export const OFFICES: Office[] = [
  { city: "Gurgaon",   country: "India",     state: "Haryana",        role: "Corporate Office", focus: "Corporate functions, partnerships and technology", coords: [77.03, 28.46], address: "Enkay Centre, Udyog Vihar Phase 5, Sector 19, Gurugram 122016", mapQuery: "Enkay centre, Udyog vihar, phase 5, Sector 19, Gurugram, Haryana 122016" },
  { city: "Bhopal",    country: "India",     state: "Madhya Pradesh", role: "Regional Office",  focus: "Central India operations and group functions",     coords: [77.41, 23.26], address: "Shri Maa Group, Bhopal, Madhya Pradesh", mapQuery: "Shri Maa Group, Bhopal, Madhya Pradesh, India" },
  { city: "Mumbai",    country: "India",     state: "Maharashtra",    role: "Regional Office",  focus: "West India commercial operations",                 coords: [72.88, 19.08] },
  { city: "Hyderabad", country: "India",     state: "Telangana",      role: "Regional Office",  focus: "South India distribution and market expansion",    coords: [78.49, 17.39] },
  { city: "Indore",    country: "India",     state: "Madhya Pradesh", role: "Regional Office",  focus: "Central India warehousing and logistics",          coords: [75.86, 22.72] },
  { city: "Dubai",     country: "UAE",       state: "Dubai",          role: "Regional Office",  focus: "Global trade, sourcing and re-export corridors",   coords: [55.27, 25.20] },
  { city: "Singapore", country: "Singapore", state: "Singapore",      role: "Regional Office",  focus: "Trade finance and Southeast Asia distribution",    coords: [103.82, 1.35] },
  { city: "New York",  country: "USA",       state: "New York",       role: "Regional Office",  focus: "Americas brand partnerships and market access",    coords: [-74.00, 40.71] },
  { city: "Kampala",   country: "Uganda",    state: "Central Region", role: "Regional Office",  focus: "East Africa distribution build-out",               coords: [32.58, 0.32] },
];

export const OFFICE_HOURS = "Mon to Sat, 10:00 to 19:00 IST";

const NUMBER_WORDS = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"];
/** "Nine", "Four"… for headings; falls back to digits past ten. */
export const countWord = (n: number) => NUMBER_WORDS[n] ?? String(n);

// ── Contact and outbound links ─────────────────────────────────────────────
export const CONTACT = {
  email: "contact@shrimaa.com",
  careersEmail: "careers@shrimaa.com",
  /** Company board line or WhatsApp Business number, e.g. "+91 124 000 0000". */
  phone: "",
};

export const SOCIAL = {
  /** Company page, e.g. https://www.linkedin.com/company/… */
  linkedin: "",
  instagram: "",
};

export const OYU_GREEN_URL = "https://www.oyugreen.com";

/** External partner KYC / onboarding portal. Must be https. */
export const PARTNER_ONBOARDING_URL = "";
/** Partner and employee logins from the old site, if still needed. */
export const LOGIN_LINKS: { label: string; href: string }[] = [];

/** Only https URLs are ever rendered as outbound partner links. */
export const isSafeExternalUrl = (url: string) => /^https:\/\/[^\s]+$/.test(url);

// ── Businesses ─────────────────────────────────────────────────────────────
// Exports sit inside Global Trade (Rio World); the group has four businesses.
export type Business = {
  key: string;
  name: string;
  shortName: string;
  href: string;
  external?: boolean;
  desc: string;
};

export const BUSINESSES: Business[] = [
  { key: "marketplace", name: "Marketplace Operations", shortName: "Marketplace", href: "/businesses/marketplace-operations", desc: "Amazon, Flipkart & beyond" },
  { key: "distribution", name: "Distribution Network", shortName: "Distribution", href: "/businesses/distribution-network", desc: `${FIGURES.retailers.prose} retailers nationwide` },
  { key: "global-trade", name: "Global Trade & Exports · Rio World", shortName: "Global Trade & Exports", href: "/businesses/global-trade", desc: "Cross-border sourcing and exports" },
  { key: "sustainability", name: "Sustainability · OYU Green", shortName: "Sustainability", href: OYU_GREEN_URL, external: true, desc: "Carbon & climate · oyugreen.com" },
];

export const BUSINESS_COUNT_WORD = countWord(BUSINESSES.length);
