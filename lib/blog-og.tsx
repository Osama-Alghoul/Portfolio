// 1200×630 Open Graph image for blog pages, rendered with next/og (satori).
import { ImageResponse } from "next/og";
import fs from "node:fs/promises";
import path from "node:path";
import { ogWord } from "@/lib/arabic-shape";
import { localeMeta, type Locale } from "@/lib/blog-locales";

export const OG_SIZE = { width: 1200, height: 630 };
const GOLD = "#f3ac39";

let fontCache: Promise<Buffer> | null = null;
const loadFont = () =>
  (fontCache ??= fs.readFile(path.join(process.cwd(), "assets", "fonts", "IBMPlexSansArabic-Bold.ttf")));

/** Splits text into words laid out RTL-safe (see lib/arabic-shape.ts for why). */
function Words({ text, rtl, style }: { text: string; rtl: boolean; style: React.CSSProperties }) {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        flexDirection: rtl ? "row-reverse" : "row",
        columnGap: rtl ? "0.3em" : "0.25em",
        ...style,
      }}
    >
      {text.split(/\s+/).map((w, i) => (
        <span key={i}>{rtl ? ogWord(w) : w}</span>
      ))}
    </div>
  );
}

export async function renderBlogOg({
  lang,
  kicker,
  title,
  footer,
  chips = [],
}: {
  lang: Locale;
  kicker: string;
  title: string;
  footer: string;
  chips?: string[];
}) {
  const rtl = localeMeta[lang].dir === "rtl";
  const font = await loadFont();
  const titleSize = title.length > 70 ? 54 : title.length > 45 ? 62 : 72;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: rtl ? "flex-end" : "flex-start",
          padding: "64px 72px",
          backgroundColor: "#000000",
          backgroundImage:
            "radial-gradient(circle at 15% 0%, rgba(30,64,175,0.55), transparent 55%), radial-gradient(circle at 100% 100%, rgba(88,28,135,0.45), transparent 50%)",
          color: "#ffffff",
          fontFamily: "Plex",
        }}
      >
        <Words text={kicker} rtl={rtl} style={{ fontSize: 30, color: GOLD }} />
        <Words
          text={title}
          rtl={rtl}
          style={{ fontSize: titleSize, lineHeight: 1.25, justifyContent: "flex-start", maxWidth: 1056 }}
        />
        <div
          style={{
            display: "flex",
            width: "100%",
            flexDirection: rtl ? "row-reverse" : "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", flexDirection: rtl ? "row-reverse" : "row", gap: 12 }}>
            {chips.slice(0, 4).map((c) => (
              <div
                key={c}
                style={{
                  display: "flex",
                  border: `2px solid ${GOLD}`,
                  color: GOLD,
                  borderRadius: 999,
                  padding: "6px 20px",
                  fontSize: 24,
                }}
              >
                {rtl ? ogWord(c) : c}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", fontSize: 26, color: "#a3a3a3" }}>{footer}</div>
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts: [{ name: "Plex", data: await font, weight: 700, style: "normal" }] },
  );
}
