import { ImageResponse } from "next/og";
import fs from "node:fs/promises";
import path from "node:path";
import data from "@/data.json";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const FG = "#f5f5f4";
const DIM = "#a1a1aa";

export default async function Image() {
  const photo = await fs.readFile(path.join(process.cwd(), "public", "Me.png"));
  const photoSrc = `data:image/png;base64,${photo.toString("base64")}`;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        backgroundColor: "#0f0e0e",
        padding: "80px",
        fontFamily: "Arial, Helvetica, sans-serif",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={photoSrc}
        alt=""
        width={380}
        height={380}
        style={{
          borderRadius: 24,
          objectFit: "cover",
          border: "2px solid rgba(255,255,255,0.15)",
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          minWidth: 0,
          marginLeft: 64,
          color: FG,
        }}
      >
        <div style={{ fontSize: 68, fontWeight: 700 }}>
          {data.personal.name_en}
        </div>
        <div style={{ fontSize: 30, color: DIM, marginTop: 16 }}>
          Software Engineer &amp; Web Developer
        </div>
        <div style={{ fontSize: 26, color: "#63636b", marginTop: 24 }}>
          {`Palestine · ${["React", "Next.js", "AI Integration"].join(" · ")}`}
        </div>
        <div style={{ fontSize: 24, color: FG, marginTop: 32 }}>
          osssghoul.com
        </div>
      </div>
    </div>,
    size,
  );
}
