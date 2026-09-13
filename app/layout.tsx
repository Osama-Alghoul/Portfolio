import React from "react";
import "@/app/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/header";
import Footer from "@/components/footer";
import PlayerHUD from "@/components/player-hud";
import MemoWidget from "@/components/memo-widget";
import WebmcpColorTool from "@/components/webmcp-color-tool";
import JsonLd from "@/components/json-ld";
import data from "@/data.json";

const inter = Inter({ subsets: ["latin"] });

const SITE_URL = "https://www.osssghoul.com";
const TITLE = "Osama Alghoul - Software Engineer & Web Developer";
const DESCRIPTION =
  "Portfolio website of Osama Alghoul, a software engineer, web developer, and content creator.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    data.personal.name_en,
    ...data.skills.frontend,
    ...data.skills.backend,
    ...data.skills.AI,
    "portfolio",
    "software engineer",
    "web developer",
  ],
  authors: [{ name: data.personal.name_en, url: SITE_URL }],
  creator: data.personal.name_en,
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
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
    <html lang="en" className="light" style={{ colorScheme: "light" }}>
      <body
        className={`${inter.className} bg-black text-white min-h-screen overflow-x-hidden`}
      >
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
