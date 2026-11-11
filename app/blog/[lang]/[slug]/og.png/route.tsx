// /blog/<lang>/<slug>/og.png: per-post, per-language Open Graph image, prerendered at build time.
import { renderBlogOg } from "@/lib/blog-og";
import { LOCALES, dict, getAllPosts, getPost, isLocale } from "@/lib/blog";

export const dynamic = "force-static";
export const dynamicParams = false;
export const generateStaticParams = () =>
  LOCALES.flatMap((lang) => getAllPosts().map((p) => ({ lang, slug: p.slug })));

export async function GET(_req: Request, { params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  const post = getPost(slug);
  if (!isLocale(lang) || !post) return new Response("Not found", { status: 404 });
  const tr = post.translations[lang];
  return renderBlogOg({
    lang,
    kicker: `${dict[lang].blog} · ${dict[lang].brand}`,
    title: tr.title,
    footer: "osssghoul.com",
    // Latin-only tags make the cleanest chips on the image.
    chips: tr.tags.filter((tag) => /^[\x20-\x7e]+$/.test(tag)),
  });
}
