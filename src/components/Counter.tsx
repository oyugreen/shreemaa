"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

/**
 * Animated number. The server renders the real value, so search engines, link
 * previews and slow phones never see "0". Only a counter that starts below the
 * fold resets to 0 on hydration and counts up when it scrolls into view; one
 * already on screen, or under reduced motion, simply stays at its value.
 */
export function Counter({
  to,
  prefix = "",
  suffix = "",
  duration = 1800,
}: {
  to: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [val, setVal] = useState(to);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top > window.innerHeight) {
      setVal(0);
      setArmed(true);
    }
  }, []);

  useEffect(() => {
    if (!armed || !inView) return;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(Math.max((t - start) / duration, 0), 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.floor(eased * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [armed, inView, to, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {val.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}
