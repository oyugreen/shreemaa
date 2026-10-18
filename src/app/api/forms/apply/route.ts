import { appendRow, uploadToDrive } from "@/lib/google";
import {
  HONEYPOT_FIELD,
  applicationSchema,
  fieldErrors,
  resumeError,
  type FormResponse,
} from "@/lib/forms";
import { formFailure } from "../respond";

// Sheet tab "Applications":
// Submitted at | Role | Name | Email | Phone | LinkedIn | Message | Resume
export async function POST(request: Request) {
  const form = await request.formData().catch(() => null);
  if (!form) return Response.json({ ok: false, error: "Invalid request" } satisfies FormResponse, { status: 400 });
  if (form.get(HONEYPOT_FIELD)) return Response.json({ ok: true } satisfies FormResponse);

  const text = (key: string) => {
    const value = form.get(key);
    return typeof value === "string" ? value : "";
  };
  const parsed = applicationSchema.safeParse({
    name: text("name"),
    email: text("email"),
    phone: text("phone"),
    linkedin: text("linkedin"),
    message: text("message"),
    role: text("role"),
  });
  const resume = form.get("resume");
  const errors = parsed.success ? {} : fieldErrors(parsed.error);
  if (!(resume instanceof File) || resume.size === 0) errors.resume = "Attach your resume";
  else if (resumeError(resume)) errors.resume = resumeError(resume);

  if (!parsed.success || Object.keys(errors).length > 0) {
    return Response.json(
      { ok: false, error: "Please fix the highlighted fields", fieldErrors: errors } satisfies FormResponse,
      { status: 422 },
    );
  }

  const { name, email, phone, linkedin, message, role } = parsed.data;
  const file = resume as File;
  const submittedAt = new Date().toISOString();
  try {
    const safeName = `${submittedAt.slice(0, 10)} ${name} - ${file.name}`.replace(/[\\/:*?"<>|]+/g, "_");
    // A failed upload still records the application, so the candidate isn't lost.
    let resumeLink: string;
    try {
      resumeLink = (await uploadToDrive(file, safeName)) ?? `Not stored: ${file.name}`;
    } catch (error) {
      console.error("[forms/apply] resume upload failed:", error);
      resumeLink = `Upload failed: ${file.name}`;
    }
    await appendRow("Applications", [submittedAt, role, name, email, phone, linkedin, message, resumeLink]);
  } catch (error) {
    return formFailure("apply", error);
  }
  return Response.json({ ok: true } satisfies FormResponse);
}
