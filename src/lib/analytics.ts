/**
 * GA4 measurement ID. Analytics stays off (no tag, no cookies) until
 * NEXT_PUBLIC_GA_ID is set in the deployment environment.
 */
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";

type Gtag = (command: "event", name: string, params?: Record<string, unknown>) => void;

/**
 * Records a conversion such as a form submit. Mark `generate_lead`,
 * `job_application` and `newsletter_signup` as key events in GA4.
 */
export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  (window as Window & { gtag?: Gtag }).gtag?.("event", name, params);
}
