import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { JsonLdScript } from "@/components/json-ld";
import LanguageSwitch from "@/components/blog/language-switch";
import PostContent, { Inline } from "@/components/blog/post-content";
import {
  LOCALES,
  blogPath,
  dict,
  formatDate,
  getAllPosts,
  getPost,
  isLocale,
  languageAlternates,
  localeMeta,
  postPath,
  readingMinutes,
  stripInline,
  wordCount,
  type Block,
  type Locale,
} from "@/lib/blog";
import { SITE_URL, absoluteUrl, personJsonLd } from "@/lib/site";

export const dynamicParams = false;
export const generateStaticParams = () =>
  LOCALES.flatMap((lang) => getAllPosts().map((p) => ({ lang, slug: p.slug })));

type Props = { params: Promise<{ lang: string; slug: string }> };

async function load(params: Props["params"]) {
  const { lang, slug } = await params;
  const post = getPost(slug);
  if (!isLocale(lang) || !post) notFound();
  return { lang, post, tr: post.translations[lang] };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, post, tr } = await load(params);
  const t = dict[lang];
  const path = postPath(lang, post.slug);
  const title = tr.seoTitle ?? tr.title;
  const image = { url: `${path}/og.png`, width: 1200, height: 630, alt: tr.imageAlt };

  return {
    // seoTitle is already ~60 chars, so skip the "| brand" template to avoid truncation.
    title: { absolute: title },
    description: tr.description,
    authors: [{ name: t.brand, url: SITE_URL }],
    alternates: {
      canonical: path,
      languages: languageAlternates(post.slug),
      types: { "application/rss+xml": [{ url: `${blogPath(lang)}/feed.xml`, title: `${t.blogTitle} (RSS)` }] },
    },
    openGraph: {
      type: "article",
      siteName: t.brand,
      locale: localeMeta[lang].ogLocale,
      alternateLocale: LOCALES.filter((l) => l !== lang).map((l) => localeMeta[l].ogLocale),
      title,
      description: tr.description,
      url: path,
      images: [image],
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [SITE_URL],
      section: t.blog,
      tags: tr.tags,
    },
    twitter: { card: "summary_large_image", title, description: tr.description, images: [image] },
  };
}

