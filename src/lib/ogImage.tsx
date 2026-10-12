import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

/** 1200×630, the size WhatsApp, LinkedIn and X all crop cleanly. */
export const OG_SIZE = { width: 1200, height: 630 };

const fontFile = (weight: 500 | 700) =>
  readFile(join(process.cwd(), `node_modules/@fontsource/space-grotesk/files/space-grotesk-latin-${weight}-normal.woff`));

/**
 * Branded share card: warm near-black ground, brand-red glow, logo, an eyebrow
 * and a headline. Rendered at build time for every route that exports it.
 */
export async function renderOgImage({ eyebrow, title }: { eyebrow: string; title: string }) {
  const [medium, bold, logo] = await Promise.all([
    fontFile(500),
    fontFile(700),
    readFile(join(process.cwd(), "src/assets/smg-logo.png")),
  ]);
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          color: "#f7f6f3",
          fontFamily: "Space Grotesk",
          background:
            "radial-gradient(900px 600px at 0% 0%, rgba(225,27,34,0.45), transparent 70%), linear-gradient(135deg, #2b1c18 0%, #1a1210 50%, #130e0b 100%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} width={64} height={64} style={{ borderRadius: 999, background: "#fff" }} alt="" />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 30, fontWeight: 700, letterSpacing: -0.5 }}>SHRI MAA GROUP</div>
            <div style={{ fontSize: 18, fontWeight: 500, letterSpacing: 4, color: "rgba(247,246,243,0.6)" }}>EST. 1997</div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 24, fontWeight: 500, letterSpacing: 5, textTransform: "uppercase", color: "#ff7a45" }}>
            {eyebrow}
          </div>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.02, letterSpacing: -2.5, maxWidth: 980 }}>{title}</div>
        </div>
        <div style={{ display: "flex", height: 6, width: 160, borderRadius: 999, background: "linear-gradient(90deg, #e11b22, #ff7a45)" }} />
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: "Space Grotesk", data: medium, weight: 500, style: "normal" },
        { name: "Space Grotesk", data: bold, weight: 700, style: "normal" },
      ],
    },
  );
}
