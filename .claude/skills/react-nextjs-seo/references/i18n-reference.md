# Multilingual SEO and language-by-visitor (i18n) reference

Use this when a site (or one section, e.g. a blog) serves the same content in several languages, when the
default language should depend on the visitor, or when any language is right-to-left (Arabic, Hebrew, Persian, Urdu).

## Contents
1. The core rule: one URL per language
2. Choosing the visitor's language (negotiation) without hurting SEO
3. hreflang and x-default
4. `<html lang dir>` per language (Next.js multiple root layouts)
5. Per-language metadata: title, description, Open Graph, X
6. Per-language JSON-LD
7. Sitemap, RSS, llms.txt
8. RTL layout and typography
9. Open Graph images with Arabic / RTL text (next/og, satori)
10. Content model for translated posts
11. Checklist

---

## 1. The core rule: one URL per language

Search engines index **URLs**, not sessions. Each language version needs its own crawlable, stable URL:
`/blog/ar/<slug>` and `/blog/en/<slug>` (or `/ar/...`, or `ar.example.com`). Never serve different languages
at the same URL based on cookies or `Accept-Language`: Googlebot usually crawls without `Accept-Language`
(and from the US), so it would only ever see one language and the others would never be indexed.

- Pick a locale segment: `app/[lang]/...` for the whole site, or `app/blog/[lang]/...` for a section.
- `generateStaticParams` returns every locale, and `export const dynamicParams = false` 404s unknown ones.
- Same slug across languages is simplest (one `getPost(slug)`); localized slugs are fine if you keep a map.

## 2. Choosing the visitor's language (negotiation) without hurting SEO

"Default to language X unless the visitor uses another language" is done with a **language-neutral entry URL**
that redirects, while the language-prefixed URLs never redirect:

```
/blog            -> 307 -> /blog/<negotiated>
/blog/<slug>     -> 307 -> /blog/<negotiated>/<slug>
/blog/ar/<slug>  -> 200 (always, for everyone, including crawlers)
```

Negotiation order: **explicit choice** (cookie set by the language switcher) → **`Accept-Language`** (highest
`q` first; first supported language wins; if the browser lists only unsupported languages, fall back to the
most universal translation you have, usually English) → **site default** (no header at all, as with most bots).

Next.js `middleware.ts`:
```ts
export function middleware(req: NextRequest) {
  const [, second] = req.nextUrl.pathname.split('/').filter(Boolean) // ['blog', ...]
  if (isLocale(second)) return NextResponse.next()          // never redirect prefixed URLs
  const url = req.nextUrl.clone()
  url.pathname = ['', 'blog', negotiate(req), ...rest].join('/')
  const res = NextResponse.redirect(url, 307)                // temporary: depends on the visitor
  res.headers.set('Vary', 'Accept-Language, Cookie')
  res.headers.set('Cache-Control', 'private, no-store')
  return res
}
export const config = { matcher: ['/blog', '/blog/:path*'] }
```

Rules:
- **307/302, never 301/308.** The target depends on the visitor; a permanent redirect gets cached for everyone.
- Add `Vary: Accept-Language, Cookie` and don't let a CDN cache the redirect.
- Keep middleware imports tiny: put locale constants in their own module so the edge bundle doesn't pull in all content.
- The language switcher is a normal `<a href hreflang lang>` link to the other version (crawlable) that also sets the cookie.
- Never auto-redirect a prefixed URL based on the browser language. Someone who opens a shared English link should get English.

## 3. hreflang and x-default

Every language version lists **all** versions, including itself, plus `x-default` (reciprocal, generated from the locale list):

```ts
alternates: {
  canonical: `/blog/${lang}/${slug}`,                // self-referencing, per language
  languages: {
    ar: `/blog/ar/${slug}`,
    en: `/blog/en/${slug}`,
    'x-default': `/blog/${slug}`,                    // the negotiating URL from section 2
  },
},
```

- **`x-default` → the language-negotiating URL** when you have one (Google explicitly recommends this for
  auto-redirecting/locale-selector pages). Otherwise point it at the default language.
- Canonical is **per language**. Never canonicalize the English version to the Arabic one; that tells Google they are duplicates and drops one.
- Use language codes (`ar`, `en`) unless you truly have regional variants (`en-GB`, `ar-EG`).
- Index pages (`/blog/ar`, `/blog/en`) need the same treatment.

## 4. `<html lang dir>` per language

`lang` helps Bing, screen readers, hyphenation and font selection, and `dir="rtl"` is required for correct RTL
rendering. In the App Router `<html>` lives in the root layout, which has no access to child params. Options:

