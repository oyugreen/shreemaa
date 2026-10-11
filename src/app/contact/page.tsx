import type { Metadata } from "next";
import { ContactView } from "@/components/contact/ContactView";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Reach Shri Maa Group. Offices in Gurgaon and across India. We reply within one business day.",
  openGraph: {
    title: "Contact Shri Maa Group",
    description: "Say hello to SMG.",
  },
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return <ContactView />;
}
