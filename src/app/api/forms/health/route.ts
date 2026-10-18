import { checkSetup } from "@/lib/google";

// Read-only setup check: GET /api/forms/health. Writes nothing and returns no
// secrets; 200 when every configured piece works, 503 otherwise.
export async function GET() {
  const result = await checkSetup(["Contact", "Applications", "Newsletter"]);
  return Response.json(result, {
    status: result.ok ? 200 : 503,
    headers: { "Cache-Control": "no-store" },
  });
}
