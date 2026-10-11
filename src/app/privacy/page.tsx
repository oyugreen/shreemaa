import type { Metadata } from "next";
import { LegalPage } from "@/components/site/LegalPage";
import { COMPANY_NAME, CONTACT } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Shri Maa Group collects, uses and protects personal data shared through this website.",
  alternates: { canonical: "/privacy" },
};

// Draft privacy notice under India's Digital Personal Data Protection Act, 2023.
// To be reviewed by SMG's legal counsel before launch.
export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="11 October 2026">
      <p>
        This notice explains how {COMPANY_NAME} (&ldquo;SMG&rdquo;, &ldquo;we&rdquo;) handles personal data you share
        through www.shrimaa.com, in line with India&apos;s Digital Personal Data Protection Act, 2023.
      </p>

      <h2>What we collect</h2>
      <ul>
        <li>Contact form: your name, email, phone number, company (optional), topic and message.</li>
        <li>Job applications: your name, email, phone number, LinkedIn URL (optional), CV and message.</li>
        <li>Newsletter: your work email address.</li>
        <li>Basic usage data, such as pages visited and device type, if analytics is enabled.</li>
      </ul>

      <h2>Why we use it</h2>
      <ul>
        <li>To reply to your enquiry and route it to the right team.</li>
        <li>To assess job applications and contact candidates.</li>
        <li>To send the briefings you asked for. You can unsubscribe at any time.</li>
        <li>To understand how the site is used and improve it.</li>
      </ul>
      <p>We process this data on the basis of the consent you give when you submit a form. We do not sell personal data.</p>

      <h2>Who we share it with</h2>
      <p>
        Only with SMG group companies and the service providers that host this website, deliver email or provide
        analytics, and only as needed for the purposes above. We may also disclose data where the law requires it.
      </p>

      <h2>How long we keep it</h2>
      <p>
        We keep enquiries for as long as needed to respond and follow up, and job applications for up to 12 months
        unless you ask us to delete them sooner. Data is then deleted.
      </p>

      <h2>Your rights</h2>
      <p>You can ask us to:</p>
      <ul>
        <li>tell you what personal data we hold about you and how we use it;</li>
        <li>correct, complete, update or erase it;</li>
        <li>withdraw your consent, which stops further processing;</li>
        <li>nominate another person to exercise these rights for you.</li>
      </ul>

      <h2>Contact and grievances</h2>
      <p>
        To exercise your rights or raise a concern, email our Grievance Officer at{" "}
        <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>. We will respond within the time the law allows. If you are
        not satisfied, you may complain to the Data Protection Board of India.
      </p>

      <h2>Changes</h2>
      <p>We may update this notice. The date at the top shows when it last changed.</p>
    </LegalPage>
  );
}
