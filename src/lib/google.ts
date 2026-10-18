import "server-only";
import { createSign } from "node:crypto";

/**
 * Minimal Google API client for the form route handlers: a service account
 * appends rows to one spreadsheet and, optionally, uploads resumes to Drive.
 *
 * Environment:
 *   GOOGLE_SERVICE_ACCOUNT_EMAIL  client_email from the service account key
 *   GOOGLE_PRIVATE_KEY            private_key from the key (literal "\n" is fine)
 *   GOOGLE_SHEET_ID               spreadsheet ID, shared with the service
 *                                 account as Editor
 *   GOOGLE_SHEET_BACKUP_ID        optional; spreadsheet that gets a copy of
 *                                 every row. Needs the same tabs and Editor
 *                                 access.
 *   GOOGLE_DRIVE_FOLDER_ID        optional; resume folder. Must be inside a
 *                                 Shared Drive the service account can edit,
 *                                 because service accounts have no storage of
 *                                 their own.
 */

const SCOPES = [
  "https://www.googleapis.com/auth/spreadsheets",
  "https://www.googleapis.com/auth/drive",
].join(" ");

export class GoogleConfigError extends Error {}

function config() {
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  const sheetId = process.env.GOOGLE_SHEET_ID;
  if (!clientEmail || !privateKey || !sheetId) {
    throw new GoogleConfigError(
      "Set GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY and GOOGLE_SHEET_ID",
    );
  }
  return {
    clientEmail,
    privateKey,
    sheetId,
    backupSheetId: process.env.GOOGLE_SHEET_BACKUP_ID,
    driveFolderId: process.env.GOOGLE_DRIVE_FOLDER_ID,
  };
}

const base64url = (input: string | Buffer) => Buffer.from(input).toString("base64url");

let cachedToken: { value: string; expiresAt: number } | null = null;

async function accessToken() {
  if (cachedToken && cachedToken.expiresAt - 60_000 > Date.now()) return cachedToken.value;

  const { clientEmail, privateKey } = config();
  const now = Math.floor(Date.now() / 1000);
  const unsigned = [
    base64url(JSON.stringify({ alg: "RS256", typ: "JWT" })),
    base64url(
      JSON.stringify({
        iss: clientEmail,
        scope: SCOPES,
        aud: "https://oauth2.googleapis.com/token",
        iat: now,
        exp: now + 3600,
      }),
    ),
  ].join(".");
  const signature = createSign("RSA-SHA256").update(unsigned).sign(privateKey);

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: `${unsigned}.${base64url(signature)}`,
    }),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Google token request failed: ${res.status} ${await res.text()}`);

  const data = (await res.json()) as { access_token: string; expires_in: number };
  cachedToken = { value: data.access_token, expiresAt: Date.now() + data.expires_in * 1000 };
  return data.access_token;
}

/**
 * Appends one row to the named tab of GOOGLE_SHEET_ID, then copies it to
 * GOOGLE_SHEET_BACKUP_ID. Only the main sheet can fail the submission; a failed
 * backup copy is logged. Values are stored as typed (RAW), so text such as
 * "=SUM(...)" from a visitor is never run as a formula.
 */
export async function appendRow(tab: string, row: (string | number)[]) {
  const { sheetId, backupSheetId } = config();
  await appendTo(sheetId, tab, row);
  if (!backupSheetId) return;
  try {
    await appendTo(backupSheetId, tab, row);
  } catch (error) {
    console.error("[google] backup sheet copy failed:", error);
  }
}

async function appendTo(spreadsheetId: string, tab: string, row: (string | number)[]) {
  const range = encodeURIComponent(`'${tab.replace(/'/g, "''")}'!A1`);
  const res = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${await accessToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ values: [row] }),
      cache: "no-store",
    },
  );
  if (!res.ok) throw new Error(`Sheets append to "${tab}" failed: ${res.status} ${await res.text()}`);
}

/**
 * Uploads a file to GOOGLE_DRIVE_FOLDER_ID and returns its link, or null when
 * no folder is configured.
 */
export async function uploadToDrive(file: File, fileName: string): Promise<string | null> {
  const { driveFolderId } = config();
  if (!driveFolderId) return null;

  const boundary = `smg-${crypto.randomUUID()}`;
  const metadata = JSON.stringify({ name: fileName, parents: [driveFolderId] });
  const body = Buffer.concat([
    Buffer.from(
      `--${boundary}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n${metadata}\r\n` +
        `--${boundary}\r\nContent-Type: ${file.type || "application/octet-stream"}\r\n\r\n`,
    ),
    Buffer.from(await file.arrayBuffer()),
    Buffer.from(`\r\n--${boundary}--`),
  ]);

  const res = await fetch(
    "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&supportsAllDrives=true&fields=id,webViewLink",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${await accessToken()}`,
        "Content-Type": `multipart/related; boundary=${boundary}`,
      },
      body,
      cache: "no-store",
    },
  );
  if (!res.ok) throw new Error(`Drive upload failed: ${res.status} ${await res.text()}`);

  const data = (await res.json()) as { id: string; webViewLink?: string };
  return data.webViewLink ?? `https://drive.google.com/file/d/${data.id}/view`;
}
