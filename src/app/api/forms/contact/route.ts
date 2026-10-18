import { appendRow } from "@/lib/google";
import { HONEYPOT_FIELD, contactSchema, fieldErrors, type FormResponse } from "@/lib/forms";
import { formFailure } from "../respond";

// Sheet tab "Contact": Submitted at | Name | Company | Email | Phone | Topic | Message
export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body) return Response.json({ ok: false, error: "Invalid request" } satisfies FormResponse, { status: 400 });
  if (body[HONEYPOT_FIELD]) return Response.json({ ok: true } satisfies FormResponse);

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { ok: false, error: "Please fix the highlighted fields", fieldErrors: fieldErrors(parsed.error) } satisfies FormResponse,
      { status: 422 },
    );
  }

  const { name, company, email, phone, topic, message } = parsed.data;
  try {
    await appendRow("Contact", [new Date().toISOString(), name, company, email, phone, topic, message]);
  } catch (error) {
    return formFailure("contact", error);
  }
  return Response.json({ ok: true } satisfies FormResponse);
}
