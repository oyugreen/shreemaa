"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  ExternalLink,
  Phone,
} from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { LinkedinIcon, InstagramIcon } from "@/components/icons/BrandIcons";
import { Honeypot } from "@/components/site/Honeypot";
import {
  CONTACT,
  OFFICES,
  OFFICE_HOURS,
  PARTNER_ONBOARDING_URL,
  SOCIAL,
  isSafeExternalUrl,
} from "@/config/site";
import { trackEvent } from "@/lib/analytics";
import { CONTACT_TOPICS, HONEYPOT_FIELD, contactSchema, type FormResponse } from "@/lib/forms";

const greetings = ["Hello.", "Namaste.", "Salaam.", "Vanakkam.", "Sat Sri Akaal.", "Kem Cho."];

const inquiries = CONTACT_TOPICS;

const socials = [
  ...(SOCIAL.linkedin ? [{ Icon: LinkedinIcon, href: SOCIAL.linkedin, label: "LinkedIn" }] : []),
  ...(SOCIAL.instagram ? [{ Icon: InstagramIcon, href: SOCIAL.instagram, label: "Instagram" }] : []),
];

const onboardingUrl = isSafeExternalUrl(PARTNER_ONBOARDING_URL) ? PARTNER_ONBOARDING_URL : "";

type FieldErrors = Partial<Record<keyof z.infer<typeof contactSchema>, string>>;

