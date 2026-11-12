// Blog data layer. All posts live in /blog.json; every post carries one translation per locale.
import blogData from "@/blog.json";
import { SITE_URL } from "@/lib/site";

export * from "@/lib/blog-locales";
import { LOCALES, localeMeta, type Locale } from "@/lib/blog-locales";

/* ---------- Content model ---------- */

export type Block =
  | { type: "p"; text: string }
  | { type: "h2" | "h3"; id: string; text: string }
  | { type: "ul" | "ol"; items: string[] }
  | { type: "quote"; text: string }
  | { type: "callout"; variant: "tip" | "warning"; title?: string; text: string }
  | { type: "code"; lang?: string; code: string }
  | { type: "table"; head: string[]; rows: string[][] };

export type PostTranslation = {
  /** Visible H1. */
  title: string;
  /** <title> / og:title. Keep it ≤ ~60 characters. Falls back to `title`. */
  seoTitle?: string;
  /** Meta description, ≤ ~160 characters, written for humans. */
  description: string;
  excerpt: string;
  tags: string[];
  imageAlt: string;
  content: Block[];
  faq?: { q: string; a: string }[];
};

export type Post = {
  slug: string;
  publishedAt: string;
  updatedAt: string;
  /** Language the post was originally written in (the other one is a translation). */
  originalLocale: Locale;
  translations: Record<Locale, PostTranslation>;
};

const posts = (blogData.posts as Post[])
  .slice()
  .sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt));

export const getAllPosts = () => posts;
export const getPost = (slug: string) => posts.find((p) => p.slug === slug) ?? null;

/* ---------- URLs ---------- */

export const blogPath = (lang: Locale) => `/blog/${lang}`;
export const postPath = (lang: Locale, slug: string) => `/blog/${lang}/${slug}`;
/** Language-negotiating URL (middleware redirects by cookie / Accept-Language). Used as hreflang x-default. */
export const neutralPostPath = (slug: string) => `/blog/${slug}`;

/** Reciprocal hreflang map (every version lists all versions + x-default). Relative; resolved by metadataBase. */
export function languageAlternates(slug?: string): Record<string, string> {
  const entries: Record<string, string> = {};
  for (const l of LOCALES) entries[l] = slug ? postPath(l, slug) : blogPath(l);
  entries["x-default"] = slug ? neutralPostPath(slug) : "/blog";
  return entries;
}
export const absoluteLanguageAlternates = (slug?: string) =>
  Object.fromEntries(Object.entries(languageAlternates(slug)).map(([k, v]) => [k, SITE_URL + v]));

/* ---------- Helpers ---------- */

/** Strips the inline markdown used in posts (**bold**, `code`, [text](url)). */
export const stripInline = (s: string) =>
  s.replace(/\*\*(.+?)\*\*/g, "$1").replace(/`([^`]+)`/g, "$1").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");

export function blockText(b: Block): string {
  switch (b.type) {
    case "ul":
    case "ol":
      return b.items.join(" ");
    case "code":
      return b.code;
    case "table":
      return [...b.head, ...b.rows.flat()].join(" ");
    case "callout":
      return `${b.title ?? ""} ${b.text}`;
    default:
      return b.text;
  }
}

export function wordCount(t: PostTranslation): number {
  const text = [t.title, ...t.content.map(blockText), ...(t.faq ?? []).flatMap((f) => [f.q, f.a])].map(stripInline).join(" ");
  return text.split(/\s+/).filter(Boolean).length;
}

export const readingMinutes = (t: PostTranslation) => Math.max(1, Math.round(wordCount(t) / 200));

export const formatDate = (iso: string, lang: Locale) =>
  new Intl.DateTimeFormat(localeMeta[lang].dateLocale, { year: "numeric", month: "long", day: "numeric" }).format(
    new Date(iso),
  );

/* ---------- UI strings ---------- */

export const dict = {
  ar: {
    brand: "أسامة الغول",
    blog: "المدونة",
    home: "الرئيسية",
    blogTitle: "مدونة أسامة الغول",
    blogSeoTitle: "المدونة: الذكاء الاصطناعي وتطوير الويب وبناء المنتجات",
    blogDescription:
      "مقالات عملية بالعربية عن الذكاء الاصطناعي وتطوير الويب وبناء المنتجات الرقمية، من مهندس برمجيات يبني أنظمة قابلة للتوسع.",
    blogKicker: "ملاحظات من الورشة",
    readMore: "اقرأ المقال",
    minRead: (n: number) => (n <= 10 ? `${n} دقائق قراءة` : `${n} دقيقة قراءة`),
    published: "نُشر في",
    updated: "آخر تحديث",
    toc: "محتويات المقال",
    faq: "أسئلة شائعة",
    by: "بقلم",
    authorBio: "مهندس برمجيات يبني ويقود ويدمج خدمات الذكاء الاصطناعي في أنظمة قابلة للتوسع.",
    contact: "تواصل معي",
    backToBlog: "العودة إلى المدونة",
    readIn: "اقرأ بالإنجليزية",
    switchLabel: "اللغة",
    tagsLabel: "الوسوم",
    noPosts: "لا توجد مقالات بعد.",
    rss: "خلاصة RSS",
    tip: "نصيحة",
    warning: "تنبيه",
  },
  en: {
    brand: "Osama Alghoul",
    blog: "Blog",
    home: "Home",
    blogTitle: "Osama Alghoul's Blog",
    blogSeoTitle: "Blog: AI, Web Development & Building Products",
    blogDescription:
      "Practical articles on AI, web development and building digital products, from a software engineer who builds scalable systems.",
    blogKicker: "Notes from the workshop",
    readMore: "Read article",
    minRead: (n: number) => `${n} min read`,
    published: "Published",
    updated: "Updated",
    toc: "On this page",
    faq: "FAQ",
    by: "By",
    authorBio: "Software engineer who builds, leads and integrates AI services into scalable systems.",
    contact: "Get in touch",
    backToBlog: "Back to the blog",
    readIn: "اقرأ بالعربية",
    switchLabel: "Language",
    tagsLabel: "Tags",
    noPosts: "No posts yet.",
    rss: "RSS feed",
    tip: "Tip",
    warning: "Heads up",
  },
} satisfies Record<Locale, Record<string, unknown>>;
