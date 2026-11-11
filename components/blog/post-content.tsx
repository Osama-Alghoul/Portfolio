import Link from "next/link";
import { Fragment, type ReactNode } from "react";
import { Lightbulb, TriangleAlert } from "lucide-react";
import type { Block, Locale } from "@/lib/blog";
import { dict } from "@/lib/blog";

/** Renders the tiny inline syntax used in blog.json: **bold**, `code`, [text](url). */
export function Inline({ text }: { text: string }) {
  const parts: ReactNode[] = [];
  const re = /\*\*(.+?)\*\*|`([^`]+)`|\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    if (m[1] !== undefined) parts.push(<strong key={m.index}>{m[1]}</strong>);
    else if (m[2] !== undefined) parts.push(<code key={m.index}>{m[2]}</code>);
    else {
      const href = m[4];
      const external = /^https?:\/\//.test(href);
      parts.push(
        external ? (
          <a key={m.index} href={href} target="_blank" rel="noopener noreferrer">
            {m[3]}
          </a>
        ) : (
          <Link key={m.index} href={href}>
            {m[3]}
          </Link>
        ),
      );
    }
    last = re.lastIndex;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <>{parts.map((p, i) => (typeof p === "string" ? <Fragment key={i}>{p}</Fragment> : p))}</>;
}

export default function PostContent({ blocks, lang }: { blocks: Block[]; lang: Locale }) {
  const t = dict[lang];
  return (
    <>
      {blocks.map((b, i) => {
        switch (b.type) {
          case "p":
            return (
              <p key={i}>
                <Inline text={b.text} />
              </p>
            );
          case "h2":
            return (
              <h2 key={i} id={b.id}>
                <a href={`#${b.id}`} className="heading-anchor">
                  <Inline text={b.text} />
                </a>
              </h2>
            );
          case "h3":
            return (
              <h3 key={i} id={b.id}>
                <Inline text={b.text} />
              </h3>
            );
          case "ul":
          case "ol": {
            const List = b.type;
            return (
              <List key={i}>
                {b.items.map((item, j) => (
                  <li key={j}>
                    <Inline text={item} />
                  </li>
                ))}
              </List>
            );
          }
          case "quote":
            return (
              <blockquote key={i}>
                <Inline text={b.text} />
              </blockquote>
            );
          case "callout": {
            const Icon = b.variant === "tip" ? Lightbulb : TriangleAlert;
            return (
              <aside key={i} className="callout" data-variant={b.variant} role="note">
                <p className="callout-title">
                  <Icon aria-hidden className="h-4 w-4" />
                  {b.title ?? (b.variant === "tip" ? t.tip : t.warning)}
                </p>
                <p>
                  <Inline text={b.text} />
                </p>
              </aside>
            );
          }
          case "code":
            return (
              // Code (and prompt) samples keep their own direction based on content.
              <pre key={i} dir="auto" tabIndex={0}>
                <code data-lang={b.lang}>{b.code}</code>
              </pre>
            );
          case "table":
            return (
              <div key={i} className="table-wrap" tabIndex={0} role="region" aria-label={b.head.join(" / ")}>
                <table>
                  <thead>
                    <tr>
                      {b.head.map((h, j) => (
                        <th key={j} scope="col">
                          <Inline text={h} />
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {b.rows.map((row, j) => (
                      <tr key={j}>
                        {row.map((cell, k) =>
                          k === 0 ? (
                            <th key={k} scope="row">
                              <Inline text={cell} />
                            </th>
                          ) : (
                            <td key={k}>
                              <Inline text={cell} />
                            </td>
                          ),
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
        }
      })}
    </>
  );
}
