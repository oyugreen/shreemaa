import { appendRow } from "@/lib/google";
import { HONEYPOT_FIELD, fieldErrors, newsletterSchema, type FormResponse } from "@/lib/forms";
import { formFailure } from "../respond";

// Sheet tab "Newsletter": Submitted at | Email | Page
export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body) return Response.json({ ok: false, error: "Invalid request" } satisfies FormResponse, { status: 400 });
  if (body[HONEYPOT_FIELD]) return Response.json({ ok: true } satisfies FormResponse);

  const parsed = newsletterSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { ok: false, error: "Enter a valid email", fieldErrors: fieldErrors(parsed.error) } satisfies FormResponse,
      { status: 422 },
    );
  }

  const page = typeof body.page === "string" ? body.page.slice(0, 200) : "";
  try {
    await appendRow("Newsletter", [new Date().toISOString(), parsed.data.email, page]);
  } catch (error) {
    return formFailure("newsletter", error);
  }
  return Response.json({ ok: true } satisfies FormResponse);
}
