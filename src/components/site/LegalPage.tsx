import type { ReactNode } from "react";

/** Plain long-form layout for the Privacy Policy and Terms of Use. */
export function LegalPage({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <article className="mx-auto max-w-3xl px-6 pt-32 pb-24 md:pt-40">
      <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">Legal</div>
      <h1 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl">{title}</h1>
      <p className="mt-3 text-sm text-ink-soft">Last updated {updated}</p>
      <div className="mt-10 space-y-5 text-[15px] leading-relaxed text-ink/85 [&_a]:text-accent [&_a]:underline [&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-ink [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5">
        {children}
      </div>
    </article>
  );
}
