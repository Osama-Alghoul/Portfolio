// /blog/<lang>/feed.xml: RSS 2.0 feed per language (linked from <head> via alternates.types).
import { LOCALES, blogPath, dict, getAllPosts, isLocale, postPath } from "@/lib/blog";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";
export const dynamicParams = false;
export const generateStaticParams = () => LOCALES.map((lang) => ({ lang }));

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export async function GET(_req: Request, { params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) return new Response("Not found", { status: 404 });
  const t = dict[lang];
  const posts = getAllPosts();
  const self = absoluteUrl(`${blogPath(lang)}/feed.xml`);

  const items = posts
    .map((p) => {
      const tr = p.translations[lang];
      const url = absoluteUrl(postPath(lang, p.slug));
      return `    <item>
      <title>${esc(tr.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${esc(tr.excerpt)}</description>
      <pubDate>${new Date(p.publishedAt).toUTCString()}</pubDate>
${tr.tags.map((tag) => `      <category>${esc(tag)}</category>`).join("\n")}
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(t.blogTitle)}</title>
    <link>${absoluteUrl(blogPath(lang))}</link>
    <description>${esc(t.blogDescription)}</description>
    <language>${lang}</language>
    <atom:link href="${self}" rel="self" type="application/rss+xml" />
${posts[0] ? `    <lastBuildDate>${new Date(posts[0].updatedAt).toUTCString()}</lastBuildDate>\n` : ""}${items}
  </channel>
</rss>
`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
