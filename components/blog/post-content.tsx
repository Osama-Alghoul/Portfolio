import Link from "next/link";
import { Fragment, type ReactNode } from "react";
import { Lightbulb, TriangleAlert } from "lucide-react";
import type { Block, Locale } from "@/lib/blog";
import { dict } from "@/lib/blog";

function createKey(identity: string, occurrences: Map<string, number>) {
  const occurrence = occurrences.get(identity) ?? 0;
  occurrences.set(identity, occurrence + 1);
  return `${identity}:${occurrence}`;
}

function keyBy<T>(items: T[], identity: (item: T) => string) {
  const occurrences = new Map<string, number>();
  return items.map((item) => ({
    item,
    key: createKey(identity(item), occurrences),
  }));
}

/** Renders the tiny inline syntax used in blog.json: **bold**, `code`, [text](url). */
export function Inline({ text }: { text: string }) {
  const parts: ReactNode[] = [];
  const occurrences = new Map<string, number>();
  const re = /\*\*(.+?)\*\*|`([^`]+)`|\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    if (m.index > last) {
      const content = text.slice(last, m.index);
      parts.push(<Fragment key={createKey(`text:${content}`, occurrences)}>{content}</Fragment>);
    }
    if (m[1] !== undefined) {
      parts.push(<strong key={createKey(`strong:${m[1]}`, occurrences)}>{m[1]}</strong>);
    } else if (m[2] !== undefined) {
      parts.push(<code key={createKey(`code:${m[2]}`, occurrences)}>{m[2]}</code>);
    } else {
      const href = m[4];
      const external = /^https?:\/\//.test(href);
      const key = createKey(`link:${href}:${m[3]}`, occurrences);
      parts.push(
        external ? (
          <a key={key} href={href} target="_blank" rel="noopener noreferrer">
            {m[3]}
          </a>
        ) : (
          <Link key={key} href={href}>
            {m[3]}
          </Link>
        ),
      );
    }
    last = re.lastIndex;
  }
  if (last < text.length) {
    const content = text.slice(last);
    parts.push(<Fragment key={createKey(`text:${content}`, occurrences)}>{content}</Fragment>);
  }
  return <>{parts}</>;
}

export default function PostContent({ blocks, lang }: { blocks: Block[]; lang: Locale }) {
  const t = dict[lang];
  return (
    <>
      {keyBy(blocks, (block) => JSON.stringify(block)).map(({ item: b, key }) => {
        switch (b.type) {
          case "p":
            return (
              <p key={key}>
                <Inline text={b.text} />
              </p>
            );
          case "h2":
            return (
              <h2 key={key} id={b.id}>
                <a href={`#${b.id}`} className="heading-anchor">
                  <Inline text={b.text} />
                </a>
              </h2>
            );
          case "h3":
            return (
              <h3 key={key} id={b.id}>
                <Inline text={b.text} />
              </h3>
            );
          case "ul":
          case "ol": {
            const List = b.type;
            return (
              <List key={key}>
                {keyBy(b.items, (item) => item).map(({ item, key: itemKey }) => (
                  <li key={itemKey}>
                    <Inline text={item} />
                  </li>
                ))}
              </List>
            );
          }
          case "quote":
            return (
              <blockquote key={key}>
                <Inline text={b.text} />
              </blockquote>
            );
          case "callout": {
            const Icon = b.variant === "tip" ? Lightbulb : TriangleAlert;
            return (
              <aside key={key} className="callout" data-variant={b.variant} role="note">
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
              <pre key={key} dir="auto" tabIndex={0}>
                <code data-lang={b.lang}>{b.code}</code>
              </pre>
            );
          case "table":
            return (
              <div key={key} className="table-wrap" tabIndex={0} role="region" aria-label={b.head.join(" / ")}>
                <table>
                  <thead>
                    <tr>
                      {keyBy(b.head, (heading) => heading).map(({ item: h, key: headingKey }) => (
                        <th key={headingKey} scope="col">
                          <Inline text={h} />
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {keyBy(b.rows, (row) => JSON.stringify(row)).map(({ item: row, key: rowKey }) => (
                      <tr key={rowKey}>
                        {keyBy(row, (cell) => cell).map(({ item: cell, key: cellKey }, column) =>
                          column === 0 ? (
                            <th key={cellKey} scope="row">
                              <Inline text={cell} />
                            </th>
                          ) : (
                            <td key={cellKey}>
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
