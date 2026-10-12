import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you're looking for doesn't exist or has moved.",
};

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-background px-6 pt-28 pb-16">
      <div className="max-w-md text-center">
        <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">Error 404</div>
        <h1 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl">Page not found</h1>
        <p className="mt-4 text-ink-soft">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-ink px-6 text-sm font-medium text-white hover:bg-ink/85 transition-colors"
          >
            Go home
          </Link>
          <Link
            href="/contact"
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-line px-6 text-sm font-medium text-ink hover:border-ink/30 transition-colors"
          >
            Contact us
          </Link>
        </div>
      </div>
    </div>
  );
}
