import type { MetadataRoute } from "next";

const SITE_URL = "https://www.osssghoul.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    host: SITE_URL,
  };
}
