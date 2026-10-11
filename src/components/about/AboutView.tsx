"use client";

import { Counter } from "@/components/Counter";
import { AboutHero } from "./hero/AboutHero";
import { CommerceGlobe } from "@/components/site/CommerceGlobe";
import { FIGURES, FOUNDED_YEAR, OFFICES, countWord } from "@/config/site";

export function AboutView() {
  return (
    <>
      <AboutHero />

      <CommerceGlobe locations={OFFICES} />

      {/* WHO WE ARE */}
      <section className="bg-ink text-white py-20 md:py-36">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 mb-20">
            <div className="md:col-span-4 text-[11px] uppercase tracking-[0.22em] text-white/50">
              <div className="h-px w-8 bg-white/40 mb-4" /> Who we are
            </div>
            <h2 className="md:col-span-8 text-3xl md:text-5xl leading-[1.1] tracking-tight font-bold max-w-[22ch]">
              An integrated commerce group <span className="font-serif-display italic text-white/70">connecting brands, markets and consumers</span> across three continents.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 border border-white/10">
            {[
              { n: "01", t: "Origin",    d: `Started from humble beginnings in ${FOUNDED_YEAR} as a single distribution business in India.` },
              { n: "02", t: "Evolution", d: `Since ${FOUNDED_YEAR} we have built marketplace, distribution, global trade and sustainability businesses. Each one operates at national scale.` },
              { n: "03", t: "Today",     d: `An India-rooted company with ${countWord(OFFICES.length).toLowerCase()} offices across India, the Middle East, Asia Pacific, the Americas and Africa, powered by in-house technology across order management, distribution and marketplace operations.` },
            ].map((b) => (
              <div key={b.n} className="bg-ink p-10 md:p-12">
                <div className="font-serif-display text-5xl text-accent">{b.n}</div>
                <div className="mt-10 text-xs uppercase tracking-[0.22em] text-white/50">{b.t}</div>
                <p className="mt-4 text-base md:text-lg text-white/80 leading-relaxed">{b.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founding leadership: the sample profiles and generated portraits are not
          published. Restore <PeopleStories /> once approved stories and photographs
          of SMG's leadership are ready. */}

      {/* BY THE NUMBERS */}
      <section className="bg-surface py-20 md:py-36">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid grid-cols-1 gap-x-12 gap-y-12 sm:grid-cols-2 md:gap-y-24 lg:grid-cols-3 lg:gap-x-20">
            {[
              {
                v: <Counter to={FIGURES.consumersReached.to} suffix={FIGURES.consumersReached.suffix} />,
                d: "Consumers reached through our distribution, marketplace and global trade businesses.",
                color: "text-[#d24f34]",
              },
              {
                v: <Counter to={FIGURES.retailers.to} suffix={FIGURES.retailers.suffix} />,
                d: "Active retailers connected across metro, regional and emerging markets.",
                color: "text-[#d55155]",
              },
              {
                v: <Counter to={FIGURES.manufacturers.to} suffix={FIGURES.manufacturers.suffix} />,
                d: "Brand and manufacturer partners distributed across our network.",
                color: "text-[#b48700]",
              },
              {
                v: <Counter to={FIGURES.warehousingSqFt.to} suffix="K" />,
                d: "Square feet of owned warehousing and operating infrastructure.",
                color: "text-[#436ce0]",
              },
              {
                v: <Counter to={FIGURES.fulfilmentCentres.to} suffix={FIGURES.fulfilmentCentres.suffix} />,
                d: "Fulfilment centres supporting dependable, high-volume movement of goods.",
                color: "text-[#d24f34]",
              },
              {
                v: <>{OFFICES.length}</>,
                d: "Global offices connecting India with markets across three continents.",
                color: "text-[#3f8d68]",
              },
            ].map((s, i) => (
              <div key={i} className="max-w-sm">
                <div className={`font-display font-medium leading-[0.92] tracking-[-0.045em] text-[clamp(2.375rem,calc(5vw-10px),4.625rem)] ${s.color}`}>
                  {s.v}
                </div>
                <p className="mt-7 max-w-[29ch] text-base leading-[1.45] text-ink md:text-lg">
                  {s.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRINCIPLES */}
      <section className="bg-surface py-28 md:py-36">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid grid-cols-1 gap-10 md:mb-16 md:grid-cols-12 md:gap-16 mb-12">
            <div className="text-[11px] uppercase tracking-[0.22em] text-ink-soft md:col-span-4">
              <div className="mb-4 h-px w-8 bg-ink/30" /> What we believe
            </div>
            <h2 className="max-w-[22ch] text-3xl font-bold leading-[1.1] tracking-tight md:col-span-8 md:text-5xl">
              Long-term partnerships. <span className="font-serif-display italic text-accent">Disciplined execution.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-x-3 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { t: "Partner for decades.", d: "The strongest commercial relationships are built patiently, one layer of trust at a time.", visual: "stack" as const },
              { t: "Build the infrastructure first.", d: "Owned systems, facilities and networks create dependable growth without shortcuts.", visual: "grid" as const },
              { t: "Technology as infrastructure.", d: "Purpose-built tools keep every order, partner and marketplace moving in sync.", visual: "orbit" as const },
              { t: "Move with the market.", d: "We listen for change early, adapt the model and meet commerce wherever it goes next.", visual: "signal" as const },
            ].map((p, i) => (
              <article key={p.t} className="group border-t border-line pt-3 transition-transform duration-500 ease-out hover:-translate-y-1">
                <div className="flex aspect-[4/4.35] items-center justify-center overflow-hidden rounded-sm bg-[#efede8] transition-[background-color,box-shadow] duration-500 ease-out group-hover:bg-[#ebe8e2] group-hover:shadow-[0_18px_45px_-32px_rgba(25,22,19,0.45)] [&>svg]:transition-transform [&>svg]:duration-500 [&>svg]:ease-out group-hover:[&>svg]:scale-[1.035]">
                  <BeliefVisual type={p.visual} />
                </div>
                <div className="mt-7 flex items-center gap-2 text-xs tabular-nums text-ink-soft">
                  <span className="bg-[#efede8] px-2 py-1 text-ink">{String(i + 1).padStart(2, "0")}</span>
                  <span>/ 04</span>
                </div>
                <h3 className="mt-7 font-serif-display text-2xl leading-tight text-ink md:text-3xl">{p.t}</h3>
                <p className="mt-4 border-b border-dashed border-line pb-7 text-base leading-relaxed text-ink-soft">{p.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

    </>
  );
}

function BeliefVisual({ type }: { type: "grid" | "stack" | "orbit" | "signal" }) {
  if (type === "grid") {
    return (
      <svg viewBox="0 0 240 240" className="h-3/5 w-3/5" aria-hidden="true">
        {Array.from({ length: 24 }, (_, i) => (
          <circle
            key={i}
            cx={42 + (i % 6) * 31}
            cy={58 + Math.floor(i / 6) * 41}
            r="5"
            className="belief-dot"
          />
        ))}
        <circle cx="135" cy="99" r="5" fill="#e6533f" stroke="#e6533f" strokeWidth="1.5">
          <animate
            attributeName="r"
            values="5;7.5;5"
            keyTimes="0;0.5;1"
            keySplines="0.4 0 0.2 1;0.4 0 0.2 1"
            calcMode="spline"
            dur="2.2s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    );
  }

  if (type === "stack") {
    return (
      <svg viewBox="0 0 240 240" className="h-3/5 w-3/5" aria-hidden="true">
        <line x1="50" y1="190" x2="190" y2="190" className="belief-line" />
        {[0, 1, 2, 3, 4].map((i) => (
          <rect
            key={i}
            x="70"
            y={152 - i * 29}
            width="100"
            height="24"
            className={`belief-stack-layer ${i === 4 ? "belief-stack-accent" : ""}`}
            style={{ animationDelay: `${i * 160}ms` }}
          />
        ))}
      </svg>
    );
  }

  if (type === "orbit") {
    return (
      <svg viewBox="0 0 240 240" className="h-3/5 w-3/5" aria-hidden="true">
        <g className="belief-orbit" style={{ transformOrigin: "120px 120px" }}>
          {Array.from({ length: 24 }, (_, i) => (
            <line key={i} x1="120" y1="35" x2="120" y2="48" transform={`rotate(${i * 15} 120 120)`} className={i > 8 && i < 13 ? "belief-tick-accent" : "belief-tick"} />
          ))}
        </g>
        <line x1="101" y1="120" x2="139" y2="120" className="belief-line-dark" />
        <line x1="120" y1="101" x2="120" y2="139" className="belief-line-dark" />
      </svg>
    );
  }

  const bars = [18, 42, 68, 44, 92, 74, 48, 28, 14];
  return (
    <svg viewBox="0 0 240 240" className="h-3/5 w-3/5" aria-hidden="true">
      {bars.map((height, i) => (
        <rect
          key={i}
          x={42 + i * 18}
          y={120 - height / 2}
          width="8"
          height={height}
          className={`belief-signal ${i === 4 ? "belief-signal-accent" : ""}`}
          style={{ animationDelay: `${i * -130}ms`, transformOrigin: `${46 + i * 18}px 120px` }}
        />
      ))}
    </svg>
  );
}
