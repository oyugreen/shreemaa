import { z } from "zod";

/**
 * Form schemas shared by the client forms and the /api/forms/* route
 * handlers, so both sides validate the same way.
 */

// One topic list for the contact marquee and the subject field. `id` is stored
// with the message so each topic can be routed to its team's inbox.
export const CONTACT_TOPICS = [
  { id: "distribution", label: "Distribution" },
  { id: "marketplace", label: "Marketplace" },
  { id: "global-trade", label: "Global Trade / Exports" },
  { id: "sustainability", label: "Sustainability" },
  { id: "careers", label: "Careers" },
  { id: "other", label: "Other" },
] as const;

const topicIds = CONTACT_TOPICS.map((t) => t.id) as [string, ...string[]];

const name = z.string().trim().min(2, "Please enter your full name").max(100);
const email = z.string().trim().email("Enter a valid email").max(200);
const phone = z
  .string()
  .trim()
  .min(7, "Enter a valid phone number")
  .max(20)
  .regex(/^[0-9+\-\s()]+$/, "Only digits, spaces and + - ( ) allowed");

export const contactSchema = z.object({
  name,
  company: z.string().trim().max(120),
  email,
  phone,
  topic: z.enum(topicIds),
  message: z.string().trim().min(20, "Tell us a bit more, at least 20 characters").max(1000),
});

export const applicationSchema = z.object({
  name,
  email,
  phone,
  linkedin: z.union([z.literal(""), z.string().trim().url("Enter a full URL, starting with https://").max(300)]),
  message: z.string().trim().max(2000),
  // Role title, or "General application".
  role: z.string().trim().min(1).max(200),
});

export const newsletterSchema = z.object({ email });

export const RESUME_TYPES = [".pdf", ".doc", ".docx"];
export const RESUME_MAX_BYTES = 5 * 1024 * 1024;

/** Returns an error message, or "" when the file is acceptable. */
export function resumeError(file: { name: string; size: number }) {
  const ext = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();
  if (!RESUME_TYPES.includes(ext)) return "Upload a PDF or Word file (.pdf, .doc, .docx).";
  if (file.size > RESUME_MAX_BYTES) return "That file is over 5 MB. Please upload a smaller file.";
  if (file.size === 0) return "That file is empty. Please choose another.";
  return "";
}

/**
 * Hidden field bots tend to fill. Forms render it off-screen; the API drops any
 * submission where it has a value.
 */
export const HONEYPOT_FIELD = "website";

export type FormResponse =
  | { ok: true }
  | { ok: false; error: string; fieldErrors?: Record<string, string> };

/** First message per field, in the shape the forms display. */
export function fieldErrors(error: z.ZodError) {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "");
    if (key && !out[key]) out[key] = issue.message;
  }
  return out;
}
