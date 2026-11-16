import { Github } from "lucide-react";
import data from "@/data.json";

// Public, token-free contributions API (scrapes the GitHub profile calendar).
// Cached for an hour; if it is down, the section falls back to a profile link.
const GITHUB_URL = data.contact.github;
const USERNAME = GITHUB_URL.replace(/\/+$/, "").split("/").pop()!;
const API = `https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=last`;

type Day = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };

const LEVEL_BG = ["bg-white/[0.05]", "bg-brand/25", "bg-brand/50", "bg-brand/75", "bg-brand"] as const;
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

async function getContributions(): Promise<Day[] | null> {
  try {
    const res = await fetch(API, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    const json = (await res.json()) as { contributions?: Day[] };
    return json.contributions?.length ? json.contributions : null;
  } catch {
    return null;
  }
}

type Week = { key: string; label: string; cells: { key: string; day: Day | null }[] };

const monthOf = (d: Day) => new Date(d.date + "T00:00:00Z").getUTCMonth();

/** Splits days into Sunday-first week columns (padding the first week) and labels each month's first column. */
function toWeeks(days: Day[]): Week[] {
  const pad = new Date(days[0].date + "T00:00:00Z").getUTCDay();
  const cells = [
    ...Array.from({ length: pad }, (_, n) => ({ key: `pad-${n}`, day: null })),
    ...days.map((day) => ({ key: day.date, day })),
  ];
  const weeks: Week[] = [];
  let prevMonth = -1;
  for (let i = 0; i < cells.length; i += 7) {
    const slice = cells.slice(i, i + 7);
    const first = slice.find((c) => c.day)!.day!;
    const month = monthOf(first);
    // Skip a label in the last two columns: there is no room for it.
    const label = month !== prevMonth && i / 7 < Math.ceil(cells.length / 7) - 2 ? MONTHS[month] : "";
    prevMonth = month;
    weeks.push({ key: first.date, label, cells: slice });
  }
  return weeks;
}

export default async function GithubActivity() {
  const days = await getContributions();

  const profileLink = (
    <a
      href={GITHUB_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 font-mono text-xs text-dim transition-colors hover:text-fg"
    >
      <Github aria-hidden className="h-3.5 w-3.5" />@{USERNAME}
    </a>
  );

  if (!days) {
    return (
      <div className="rounded-xl border border-line bg-surface p-6 text-sm text-dim">
        Activity is unavailable right now. See it on {profileLink}.
      </div>
    );
  }

  const total = days.reduce((n, d) => n + d.count, 0);
  const weeks = toWeeks(days);

  return (
    <figure className="rounded-xl border border-line bg-surface p-4 sm:p-5">
      {/* RTL scroller so narrow screens start on the most recent weeks. */}
      <div className="overflow-x-auto [direction:rtl]">
        <div className="inline-flex flex-col gap-1.5 [direction:ltr]">
          <div className="flex gap-[3px] font-mono text-[10px] text-faint" aria-hidden>
            {weeks.map((w) => (
              <span key={w.key} className="w-[10px] shrink-0 overflow-visible whitespace-nowrap">
                {w.label}
              </span>
            ))}
          </div>
          <div className="flex gap-[3px]" role="img" aria-label={`${total} GitHub contributions in the last year`}>
            {weeks.map((w) => (
              <div key={w.key} className="flex flex-col gap-[3px]">
                {w.cells.map(({ key, day }) =>
                  day ? (
                    <span
                      key={key}
                      title={`${day.count} contribution${day.count === 1 ? "" : "s"} on ${day.date}`}
                      className={`h-[10px] w-[10px] rounded-[2px] ${LEVEL_BG[day.level]}`}
                    />
                  ) : (
                    <span key={key} className="h-[10px] w-[10px]" />
                  ),
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <figcaption className="mt-4 flex flex-wrap items-center justify-between gap-3 font-mono text-[11px] text-faint">
        <span>
          <span className="text-brand">{total}</span> contributions in the last year · {profileLink}
        </span>
        <span className="flex items-center gap-1" aria-hidden>
          less
          {LEVEL_BG.map((c) => (
            <span key={c} className={`h-[10px] w-[10px] rounded-[2px] ${c}`} />
          ))}
          more
        </span>
      </figcaption>
    </figure>
  );
}
