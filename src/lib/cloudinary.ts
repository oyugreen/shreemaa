import "server-only";
import { createHash, randomUUID } from "node:crypto";

/**
 * Minimal Cloudinary client for resume uploads, over the REST API.
 *
 * Environment:
 *   CLOUDINARY_URL  cloudinary://<api_key>:<api_secret>@<cloud_name>
 *
 * Resumes are stored as raw files under RESUME_FOLDER. Each public ID ends in
 * a random suffix, so a resume link can't be guessed from a name.
 */

const RESUME_FOLDER = "smg-careers/resumes";

type CloudinaryConfig = { cloudName: string; apiKey: string; apiSecret: string };

function config(): CloudinaryConfig | null {
  const raw = process.env.CLOUDINARY_URL?.trim();
  if (!raw) return null;
  try {
    const url = new URL(raw);
    if (url.protocol !== "cloudinary:" || !url.username || !url.password || !url.hostname) return null;
    return {
      cloudName: url.hostname,
      apiKey: decodeURIComponent(url.username),
      apiSecret: decodeURIComponent(url.password),
    };
  } catch {
    return null;
  }
}

export const isCloudinaryConfigured = () => config() !== null;

/** Cloudinary's request signature: sorted params, joined, with the secret appended, SHA-1. */
function sign(params: Record<string, string>, apiSecret: string) {
  const toSign = Object.keys(params)
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join("&");
  return createHash("sha1").update(toSign + apiSecret).digest("hex");
}

/**
 * Uploads a resume and returns its HTTPS link, or null when Cloudinary isn't
 * configured. `label` becomes the readable part of the file name.
 */
export async function uploadResume(file: File, label: string): Promise<string | null> {
  const cfg = config();
  if (!cfg) return null;

  const dot = file.name.lastIndexOf(".");
  const ext = dot >= 0 ? file.name.slice(dot).toLowerCase() : "";
  const slug = label
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/[\s_]+/g, "-")
    .toLowerCase()
    .slice(0, 60);
  // Raw files keep their extension as part of the public ID.
  const params = {
    folder: RESUME_FOLDER,
    public_id: `${slug || "resume"}-${randomUUID().slice(0, 8)}${ext}`,
    timestamp: String(Math.floor(Date.now() / 1000)),
  };

  const body = new FormData();
  body.set("file", file, file.name);
  for (const [key, value] of Object.entries(params)) body.set(key, value);
  body.set("api_key", cfg.apiKey);
  body.set("signature", sign(params, cfg.apiSecret));

  const res = await fetch(`https://api.cloudinary.com/v1_1/${cfg.cloudName}/raw/upload`, {
    method: "POST",
    body,
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Cloudinary upload failed: ${res.status} ${await res.text()}`);

  const data = (await res.json()) as { secure_url: string };
  return data.secure_url;
}

/** Read-only credential check for /api/forms/health. Never throws or returns secrets. */
export async function checkCloudinary(): Promise<{ ok: boolean; detail: string }> {
  const cfg = config();
  if (!cfg) return { ok: false, detail: "CLOUDINARY_URL is missing or not in cloudinary://key:secret@cloud form" };
  try {
    const res = await fetch(`https://api.cloudinary.com/v1_1/${cfg.cloudName}/ping`, {
      headers: { Authorization: `Basic ${Buffer.from(`${cfg.apiKey}:${cfg.apiSecret}`).toString("base64")}` },
      cache: "no-store",
    });
    return res.ok
      ? { ok: true, detail: "Credentials work, uploads allowed" }
      : { ok: false, detail: `${res.status}: ${res.statusText}` };
  } catch {
    return { ok: false, detail: "Could not reach Cloudinary" };
  }
}
