import { GoogleConfigError } from "@/lib/google";
import type { FormResponse } from "@/lib/forms";

/** Logs the real cause server-side and returns a generic error to the visitor. */
export function formFailure(form: string, error: unknown) {
  console.error(
    error instanceof GoogleConfigError ? `[forms/${form}] not configured:` : `[forms/${form}] submission failed:`,
    error,
  );
  return Response.json(
    { ok: false, error: "We couldn't send that right now. Please try again or email us." } satisfies FormResponse,
    { status: 502 },
  );
}
