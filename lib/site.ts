// Single source of truth for site-wide SEO values.
import type { Metadata } from "next";
import data from "@/data.json";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.osssghoul.com").replace(/\/$/, "");

export const siteConfig = {
  url: SITE_URL,
  name: data.personal.name_en,
  nameAr: data.personal.name,
  handle: data.personal.handle,
  themeColor: "#000000",
} as const;

/** Absolute URL helper for places `metadataBase` doesn't reach (JSON-LD, sitemap, feeds). */
export const absoluteUrl = (path = "/") => new URL(path, SITE_URL + "/").toString();

/** Index only production deploys so preview URLs never end up in search results. */
export const isProduction = process.env.VERCEL_ENV
  ? process.env.VERCEL_ENV === "production"
  : process.env.NODE_ENV === "production";

export const indexableRobots: Metadata["robots"] = isProduction
  ? {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    }
  : { index: false, follow: false };

/** Person entity referenced (by @id) from every JSON-LD graph on the site. */
export const personJsonLd = {
  "@type": "Person",
  "@id": `${SITE_URL}/#person`,
  name: data.personal.name_en,
  alternateName: [data.personal.handle, data.personal.name],
  url: SITE_URL,
  image: `${SITE_URL}/Me.png`,
  sameAs: [
    data.contact.github,
    data.contact.linkedin,
    data.contact.Facebook,
    data.contact.Instagram,
    data.contact.Telegram,
  ],
};
