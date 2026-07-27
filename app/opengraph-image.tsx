import { ImageResponse } from "next/og";
import { loadGoogleFont } from "@/lib/og-fonts";
import { SITE_TAGLINE } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const [regular, bold, italic] = await Promise.all([
    loadGoogleFont("Fraunces:ital,wght@0,400", "Swing"),
    loadGoogleFont("Fraunces:ital,wght@0,700", "Verdict"),
    loadGoogleFont("Fraunces:ital,wght@1,400", SITE_TAGLINE),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#FAF7F2",
        }}
      >
        <div style={{ display: "flex", fontFamily: "Fraunces", fontSize: 88 }}>
          <span style={{ fontWeight: 400, color: "#1F1E1B" }}>Swing</span>
          <span style={{ fontWeight: 700, color: "#1E4D36" }}>Verdict</span>
        </div>
        <div
          style={{
            display: "flex",
            width: 140,
            height: 1,
            background: "#1F1E1B",
            opacity: 0.3,
            margin: "32px 0",
          }}
        />
        <div
          style={{
            display: "flex",
            fontFamily: "Fraunces",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: 30,
            color: "#1F1E1B",
            opacity: 0.75,
          }}
        >
          {SITE_TAGLINE}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Fraunces", data: regular, weight: 400, style: "normal" },
        { name: "Fraunces", data: bold, weight: 700, style: "normal" },
        { name: "Fraunces", data: italic, weight: 400, style: "italic" },
      ],
    }
  );
}
