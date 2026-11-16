import React from "react";
import "@/app/globals.css";
import type { Metadata, Viewport } from "next";
import { fontVariables } from "@/lib/fonts";
import ThemeSync, { themeBootScript } from "@/components/theme-sync";
import Header from "@/components/header";
import Footer from "@/components/footer";
import PlayerHUD from "@/components/player-hud";
import MemoWidget from "@/components/memo-widget";
import WebmcpColorTool from "@/components/webmcp-color-tool";
import JsonLd from "@/components/json-ld";
import data from "@/data.json";
import { SITE_URL, indexableRobots } from "@/lib/site";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const TITLE = `${data.personal.name_en} (${data.personal.handle}) - Software Engineer & Web Developer`;
const DESCRIPTION =
  "Portfolio website of Osama Alghoul, a software engineer who builds, leads, and integrates AI services into scalable systems on a strong infrastructure.";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0f0e0e",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  authors: [{ name: data.personal.name_en, url: SITE_URL }],
  creator: data.personal.name_en,
  // No canonical here: it would be inherited by every page. Each page sets its own.
  robots: indexableRobots,
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    type: "profile",
    url: SITE_URL,
    siteName: `${data.personal.name_en} - Portfolio`,
    title: TITLE,
    description: DESCRIPTION,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en" className={`dark ${fontVariables}`} style={{ colorScheme: "dark" }}>
      <head>
        {/* Applies the saved gaming-class theme before paint. */}
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
      </head>
      <body
        className="bg-ink text-fg font-sans min-h-screen overflow-x-hidden"
      >
        <ThemeSync />
        <Analytics />
        <SpeedInsights />
        <JsonLd />
        <Header />
        {children}
        <PlayerHUD />
        <MemoWidget />
        <Footer />
        <WebmcpColorTool />
      </body>
    </html>
  );
}
