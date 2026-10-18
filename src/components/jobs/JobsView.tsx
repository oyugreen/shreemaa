"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { MapPin, Briefcase, ArrowRight, X, ArrowLeft, Paperclip } from "lucide-react";
import UnicornScene from "unicornstudio-react/next";
import { JOBS as jobs, type Job } from "@/config/jobs";
import { CONTACT } from "@/config/site";
import { trackEvent } from "@/lib/analytics";
import { RESUME_TYPES, resumeError as checkResume, type FormResponse } from "@/lib/forms";
import { Honeypot } from "@/components/site/Honeypot";

const departments = ["All", ...Array.from(new Set(jobs.map((j) => j.dept)))];

const heroPhrases = [
  "problem solvers",
  "category builders",
  "commercial thinkers",
  "hands-on operators",
  "curious minds",
  "people who deliver",
];

export function JobsView() {
  const [filter, setFilter] = useState("All");
  // `null` job = general application.
  const [open, setOpen] = useState<{ job: Job | null } | null>(null);
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;
    const timer = window.setInterval(
      () => setPhraseIndex((index) => (index + 1) % heroPhrases.length),
      1900,
    );
    return () => window.clearInterval(timer);
  }, []);

  const filtered = filter === "All" ? jobs : jobs.filter((j) => j.dept === filter);

  return (
    <>
      <section className="relative mx-3 mt-20 min-h-[calc(100svh-96px)] overflow-hidden rounded-[26px] bg-ink text-white md:mx-5 md:rounded-[34px]">
        <div className="absolute inset-0 overflow-hidden bg-ink">
          <div aria-hidden className="pointer-events-none absolute -right-[120px] -top-[180px] h-[560px] w-[560px] rounded-full bg-[rgba(225,27,34,0.22)] blur-[150px]" />
          <div aria-hidden className="pointer-events-none absolute -bottom-[200px] -left-[100px] h-[520px] w-[520px] rounded-full bg-[rgba(255,122,69,0.14)] blur-[160px]" />
          <div className="absolute inset-0">
            <UnicornScene
              projectId="tnAhw4e67txvvqrBP7oz"
              width="100%"
              height="100%"
              scale={1}
              dpi={1.5}
              lazyLoad={false}
              ariaLabel="Animated dark gradient background"
              placeholderClassName="h-full w-full bg-transparent"
            />
          </div>
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: "linear-gradient(135deg, #b30000 0%, #fd0000 100%)",
            mixBlendMode: "multiply",
            opacity: 1,
          }}
        />

        <div className="relative z-10 flex min-h-[calc(100svh-96px)] flex-col justify-center px-6 py-24 md:px-12 lg:px-[8vw]">
          <h1 className="sr-only">Open roles for problem solvers at SMG</h1>

          <div className="flex flex-col text-[clamp(1.75rem,6vw,6rem)] font-medium leading-[0.96] tracking-[-0.055em] md:flex-row md:items-center md:gap-[0.22em]">
            <span className="relative z-20 shrink-0 text-white">For the</span>
            <div className="relative mt-3 h-[4.8em] min-w-0 flex-1 md:mt-0 md:h-[3.3em]">
              {heroPhrases.map((phrase, index) => {
                const length = heroPhrases.length;
                let offset = index - phraseIndex;
                if (offset > length / 2) offset -= length;
                if (offset < -length / 2) offset += length;
                const distance = Math.abs(offset);
                return (
                  <span
                    key={phrase}
                    aria-hidden={offset !== 0}
                    className="absolute left-0 top-1/2 whitespace-nowrap transition-[transform,opacity,filter,color] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                    style={{
                      transform: `translateY(calc(-50% + ${offset * 1.02}em))`,
                      opacity: distance === 0 ? 1 : distance <= 3 ? Math.max(0.08, 0.3 - distance * 0.07) : 0,
                      filter: distance === 0 ? "blur(0px)" : `blur(${Math.min(distance * 0.7, 2)}px)`,
                      color: offset === 0 ? "white" : "rgba(255,255,255,0.38)",
                    }}
                  >
                    {phrase}
                  </span>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      <section id="open-roles" className="scroll-mt-24 py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Link href="/careers" className="inline-flex items-center gap-1.5 text-sm text-ink-soft hover:text-accent mb-8">
            <ArrowLeft className="h-3.5 w-3.5" /> Back to life at SMG
          </Link>

          {jobs.length === 0 ? (
            <div className="rounded-3xl border border-line bg-surface-2 p-8 md:p-12">
              <div className="text-[11px] uppercase tracking-[0.24em] text-accent font-semibold">Open roles</div>
              <h2 className="mt-4 max-w-2xl text-3xl md:text-5xl font-bold tracking-tight leading-[1.05]">
                No openings listed right now.
              </h2>
              <p className="mt-4 max-w-xl text-ink-soft leading-relaxed">
                We hire across operations, sales, trade, technology, marketing and finance. Send us your CV and
                we&apos;ll reach out when a role fits.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => setOpen({ job: null })}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full bg-ink px-6 text-sm font-semibold text-white hover:bg-ink/85"
                >
                  Send a general application <ArrowRight className="h-4 w-4" />
                </button>
                <a href={`mailto:${CONTACT.careersEmail}`} className="inline-flex min-h-11 items-center text-sm font-medium text-accent hover:underline">
                  or email {CONTACT.careersEmail}
                </a>
              </div>
            </div>
          ) : (
          <>
          <div className="mb-12">
            <div className="grid lg:grid-cols-12 gap-8 items-end pb-6 border-b border-line">
              <div className="lg:col-span-5">
                <div className="text-[11px] uppercase tracking-[0.28em] text-accent font-semibold">Departments</div>
                <h2 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight leading-[1.05]">
                  <span className="font-display italic">{String(filtered.length).padStart(2, "0")}</span> positions <br className="hidden md:block" />open right now.
                </h2>
              </div>
              <div className="lg:col-span-7 lg:text-right">
                <p className="text-sm text-ink-soft max-w-md lg:ml-auto leading-relaxed">
                  Filter by team to find where you fit. Every role reports into a flat structure with real ownership from day one.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-x-1 gap-y-2 -mx-2 pt-4">
              {departments.map((d) => {
                const active = filter === d;
                const count = d === "All" ? jobs.length : jobs.filter((j) => j.dept === d).length;
                return (
                  <button
                    key={d}
                    onClick={() => setFilter(d)}
                    className={`group relative px-3 py-2 text-sm font-medium tracking-tight transition-colors ${
                      active ? "text-ink" : "text-ink-soft hover:text-ink"
                    }`}
                  >
                    <span className="inline-flex items-baseline gap-1.5">
                      {d}
                      <span className={`text-[11px] font-mono tabular-nums transition-colors ${active ? "text-accent" : "text-ink-soft/70"}`}>
                        {String(count).padStart(2, "0")}
                      </span>
                    </span>
                    <span
                      aria-hidden
                      className={`absolute left-3 right-3 -bottom-px h-px transition-all duration-300 ${
                        active ? "bg-ink opacity-100" : "bg-ink opacity-0 group-hover:opacity-30"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="divide-y divide-line border-b border-line">
            {filtered.map((j) => (
              <button
                key={j.id}
                onClick={() => setOpen({ job: j })}
                className="w-full text-left py-6 grid grid-cols-12 gap-4 items-center hover:bg-surface-2 transition-colors px-4 group"
              >
                <div className="col-span-12 md:col-span-6">
                  <div className="text-lg font-semibold tracking-tight group-hover:text-accent transition-colors">{j.title}</div>
                  <div className="mt-1 text-sm text-ink-soft">{j.summary}</div>
                </div>
                <div className="col-span-6 md:col-span-2 text-sm text-ink-soft flex items-center gap-1.5"><Briefcase className="h-3.5 w-3.5" />{j.dept}</div>
                <div className="col-span-6 md:col-span-2 text-sm text-ink-soft flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" />{j.location}</div>
                <div className="col-span-12 md:col-span-2 md:text-right">
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-accent">View role <ArrowRight className="h-3.5 w-3.5" /></span>
                </div>
              </button>
            ))}
          </div>

          <p className="mt-8 text-sm text-ink-soft text-center">
            Don&apos;t see your role?{" "}
            <button type="button" onClick={() => setOpen({ job: null })} className="text-accent font-medium hover:underline">
              Send a general application
            </button>{" "}
            or email <a href={`mailto:${CONTACT.careersEmail}`} className="text-accent font-medium hover:underline">{CONTACT.careersEmail}</a>
          </p>
          </>
          )}
        </div>
      </section>

      {open && <ApplyDialog job={open.job} onClose={() => setOpen(null)} />}
    </>
  );
}

const fields = [
  { label: "Full name", name: "name", type: "text", autoComplete: "name", required: true },
  { label: "Email", name: "email", type: "email", autoComplete: "email", required: true },
  { label: "Phone", name: "phone", type: "tel", autoComplete: "tel", required: true },
  { label: "LinkedIn URL (optional)", name: "linkedin", type: "url", autoComplete: "url", required: false },
] as const;

function ApplyDialog({ job, onClose }: { job: Job | null; onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false);
  const [resume, setResume] = useState<File | null>(null);
  const [resumeError, setResumeError] = useState("");
  const [sending, setSending] = useState(false);
  const [formError, setFormError] = useState("");
  const uid = useId();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  function onResumeChange(file: File | undefined) {
    if (!file) {
      setResume(null);
      setResumeError("");
      return;
    }
    const error = checkResume(file);
    setResume(error ? null : file);
    setResumeError(error);
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (resumeError || sending) return;
    const role = job?.title ?? "General application";
    const fd = new FormData(e.currentTarget);
    fd.set("role", role);
    setSending(true);
    setFormError("");
    try {
      const res = await fetch("/api/forms/apply", { method: "POST", body: fd });
      const result = (await res.json().catch(() => null)) as FormResponse | null;
      if (!result?.ok) {
        const fieldMessages = result?.fieldErrors ? Object.values(result.fieldErrors) : [];
        if (result?.fieldErrors?.resume) setResumeError(result.fieldErrors.resume);
        setFormError(fieldMessages[0] ?? result?.error ?? "We couldn't send that right now. Please try again.");
        return;
      }
      trackEvent("job_application", { role });
      setSubmitted(true);
    } catch {
      setFormError("We couldn't send that right now. Check your connection and try again.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[100] bg-ink/60 backdrop-blur-sm flex items-end md:items-center justify-center p-0 md:p-6 animate-in fade-in" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${uid}-title`}
        className="bg-white rounded-t-3xl md:rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white p-6 border-b border-line flex items-start justify-between">
          <div>
            <div className="text-xs uppercase tracking-wider text-accent font-semibold">
              {job ? `${job.dept} · ${job.location}` : "Careers"}
            </div>
            <h2 id={`${uid}-title`} className="mt-1 text-2xl font-bold tracking-tight">{job ? job.title : "General application"}</h2>
          </div>
          <button type="button" onClick={onClose} aria-label="Close" className="grid h-11 w-11 place-items-center hover:bg-surface-2 rounded-full"><X className="h-5 w-5" /></button>
        </div>
        <div className="p-6 space-y-6">
          {job ? (
            <>
              <p className="text-ink-soft leading-relaxed">{job.summary}</p>
              <dl className="grid grid-cols-2 gap-4 text-sm md:grid-cols-4">
                {[["Location", job.location], ["Level", job.level], ["Experience", job.experience], ["Type", job.type]].map(([k, v]) => (
                  <div key={k}>
                    <dt className="text-[11px] uppercase tracking-[0.16em] text-ink-soft">{k}</dt>
                    <dd className="mt-1 font-medium">{v}</dd>
                  </div>
                ))}
              </dl>
              {job.responsibilities.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold">What you&apos;ll do</h3>
                  <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm text-ink-soft leading-relaxed">
                    {job.responsibilities.map((r) => <li key={r}>{r}</li>)}
                  </ul>
                </div>
              )}
            </>
          ) : (
            <p className="text-ink-soft leading-relaxed">
              Tell us about yourself and attach your CV. We keep general applications on file and reach out when a
              role fits.
            </p>
          )}
          {submitted ? (
            <div className="p-8 rounded-2xl bg-brand-gradient text-white text-center">
              <div className="text-2xl font-bold">Application received</div>
              <p className="mt-2 text-white/90 text-sm">Our team will be in touch within one week.</p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="relative space-y-4">
              <Honeypot />
              {fields.map((f) => (
                <div key={f.name}>
                  <label htmlFor={`${uid}-${f.name}`} className="text-xs font-medium uppercase tracking-wider text-ink-soft">{f.label}</label>
                  <input
                    id={`${uid}-${f.name}`}
                    name={f.name}
                    type={f.type}
                    autoComplete={f.autoComplete}
                    required={f.required}
                    className="mt-1.5 w-full px-4 py-3 rounded-xl border border-line focus:border-brand focus:outline-none transition-colors"
                  />
                </div>
              ))}
              <div>
                <span id={`${uid}-resume-label`} className="text-xs font-medium uppercase tracking-wider text-ink-soft">Resume</span>
                <label
                  htmlFor={`${uid}-resume`}
                  className={`mt-1.5 flex min-h-[52px] cursor-pointer items-center gap-3 rounded-xl border border-dashed px-4 py-3 transition-colors hover:border-brand focus-within:border-brand ${
                    resumeError ? "border-destructive" : "border-line"
                  }`}
                >
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-surface-2 text-accent">
                    <Paperclip className="h-4 w-4" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium text-ink">
                      {resume ? resume.name : "Choose a file"}
                    </span>
                    <span className="block text-xs text-ink-soft">PDF or DOC, max 5 MB</span>
                  </span>
                  <input
                    id={`${uid}-resume`}
                    name="resume"
                    type="file"
                    required
                    accept={RESUME_TYPES.join(",")}
                    aria-labelledby={`${uid}-resume-label`}
                    aria-invalid={!!resumeError}
                    aria-describedby={resumeError ? `${uid}-resume-error` : undefined}
                    onChange={(e) => onResumeChange(e.target.files?.[0])}
                    className="sr-only"
                  />
                </label>
                {resumeError && <p id={`${uid}-resume-error`} className="mt-1.5 text-xs text-destructive">{resumeError}</p>}
              </div>
              <div>
                <label htmlFor={`${uid}-message`} className="text-xs font-medium uppercase tracking-wider text-ink-soft">Message</label>
                <textarea id={`${uid}-message`} name="message" rows={4} className="mt-1.5 w-full px-4 py-3 rounded-xl border border-line focus:border-brand focus:outline-none" />
              </div>
              <p className="text-xs text-ink-soft">
                We use these details only to assess your application. See our{" "}
                <Link href="/privacy" className="text-accent hover:underline">Privacy Policy</Link>.
              </p>
              {formError && <p role="alert" className="text-sm text-destructive">{formError}</p>}
              <button type="submit" disabled={sending} className="w-full inline-flex items-center justify-center gap-2 bg-ink text-white py-3.5 rounded-full font-semibold hover:bg-ink/85 disabled:opacity-70 disabled:cursor-wait">
                {sending ? "Sending…" : <>Submit application <ArrowRight className="h-4 w-4" /></>}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
