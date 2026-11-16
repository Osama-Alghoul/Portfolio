import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { blogPath, dict, formatDate, getAllPosts, postPath, readingMinutes } from "@/lib/blog";

const LANG = "en" as const;

/** Latest three posts, as a hairline list. */
export default function BlogPreview() {
  const posts = getAllPosts().slice(0, 3);
  if (!posts.length) return <p className="text-sm text-dim">{dict[LANG].noPosts}</p>;

  return (
    <div>
      <ul className="divide-y divide-line border-y border-line">
        {posts.map((post) => {
          const t = post.translations[LANG];
          return (
            <li key={post.slug}>
              <Link
                href={postPath(LANG, post.slug)}
                className="group -mx-3 flex flex-col gap-1.5 rounded-md px-3 py-5 transition-colors hover:bg-hover sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
              >
                <div className="min-w-0">
                  <h3 className="text-[15px] font-medium text-fg transition-colors group-hover:text-brand">{t.title}</h3>
                  <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-dim">{t.excerpt}</p>
                </div>
                <p className="shrink-0 font-mono text-[11px] uppercase tracking-[0.08em] text-faint">
                  <time dateTime={post.publishedAt}>{formatDate(post.publishedAt, LANG)}</time>
                  {" · "}
                  {dict[LANG].minRead(readingMinutes(t))}
                </p>
              </Link>
            </li>
          );
        })}
      </ul>
      <Link
        href={blogPath(LANG)}
        className="group mt-5 inline-flex items-center gap-1 font-mono text-xs uppercase tracking-[0.1em] text-brand transition-colors hover:text-fg"
      >
        All posts
        <ArrowUpRight aria-hidden className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </Link>
    </div>
  );
}
