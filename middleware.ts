// Blog language negotiation.
// /blog and /blog/<slug> have no language in the URL: redirect them to /blog/<lang>/...
// Order: explicit choice (cookie from the language switcher) > browser Accept-Language > Arabic.
// Language-prefixed URLs (/blog/ar/..., /blog/en/...) are never redirected, so crawlers and
// shared links always get the exact version they asked for (that's what hreflang points to).
import { NextResponse, type NextRequest } from "next/server";
import { DEFAULT_LOCALE, LOCALE_COOKIE, LOCALES, isLocale, type Locale } from "@/lib/blog-locales";

function negotiate(req: NextRequest): Locale {
  const cookie = req.cookies.get(LOCALE_COOKIE)?.value;
  if (isLocale(cookie)) return cookie;

  const header = req.headers.get("accept-language");
  if (!header) return DEFAULT_LOCALE;

  const prefs = header
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const q = params.find((p) => p.trim().startsWith("q="));
      return { lang: tag.trim().toLowerCase().split("-")[0], q: q ? Number(q.trim().slice(2)) || 0 : 1 };
    })
    .filter((p) => p.lang && p.lang !== "*" && p.q > 0)
    .sort((a, b) => b.q - a.q);

  if (prefs.length === 0) return DEFAULT_LOCALE;
  const supported = prefs.find((p) => (LOCALES as readonly string[]).includes(p.lang));
  // A browser in another language (French, Turkish…) gets the closest translation we have: English.
  return supported ? (supported.lang as Locale) : "en";
}

export function middleware(req: NextRequest) {
  const segments = req.nextUrl.pathname.split("/").filter(Boolean); // ["blog", ...rest]
  if (isLocale(segments[1])) return NextResponse.next();

  const url = req.nextUrl.clone();
  url.pathname = ["", "blog", negotiate(req), ...segments.slice(1)].join("/");
  const res = NextResponse.redirect(url, 307);
  res.headers.set("Vary", "Accept-Language, Cookie");
  res.headers.set("Cache-Control", "private, no-store");
  return res;
}

export const config = { matcher: ["/blog", "/blog/:path*"] };
