import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { BUSINESSES, BUSINESS_COUNT_WORD } from "@/config/site";

export const metadata: Metadata = {
  title: "Our Businesses",
  description:
    "Shri Maa Group's four businesses: marketplace operations, India's leading distribution house, global trade and exports through Rio World, and sustainability through OYU Green.",
  alternates: {
    canonical: "/businesses",
  },
};

const blurbs: Record<string, string> = {
  marketplace: "Catalog, ads, inventory, fulfilment and customer experience across India's leading marketplaces.",
  distribution: "India's leading distribution house, putting brands on shelves from metros to tier-3 towns.",
  "global-trade": "Rio World sources smartphones and consumer electronics and exports them to buyers worldwide.",
  sustainability: "OYU Green develops verified carbon and climate projects across Africa and India.",
};

export default function BusinessesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our businesses"
        title={<>{BUSINESS_COUNT_WORD} businesses. One commerce engine.</>}
        subtitle="Each built for a different route to market, together connecting brands with customers across India and the world."
      />
      <section className="py-16 md:py-24">
        <ul className="mx-auto grid max-w-7xl grid-cols-1 gap-5 px-6 md:grid-cols-2 lg:px-10">
          {BUSINESSES.map((b, i) => {
            const body = (
              <>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-soft">
                    {String(i + 1).padStart(2, "0")} / {String(BUSINESSES.length).padStart(2, "0")}
                  </span>
                  {b.external ? (
                    <ExternalLink className="h-5 w-5 text-ink-soft group-hover:text-accent" aria-hidden />
                  ) : (
                    <ArrowUpRight className="h-5 w-5 text-ink-soft group-hover:text-accent" />
                  )}
                </div>
                <h2 className="mt-8 font-display text-3xl font-semibold tracking-tight group-hover:text-accent md:text-4xl">
                  {b.name}
                </h2>
                <p className="mt-3 max-w-[48ch] text-ink-soft leading-relaxed">{blurbs[b.key]}</p>
              </>
            );
            const cls = "group block h-full rounded-3xl border border-line bg-white p-7 transition-colors hover:border-ink/30 md:p-10";
            return (
              <li key={b.key}>
                {b.external ? (
                  <a href={b.href} target="_blank" rel="noopener noreferrer" className={cls}>
                    {body}
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                ) : (
                  <Link href={b.href} className={cls}>
                    {body}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}
