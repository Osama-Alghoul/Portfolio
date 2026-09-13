import { ImageResponse } from "next/og";
import fs from "node:fs/promises";
import path from "node:path";
import data from "@/data.json";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const GOLD = "#f3ac39";

export default async function Image() {
  const photo = await fs.readFile(
    path.join(process.cwd(), "public", "Me.png")
  );
  const photoSrc = `data:image/png;base64,${photo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          backgroundColor: "#000000",
          padding: "80px",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        <img
          src={photoSrc}
          alt=""
          width={380}
          height={380}
          style={{
            borderRadius: 24,
            objectFit: "cover",
            border: `6px solid ${GOLD}`,
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: 64,
            color: "#ffffff",
          }}
        >
          <div style={{ fontSize: 68, fontWeight: 700 }}>
            {data.personal.name_en}
          </div>
          <div style={{ fontSize: 34, color: GOLD, marginTop: 16 }}>
            Software Engineer &amp; Web Developer
          </div>
          <div style={{ fontSize: 26, color: "#a3a3a3", marginTop: 24 }}>
            {`Palestine · ${data.skills.frontend.slice(0, 4).join(" · ")}`}
          </div>
          <div style={{ fontSize: 24, color: GOLD, marginTop: 48 }}>
            osssghoul.com
          </div>
        </div>
      </div>
    ),
    size
  );
}
