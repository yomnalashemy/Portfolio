import { ImageResponse } from "next/og";

import { site } from "@/data/site";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f7f0e9",
          color: "#2a1528",
          padding: "72px 80px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 26, color: "#a61f4f", letterSpacing: 3 }}>
          <div style={{ width: 18, height: 18, borderRadius: 9, background: "#d9f49b", border: "3px solid #2a1528" }} />
          SENIOR FINCRIME ANALYST · FULL-STACK ENGINEER
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 112, lineHeight: 1 }}>{site.name}</div>
          <div style={{ fontSize: 44, marginTop: 24, fontStyle: "italic", color: "#6b5a66" }}>
            Finding the signal in complex systems.
          </div>
        </div>
        <div style={{ display: "flex", height: 10, width: "100%", background: "#2a1528" }}>
          <div style={{ width: "38%", background: "#f05a85" }} />
        </div>
      </div>
    ),
    size,
  );
}