export default async function PostPage({ params }: Props) {
  const { lang, post, tr } = await load(params);
  const t = dict[lang];
  const other: Locale = lang === "ar" ? "en" : "ar";
  const BackArrow = localeMeta[lang].dir === "rtl" ? ArrowRight : ArrowLeft;
  const url = absoluteUrl(postPath(lang, post.slug));
  const toc = tr.content.filter((b): b is Extract<Block, { type: "h2" | "h3" }> => b.type === "h2");

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      personJsonLd,
      {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        headline: tr.title,
        description: tr.description,
        url,
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        image: { "@type": "ImageObject", url: `${url}/og.png`, width: 1200, height: 630 },
        datePublished: post.publishedAt,
        dateModified: post.updatedAt,
        inLanguage: lang,
        wordCount: wordCount(tr),
        keywords: tr.tags.join(", "),
        articleSection: t.blog,
        author: { "@id": `${SITE_URL}/#person` },
        publisher: { "@id": `${SITE_URL}/#person` },
        isPartOf: { "@type": "Blog", "@id": `${absoluteUrl(blogPath(lang))}#blog`, name: t.blogTitle },
        // Link the language versions to each other.
        ...(lang === post.originalLocale
          ? { workTranslation: { "@id": `${absoluteUrl(postPath(other, post.slug))}#article` } }
          : { translationOfWork: { "@id": `${absoluteUrl(postPath(other, post.slug))}#article` } }),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: t.home, item: SITE_URL },
          { "@type": "ListItem", position: 2, name: t.blog, item: absoluteUrl(blogPath(lang)) },
          { "@type": "ListItem", position: 3, name: tr.title, item: url },
        ],
      },
      ...(tr.faq?.length
        ? [
            {
              "@type": "FAQPage",
              "@id": `${url}#faq`,
              inLanguage: lang,
              mainEntity: tr.faq.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: stripInline(f.a) },
              })),
            },
          ]
        : []),
    ],
  };

  return (
    <main className="flex min-h-screen flex-col">
      <JsonLdScript data={jsonLd} />

      <article className="container mx-auto max-w-3xl px-4 pt-28 pb-20 md:px-6 md:pt-36">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-gray-400">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="hover:text-gold">
                {t.home}
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link href={blogPath(lang)} className="hover:text-gold">
                {t.blog}
              </Link>
            </li>
          </ol>
        </nav>

        <header className="mb-10 border-b border-blue-900/60 pb-8">
          <h1 className="text-3xl font-black leading-snug text-gold md:text-5xl md:leading-tight">{tr.title}</h1>
          <p className="mt-5 text-lg leading-relaxed text-blue-200">{tr.excerpt}</p>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Image src="/Me.png" alt="" width={44} height={44} className="h-11 w-11 rounded-full border-2 border-gold object-cover" />
              <div className="text-sm leading-relaxed">
                <p className="font-semibold text-white">
                  {t.by} <Link href="/" rel="author" className="hover:text-gold">{t.brand}</Link>
                </p>
                <p className="text-gray-400">
                  <time dateTime={post.publishedAt}>{formatDate(post.publishedAt, lang)}</time>
                  <span aria-hidden> · </span>
                  {t.minRead(readingMinutes(tr))}
                </p>
              </div>
            </div>
            <LanguageSwitch target={other} href={postPath(other, post.slug)} label={t.readIn} />
          </div>
        </header>

        {toc.length > 2 && (
          <nav aria-labelledby="toc-title" className="mb-10 rounded-xl border border-blue-800/60 bg-blue-950/30 p-5">
            <h2 id="toc-title" className="mb-3 text-sm font-bold text-gold">
              {t.toc}
            </h2>
            <ol className="grid gap-1.5 text-gray-300 sm:grid-cols-2">
              {toc.map((h) => (
                <li key={h.id}>
                  <a href={`#${h.id}`} className="hover:text-gold">
                    {stripInline(h.text)}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        )}

        <div className="prose-blog">
          <PostContent blocks={tr.content} lang={lang} />
        </div>

        {tr.faq && tr.faq.length > 0 && (
          <section aria-labelledby="faq" className="mt-14">
            <h2 id="faq" className="mb-5 text-2xl font-bold text-white">
              {t.faq}
            </h2>
            <div className="grid gap-3">
              {tr.faq.map((f) => (
                <details key={f.q} className="group rounded-xl border border-blue-800/60 bg-blue-950/30 p-5 open:border-gold/60">
                  <summary className="cursor-pointer list-none font-semibold text-white marker:hidden group-open:text-gold">
                    {f.q}
                  </summary>
                  <p className="mt-3 leading-relaxed text-gray-300">
                    <Inline text={f.a} />
                  </p>
                </details>
              ))}
            </div>
          </section>
        )}

        <footer className="mt-14 grid gap-6 border-t border-blue-900/60 pt-8">
          <ul className="flex flex-wrap gap-2" aria-label={t.tagsLabel}>
            {tr.tags.map((tag) => (
              <li key={tag} className="rounded-full bg-blue-900/50 px-3 py-1 text-sm text-blue-200">
                {tag}
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-4 rounded-xl border border-blue-800/60 bg-blue-950/30 p-5">
            <Image src="/Me.png" alt={t.brand} width={64} height={64} className="h-16 w-16 rounded-full border-2 border-gold object-cover" />
            <div>
              <p className="font-bold text-white">{t.brand}</p>
              <p className="text-sm text-gray-400">{t.authorBio}</p>
              <Link href="/#contact" className="mt-1 inline-block text-sm font-semibold text-gold hover:underline">
                {t.contact}
              </Link>
            </div>
          </div>
          <Link href={blogPath(lang)} className="inline-flex items-center gap-2 text-gray-300 hover:text-gold">
            <BackArrow aria-hidden className="h-4 w-4" />
            {t.backToBlog}
          </Link>
        </footer>
      </article>
    </main>
  );
}
