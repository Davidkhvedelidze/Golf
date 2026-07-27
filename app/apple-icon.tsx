import { ImageResponse } from "next/og";
import { loadGoogleFont } from "@/lib/og-fonts";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  const fraunces = await loadGoogleFont("Fraunces:wght@700", "SV");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#1E4D36",
        }}
      >
        <span
          style={{
            fontFamily: "Fraunces",
            fontWeight: 700,
            fontSize: 92,
            color: "#FAF7F2",
            lineHeight: 1,
          }}
        >
          SV
        </span>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Fraunces", data: fraunces, weight: 700, style: "normal" }],
    }
  );
}
