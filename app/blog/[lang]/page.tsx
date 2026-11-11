import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Rss } from "lucide-react";
import { JsonLdScript } from "@/components/json-ld";
import LanguageSwitch from "@/components/blog/language-switch";
import {
  LOCALES,
  blogPath,
  dict,
  formatDate,
  getAllPosts,
  isLocale,
  languageAlternates,
  localeMeta,
  postPath,
  readingMinutes,
  type Locale,
} from "@/lib/blog";
import { SITE_URL, absoluteUrl, personJsonLd } from "@/lib/site";

type Props = { params: Promise<{ lang: string }> };

const other = (lang: Locale): Locale => (lang === "ar" ? "en" : "ar");

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = dict[lang];
  const path = blogPath(lang);
  const image = { url: `${path}/og.png`, width: 1200, height: 630, alt: t.blogTitle };
  // The layout's title template doesn't apply to a page in the same segment, so add the brand here.
  return {
    title: { absolute: `${t.blogSeoTitle} | ${t.brand}` },
    description: t.blogDescription,
    alternates: {
      canonical: path,
      languages: languageAlternates(),
      types: { "application/rss+xml": [{ url: `${path}/feed.xml`, title: `${t.blogTitle} (RSS)` }] },
    },
    openGraph: {
      type: "website",
      siteName: t.brand,
      locale: localeMeta[lang].ogLocale,
      alternateLocale: LOCALES.filter((l) => l !== lang).map((l) => localeMeta[l].ogLocale),
      title: t.blogSeoTitle,
      description: t.blogDescription,
      url: path,
      images: [image],
    },
    twitter: { card: "summary_large_image", title: t.blogSeoTitle, description: t.blogDescription, images: [image] },
  };
}

export default async function BlogIndex({ params }: Props) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = dict[lang];
  const posts = getAllPosts();
  const Arrow = localeMeta[lang].dir === "rtl" ? ArrowLeft : ArrowRight;
  const url = absoluteUrl(blogPath(lang));

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      personJsonLd,
      {
        "@type": "Blog",
        "@id": `${url}#blog`,
        url,
        name: t.blogTitle,
        description: t.blogDescription,
        inLanguage: lang,
        author: { "@id": `${SITE_URL}/#person` },
        publisher: { "@id": `${SITE_URL}/#person` },
        blogPost: posts.map((p) => ({
          "@type": "BlogPosting",
          "@id": `${absoluteUrl(postPath(lang, p.slug))}#article`,
          headline: p.translations[lang].title,
          url: absoluteUrl(postPath(lang, p.slug)),
          datePublished: p.publishedAt,
          dateModified: p.updatedAt,
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: t.home, item: SITE_URL },
          { "@type": "ListItem", position: 2, name: t.blog, item: url },
        ],
      },
    ],
  };

  return (
    <main className="flex min-h-screen flex-col">
      <JsonLdScript data={jsonLd} />

      <section className="relative overflow-hidden pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="absolute inset-0 bg-linear-to-b from-blue-900/25 via-purple-950/10 to-black" aria-hidden />
        <div className="container relative mx-auto flex flex-col items-center gap-5 px-4 text-center md:px-6">
          <p className="rounded-full border border-gold/40 px-3 py-1 text-xs font-bold text-gold">{t.blogKicker}</p>
          <h1 className="text-4xl font-black text-gold md:text-6xl">{t.blogTitle}</h1>
          <p className="max-w-2xl text-lg text-blue-300 md:text-xl">{t.blogDescription}</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <LanguageSwitch target={other(lang)} href={blogPath(other(lang))} label={dict[other(lang)].blog + " · " + localeMeta[other(lang)].label} />
            <a
              href={`${blogPath(lang)}/feed.xml`}
              className="inline-flex items-center gap-2 rounded-full border border-blue-800/70 px-3 py-1.5 text-sm text-gray-300 transition-colors hover:border-gold hover:text-gold"
            >
              <Rss aria-hidden className="h-4 w-4" />
              {t.rss}
            </a>
          </div>
        </div>
      </section>

      <section aria-label={t.blog} className="pb-24">
        <div className="container mx-auto grid max-w-5xl gap-6 px-4 md:px-6">
          {posts.length === 0 && <p className="text-center text-gray-400">{t.noPosts}</p>}
          {posts.map((post) => {
            const tr = post.translations[lang];
            const href = postPath(lang, post.slug);
            return (
              <article
                key={post.slug}
                className="group relative rounded-2xl border border-blue-800/60 bg-blue-950/30 p-6 transition-colors hover:border-gold/70 md:p-8"
              >
                <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-400">
                  <time dateTime={post.publishedAt}>{formatDate(post.publishedAt, lang)}</time>
                  <span aria-hidden>·</span>
                  <span>{t.minRead(readingMinutes(tr))}</span>
                </div>
                <h2 className="text-2xl font-bold leading-snug text-white md:text-3xl">
                  <Link href={href} className="after:absolute after:inset-0 focus-visible:outline-none group-hover:text-gold">
                    {tr.title}
                  </Link>
                </h2>
                <p className="mt-3 text-gray-300 leading-relaxed">{tr.excerpt}</p>
                <ul className="mt-4 flex flex-wrap gap-2" aria-label={t.tagsLabel}>
                  {tr.tags.slice(0, 5).map((tag) => (
                    <li key={tag} className="rounded-full bg-blue-900/50 px-2.5 py-0.5 text-xs text-blue-200">
                      {tag}
                    </li>
                  ))}
                </ul>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-gold" aria-hidden>
                  {t.readMore}
                  <Arrow className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                </span>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
