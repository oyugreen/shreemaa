import { checkSetup } from "@/lib/google";
import { checkCloudinary, isCloudinaryConfigured } from "@/lib/cloudinary";

// Read-only setup check: GET /api/forms/health. Writes nothing and returns no
// secrets; 200 when every piece in use works, 503 otherwise. When Cloudinary
// stores resumes, the Drive folder is unused and doesn't affect the result.
export async function GET() {
  const [google, cloudinary] = await Promise.all([
    checkSetup(["Contact", "Applications", "Newsletter"]),
    checkCloudinary(),
  ]);
  const usesCloudinary = isCloudinaryConfigured();
  const resumeStore = usesCloudinary ? cloudinary : google.driveFolder ?? { ok: false, detail: "Not checked" };
  const ok =
    google.auth.ok &&
    !!google.sheet?.ok &&
    !!google.backupSheet?.ok &&
    resumeStore.ok;
  const result = {
    ...google,
    ok,
    resumeStorage: usesCloudinary ? "cloudinary" : "drive",
    cloudinary,
  };
  return Response.json(result, {
    status: result.ok ? 200 : 503,
    headers: { "Cache-Control": "no-store" },
  });
}
