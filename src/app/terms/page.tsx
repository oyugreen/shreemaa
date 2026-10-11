import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/site/LegalPage";
import { COMPANY_NAME, CONTACT } from "@/config/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "The terms that apply to your use of the Shri Maa Group website.",
  alternates: { canonical: "/terms" },
};

// Draft website terms. To be reviewed by SMG's legal counsel before launch.
export default function TermsPage() {
  return (
    <LegalPage title="Terms of Use" updated="11 October 2026">
      <p>
        These terms apply to your use of www.shrimaa.com, operated by {COMPANY_NAME} (&ldquo;SMG&rdquo;, &ldquo;we&rdquo;).
        By using the site you agree to them.
      </p>

      <h2>About the content</h2>
      <p>
        The site describes SMG&apos;s businesses for general information. Figures and descriptions may change and are not
        an offer, a guarantee of results or a binding commitment. Any business relationship is governed by a separate
        written agreement.
      </p>

      <h2>Intellectual property</h2>
      <p>
        The SMG name, logo, text, images and design of this site belong to SMG or its licensors. Brand names of partners
        and marketplaces belong to their owners and appear only to describe our work. You may not copy or reuse site
        content for commercial purposes without our written permission.
      </p>

      <h2>Acceptable use</h2>
      <ul>
        <li>Do not misuse the site, attempt to gain unauthorised access, or disrupt its operation.</li>
        <li>Do not submit false, misleading or unlawful information through our forms.</li>
      </ul>

      <h2>External links</h2>
      <p>
        Some links, such as OYU Green, open other websites. We are not responsible for their content or privacy practices.
      </p>

      <h2>Your information</h2>
      <p>
        How we handle data you share with us is described in our <Link href="/privacy">Privacy Policy</Link>.
      </p>

      <h2>Liability</h2>
      <p>
        The site is provided &ldquo;as is&rdquo;. To the extent the law allows, SMG is not liable for any loss arising from
        your use of the site or reliance on its content.
      </p>

      <h2>Governing law</h2>
      <p>These terms are governed by the laws of India.</p>

      <h2>Contact</h2>
      <p>
        Questions about these terms: <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>.
      </p>
    </LegalPage>
  );
}
