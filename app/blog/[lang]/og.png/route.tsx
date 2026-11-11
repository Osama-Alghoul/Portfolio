// /blog/<lang>/og.png: Open Graph image for the blog index, prerendered per language.
import { renderBlogOg } from "@/lib/blog-og";
import { LOCALES, dict, isLocale } from "@/lib/blog";

export const dynamic = "force-static";
export const dynamicParams = false;
export const generateStaticParams = () => LOCALES.map((lang) => ({ lang }));

export async function GET(_req: Request, { params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) return new Response("Not found", { status: 404 });
  const t = dict[lang];
  return renderBlogOg({ lang, kicker: t.blogKicker, title: t.blogTitle, footer: "osssghoul.com/blog", chips: ["AI", "Web", "Products"] });
}