- **Whole site localized:** make `app/[lang]/layout.tsx` the root layout (no `app/layout.tsx`).
- **One localized section** (e.g. blog) next to a non-localized site: use **multiple root layouts**:
  - move the existing site into a route group `app/(site)/layout.tsx` (URLs don't change),
  - add `app/blog/[lang]/layout.tsx` as a second root layout rendering `<html lang={lang} dir={dir}>`,
  - add `app/global-not-found.tsx` (Next 15.4+, `experimental.globalNotFound: true`), since there is no
    single root layout left for unmatched URLs,
  - each root layout imports global CSS and sets `metadataBase`, robots defaults, viewport, etc.; metadata is **not** inherited across root layouts.
  - Metadata files at `app/` root (`icon.png`, `robots.ts`, `sitemap.ts`) still apply to every root layout.
- Avoid reading `headers()` in the root layout to pick `lang`; it makes every page dynamic.
- Avoid setting `document.documentElement.lang` on the client; crawlers see the server HTML.

If the shared chrome (header/footer) is only in one language, wrap it in `<div dir="ltr" lang="en">` inside RTL pages.

## 5. Per-language metadata

Everything user-visible is translated: `title`, `description`, `openGraph.title/description`, `og:image:alt`,
`og:site_name`, breadcrumb names.

```ts
openGraph: {
  type: 'article',
  locale: lang === 'ar' ? 'ar_AR' : 'en_US',          // og:locale uses underscore format
  alternateLocale: otherLocales.map(toOgLocale),
  siteName: dict[lang].brand,
  url: `/blog/${lang}/${slug}`,
  images: [{ url: `/blog/${lang}/${slug}/og.png`, width: 1200, height: 630, alt: localizedAlt }],
  ...
},
```

- Measure title/description length per language (Arabic ≈ same character budget: ~60 / ~160).
- A title template set in a layout does **not** apply to a page in the same segment: set the full title there.
- Add `alternates.types['application/rss+xml']` per language if you publish feeds.
- Dates: format with the page locale (`Intl.DateTimeFormat('ar-u-nu-latn' | 'ar' | 'en-US')`) and keep ISO
  dates in `<time dateTime>`, `article:published_time` and JSON-LD.

## 6. Per-language JSON-LD

- `inLanguage: lang` on `BlogPosting` / `Article` / `Blog` / `FAQPage`.
- Localized `headline`, `description`, `keywords`, breadcrumb `name`s; absolute URLs of **that** language version.
- Link translations: on the original `workTranslation: { '@id': '<other-url>#article' }`, on the translation
  `translationOfWork: { '@id': '<original-url>#article' }`.
- `FAQPage` only with Q&A that is visible on the page (a `<details>` element counts).

## 7. Sitemap, RSS, llms.txt

- One sitemap entry **per language URL**, each with `alternates.languages` (Next 14.2+ emits `xhtml:link` hreflang). Include `x-default`.
- Never list the redirecting neutral URLs as `<loc>`; they're not canonical.
- RSS: one feed per language with `<language>`.
- llms.txt: list every language version.

## 8. RTL layout and typography

- Use logical CSS: `margin-inline-start`, `padding-inline-start`, `border-inline-start`, `text-align: start`,
  `inset-inline-*`; Tailwind `ps-/pe-/ms-/me-/start-/end-` and the `rtl:` variant. Flip directional icons (arrows).
- Load a proper Arabic font (`next/font/google` `IBM_Plex_Sans_Arabic`, `Noto_Kufi_Arabic`, `Cairo`, `Tajawal`) with
  `subsets: ['arabic']`, plus a Latin font for mixed words; slightly larger size and line-height for Arabic.
- `dir="auto"` on code/prompt blocks and user content; `unicode-bidi: isolate` for inline code.
- Check for unlayered global CSS (e.g. `body { background-color }`) overriding Tailwind utilities in the new root layout.

## 9. Open Graph images with Arabic / RTL text (next/og, satori)

Satori shapes Arabic letters but **lays out RTL text in the wrong word order** and **measures words by their
unjoined glyph widths** (uneven gaps). It also **rejects variable fonts** and some static ones
(`lookupType: 5 - substFormat: 3 is not yet supported`, e.g. Noto Kufi Arabic). What works:

1. A **static** TTF that satori accepts (verified: IBM Plex Sans Arabic Bold, Cairo, Tajawal), loaded with
   `fs.readFile` and passed in `fonts`. Vendor it in the repo (OFL fonts allow this).
2. Pre-shape each Arabic run into Unicode Presentation Forms-B (contextual forms + lam-alef ligatures), reverse it
   into visual order, mirror brackets, and keep Latin runs (e.g. «وLovable») unreversed while flipping run order.
   See `templates/nextjs/lib/arabic-shape.ts` (`ogWord()`).
3. Render one `<span>` per word inside `display: flex; flex-direction: row-reverse; flex-wrap: wrap` so lines wrap right-to-left.
4. Always look at the generated PNG. Don't assume it rendered correctly.

Serve per-language images at stable URLs (`/blog/<lang>/<slug>/og.png` route handler with
`dynamic = 'force-static'` + `generateStaticParams`) so you can set localized `alt` in metadata and reference
the same URL in JSON-LD.

## 10. Content model for translated posts

Keep each post as one record with a translation per locale so nothing drifts:

```json
{ "slug": "...", "publishedAt": "...", "updatedAt": "...", "originalLocale": "ar",
  "translations": { "ar": { "title": "...", "seoTitle": "...", "description": "...", "excerpt": "...",
                            "tags": [], "imageAlt": "...", "content": [], "faq": [] },
                    "en": { ... } } }
```
Require every locale (type-check it) or explicitly fall back. Don't publish a half-translated page under the second locale's URL.

## 11. Checklist

- [ ] One URL per language; prefixed URLs never redirect; unknown locales 404
- [ ] Neutral entry URL negotiates cookie → Accept-Language → default, with 307 + `Vary`
- [ ] Self-referencing canonical per language; reciprocal hreflang incl. `x-default`
- [ ] `<html lang dir>` correct in the **server** HTML of each language
- [ ] Translated title/description/OG/alt; `og:locale` + `og:locale:alternate`
- [ ] JSON-LD `inLanguage`, localized breadcrumbs, translation links
- [ ] Sitemap lists every language URL with alternates; feeds per language
- [ ] RTL: logical CSS, Arabic font, mirrored icons, OG images verified visually