export function ContactView() {
  const [greetIdx, setGreetIdx] = useState(0);
  const [type, setType] = useState<string>(inquiries[0].id);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setGreetIdx((i) => (i + 1) % greetings.length), 2400);
    return () => clearInterval(t);
  }, []);

  const activeInquiry = useMemo(
    () => inquiries.find((i) => i.id === type) ?? inquiries[0],
    [type],
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (sending) return;
    const fd = new FormData(e.currentTarget);
    const values = {
      name: fd.get("name"),
      company: fd.get("company"),
      email: fd.get("email"),
      phone: fd.get("phone"),
      topic: type,
      message: fd.get("message"),
    };
    const parsed = contactSchema.safeParse(values);
    if (!parsed.success) {
      const next: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof FieldErrors;
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      toast.error("Please fix the highlighted fields");
      return;
    }
    setErrors({});
    setSending(true);
    try {
      const res = await fetch("/api/forms/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...parsed.data, [HONEYPOT_FIELD]: fd.get(HONEYPOT_FIELD) }),
      });
      const result = (await res.json().catch(() => null)) as FormResponse | null;
      if (!result?.ok) {
        if (result?.fieldErrors) setErrors(result.fieldErrors as FieldErrors);
        toast.error(result?.error ?? "We couldn't send that right now. Please try again.");
        return;
      }
      trackEvent("generate_lead", { form: "contact", topic: type });
      setSubmitted(true);
      toast.success("Message sent. We will be in touch shortly.");
    } catch {
      toast.error("We couldn't send that right now. Check your connection and try again.");
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      {/* HERO — editorial, cycling greeting, live status rail */}
      <section className="relative bg-surface text-ink overflow-hidden pt-32 pb-20 md:pb-28">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "linear-gradient(to right, oklch(0.17 0.01 60 / 0.05) 1px, transparent 1px)",
            backgroundSize: "calc(100% / 12) 100%",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          {/* Main headline */}
          <div className="mt-16 md:mt-24">
              <h1 className="font-display font-semibold tracking-[-0.04em] leading-[0.9] text-[18vw] sm:text-[14vw] lg:text-[11vw]">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={greetings[greetIdx]}
                    initial={{ y: "0.6em", opacity: 0, rotate: 2 }}
                    animate={{ y: 0, opacity: 1, rotate: 0 }}
                    exit={{ y: "-0.6em", opacity: 0, rotate: -2 }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    className="inline-block font-serif-display italic text-accent"
                  >
                    {greetings[greetIdx]}
                  </motion.span>
                </AnimatePresence>
                <br />
                <span className="text-ink">Let&apos;s talk.</span>
              </h1>

              <div className="mt-12 grid grid-cols-12 gap-6">
                <p className="col-span-12 md:col-span-7 text-base md:text-lg text-ink-soft leading-relaxed max-w-2xl">
                  A brand looking to grow? A distributor ready for a new category? A buyer looking for reliable supply? Tell us what you need and the right SMG team will be in touch.
                </p>
                <div className="col-span-12 md:col-span-5 md:border-l md:border-ink/10 md:pl-6 space-y-3 text-sm">
                  <a href={`mailto:${CONTACT.email}`} className="flex min-h-11 items-center justify-between group">
                    <span className="text-ink-soft uppercase tracking-[0.16em] text-[11px]">Email</span>
                    <span className="font-medium group-hover:text-accent transition-colors flex items-center gap-1">
                      {CONTACT.email} <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </a>
                  {CONTACT.phone && (
                    <a href={`tel:${CONTACT.phone.replace(/[^+\d]/g, "")}`} className="flex min-h-11 items-center justify-between group">
                      <span className="text-ink-soft uppercase tracking-[0.16em] text-[11px]">Phone</span>
                      <span className="font-medium group-hover:text-accent transition-colors flex items-center gap-1">
                        <Phone className="h-3.5 w-3.5" /> {CONTACT.phone}
                      </span>
                    </a>
                  )}
                  <div className="flex min-h-11 items-center justify-between">
                    <span className="text-ink-soft uppercase tracking-[0.16em] text-[11px]">Reply</span>
                    <span className="font-medium">Within 1 business day</span>
                  </div>
                  {onboardingUrl && (
                    <a href={onboardingUrl} target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-center justify-between group">
                      <span className="text-ink-soft uppercase tracking-[0.16em] text-[11px]">Partners</span>
                      <span className="font-medium group-hover:text-accent transition-colors flex items-center gap-1">
                        Partner KYC / Onboarding <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                        <span className="sr-only">(opens in a new tab)</span>
                      </span>
                    </a>
                  )}
                </div>
              </div>
            </div>
        </div>

        {/* Marquee */}
        <div className="mt-24 border-y border-ink/10 py-5 overflow-hidden">
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: "-50%" }}
            transition={{ duration: 32, ease: "linear", repeat: Infinity }}
            className="flex w-max whitespace-nowrap gap-12 text-[clamp(2rem,5vw,4rem)] font-display font-semibold tracking-tight"
          >
            {Array.from({ length: 2 }).map((_, copy) => (
              <div key={copy} className="flex items-center gap-12">
                {inquiries.filter((q) => q.id !== "other").map((q) => q.label).map((w, i) => (
                  <span key={`${copy}-${i}`} className="flex items-center gap-12">
                    <span className={i % 2 === 0 ? "text-ink" : "text-ink/30 font-serif-display italic"}>
                      {w}
                    </span>
                    <span className="h-2 w-2 rounded-full bg-brand" />
                  </span>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 02 — Pick your conversation */}
      <section id="form" className="py-24 md:py-32 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-14">
            <h2 className="max-w-3xl font-display text-4xl font-semibold leading-[1.02] tracking-[-0.03em] md:text-6xl">
              Write to us.
            </h2>
          </div>

          <div className="grid grid-cols-12 gap-6 lg:gap-10">
            {/* Offices — the same list as About, Gurgaon first */}
            <div id="offices" className="col-span-12 scroll-mt-24 lg:col-span-5">
              <div className="border-t border-ink/10">
                {OFFICES.filter((o) => o.address).map((o) => (
                  <a
                    key={o.city}
                    href={`https://www.google.com/maps?q=${encodeURIComponent(o.mapQuery ?? o.address!)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block border-b border-ink/10 py-6"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="font-display text-3xl font-semibold tracking-tight text-accent md:text-4xl">
                        {o.city}
                      </div>
                      <span className="inline-flex items-center gap-1 text-xs text-ink-soft transition-colors group-hover:text-accent">
                        Map <ExternalLink className="h-4 w-4" aria-hidden />
                        <span className="sr-only">(opens Google Maps in a new tab)</span>
                      </span>
                    </div>
                    <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-ink-soft">{o.role}</p>
                    <p className="mt-2 text-sm text-ink-soft">{o.address}</p>
                  </a>
                ))}
              </div>
              <ul className="mt-2 grid grid-cols-2 gap-x-6 border-b border-ink/10 pb-4 text-sm">
                {OFFICES.filter((o) => !o.address).map((o) => (
                  <li key={o.city} className="py-2">
                    <span className="font-medium text-ink">{o.city}</span>
                    <span className="text-ink-soft">, {o.country}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 space-y-1 text-sm">
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="text-lg font-medium hover:text-accent transition-colors"
                >
                  {CONTACT.email}
                </a>
                <p className="text-ink-soft">{OFFICE_HOURS}</p>
              </div>
            </div>

            {/* Form */}
            <div className="col-span-12 lg:col-span-7">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="rounded-3xl bg-ink text-white p-12 relative overflow-hidden"
                  >
                    <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-brand/40 blur-3xl" />
                    <CheckCircle2 className="h-10 w-10 text-accent mb-6" />
                    <div className="text-4xl font-display font-semibold tracking-tight">
                      Got it. Talk soon.
                    </div>
                    <p className="mt-4 text-white/75 max-w-md">
                      Your {activeInquiry.label.toLowerCase()} note is with the right desk. Expect a reply within one business day.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-8 inline-flex items-center gap-2 bg-white text-ink px-5 py-2.5 rounded-full text-sm font-medium hover:bg-brand hover:text-white transition-colors"
                    >
                      Send another <ArrowUpRight className="h-4 w-4" />
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onSubmit={handleSubmit}
                    noValidate
                    className="space-y-6"
                  >
                    <Honeypot />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FloatField label="Full name" name="name" type="text" autoComplete="name" error={errors.name} />
                      <FloatField label="Company (optional)" name="company" type="text" autoComplete="organization" required={false} error={errors.company} />
                      <FloatField label="Email" name="email" type="email" autoComplete="email" error={errors.email} />
                      <FloatField label="Phone" name="phone" type="tel" autoComplete="tel" error={errors.phone} />
                    </div>
                    <FloatSelect
                      label="Subject"
                      name="type"
                      value={type}
                      onChange={setType}
                      options={inquiries.map((i) => ({ value: i.id, label: i.label }))}
                    />
                    <FloatField
                      label="Tell us a little about it"
                      name="message"
                      type="textarea"
                      error={errors.message}
                    />
                    <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                      <div className="text-xs text-ink-soft">
                        Subject:{" "}
                        <span className="font-medium text-ink">{activeInquiry.label}</span>{" "}
                        · Company is optional
                      </div>
                      <button
                        type="submit"
                        disabled={sending}
                        className="group relative inline-flex items-center gap-3 bg-ink text-white pl-7 pr-2 py-2.5 rounded-full text-sm font-medium overflow-hidden disabled:opacity-70 disabled:cursor-wait"
                      >
                        <span className="relative z-10">{sending ? "Sending…" : "Send message"}</span>
                        <span className="relative z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-ink group-hover:bg-brand group-hover:text-white transition-colors">
                          <ArrowUpRight className="h-4 w-4" />
                        </span>
                        <span className="absolute inset-0 bg-brand translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                      </button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 04 — Compact social handoff, shown once a social URL is set */}
      {socials.length > 0 && (
      <section className="border-b border-white/10 bg-ink py-9 text-white md:py-10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-5 px-6 lg:px-10">
          <div className="flex min-w-0 items-baseline gap-3">
            <div className="shrink-0 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/55">
              Connect
            </div>
            <div className="text-lg font-medium tracking-tight text-white/80 md:text-xl">
              Or find us where you{" "}
              <span className="font-serif-display italic text-accent">already are</span>.
            </div>
          </div>
          <div className="flex gap-2">
            {[{ Icon: Mail, href: `mailto:${CONTACT.email}`, label: "Email" }, ...socials].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-brand hover:bg-brand hover:text-white"
              >
                <Icon className="h-3.5 w-3.5" />
              </a>
            ))}
          </div>
        </div>
      </section>
      )}
    </>
  );
}

function FloatSelect({
  label,
  name,
  value,
  onChange,
  options,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="relative">
      <label
        htmlFor={`contact-${name}`}
        className="absolute left-0 top-0 pointer-events-none text-[11px] uppercase tracking-[0.18em] text-ink-soft"
      >
        {label}
      </label>
      <select
        id={`contact-${name}`}
        name={name}
        value={value}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full appearance-none bg-transparent border-b ${
          focused ? "border-brand" : "border-ink/20"
        } pt-6 pb-2 pr-8 text-ink focus:outline-none transition-colors cursor-pointer`}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-0 bottom-3 h-4 w-4 text-ink-soft" />
    </div>
  );
}

function FloatField({
  label,
  name,
  type,
  error,
  autoComplete,
  required = true,
}: {
  label: string;
  name: string;
  type: string;
  error?: string;
  autoComplete?: string;
  required?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const [val, setVal] = useState("");
  const float = focused || val.length > 0;
  const isTextarea = type === "textarea";

  const sharedClass = `peer w-full bg-transparent border-b ${
    error ? "border-destructive" : focused ? "border-brand" : "border-ink/20"
  } pt-6 pb-2 text-ink focus:outline-none transition-colors`;

  return (
    <div className="relative">
      <label
        htmlFor={`contact-${name}`}
        className={`absolute left-0 pointer-events-none transition-all duration-200 ${
          float
            ? "top-0 text-[11px] uppercase tracking-[0.18em] text-ink-soft"
            : "top-6 text-base text-ink-soft"
        }`}
      >
        {label}
      </label>
      {isTextarea ? (
        <textarea
          id={`contact-${name}`}
          name={name}
          rows={4}
          required={required}
          aria-invalid={!!error}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => setVal(e.target.value)}
          className={sharedClass + " resize-none"}
        />
      ) : (
        <input
          id={`contact-${name}`}
          name={name}
          type={type}
          autoComplete={autoComplete}
          required={required}
          aria-invalid={!!error}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => setVal(e.target.value)}
          className={sharedClass}
        />
      )}
      {error && <p className="mt-1.5 text-xs text-destructive">{error}</p>}
    </div>
  );
}
