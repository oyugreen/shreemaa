import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";
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
      {/* Dark hero in the home page's Who we are style. */}
      <section className="relative overflow-hidden bg-ink text-white">
        <div aria-hidden className="absolute -top-32 -left-32 h-[420px] w-[420px] rounded-full bg-brand/30 blur-[140px]" />
        <div aria-hidden className="absolute -bottom-40 right-0 h-[480px] w-[480px] rounded-full bg-brand-3/20 blur-[160px]" />
        <div className="relative mx-auto max-w-7xl px-6 pt-32 pb-20 md:pt-40 md:pb-28 lg:px-10">
          <div className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">Our businesses</div>
          <h1 className="mt-4 max-w-4xl text-5xl font-bold leading-[1.02] tracking-tight md:text-7xl">
            {BUSINESS_COUNT_WORD} businesses.
            <br />
            One <span className="font-serif-display italic text-accent">commerce engine.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/65 md:text-xl">
            Each built for a different route to market, together connecting brands with customers across India and the
            world.
          </p>
        </div>
      </section>
      <section className="bg-surface py-16 md:py-24">
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
                <h2 className="mt-8 font-display text-3xl font-semibold tracking-tight transition-colors group-hover:text-accent md:text-4xl">
                  {b.name}
                </h2>
                <p className="mt-3 max-w-[48ch] text-ink-soft leading-relaxed">{blurbs[b.key]}</p>
              </>
            );
            const cls = "group block h-full rounded-3xl border border-line bg-white p-7 transition-[border-color,box-shadow] hover:border-ink/30 hover:shadow-elevated md:p-10";
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
