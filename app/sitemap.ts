// Served at /sitemap.xml: every public, indexable, canonical URL (never redirects or noindex pages).
import type { MetadataRoute } from "next";
import { LOCALES, absoluteLanguageAlternates, blogPath, getAllPosts, postPath } from "@/lib/blog";
import { SITE_URL, absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const latest = posts[0]?.updatedAt;

  return [
    { url: SITE_URL },
    { url: absoluteUrl("/gaming") },
    // Blog index per language, each listing all language versions (hreflang).
    ...LOCALES.map((lang) => ({
      url: absoluteUrl(blogPath(lang)),
      ...(latest ? { lastModified: new Date(latest) } : {}),
      alternates: { languages: absoluteLanguageAlternates() },
    })),
    ...posts.flatMap((p) =>
      LOCALES.map((lang) => ({
        url: absoluteUrl(postPath(lang, p.slug)),
        lastModified: new Date(p.updatedAt),
        alternates: { languages: absoluteLanguageAlternates(p.slug) },
      })),
    ),
  ];
}
