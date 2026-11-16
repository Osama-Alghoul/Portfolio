import { ArrowUpRight } from "lucide-react";
import { experience } from "@/lib/experience";

const KIND_LABEL = { work: "work", freelance: "freelance", training: "training", project: "side quest" } as const;

export default function Experience() {
  return (
    <ol className="relative ms-1.5 border-s border-brand/25">
      {experience.map((e) => (
        <li key={`${e.role}-${e.company}`} className="relative ps-6 pb-8 last:pb-0">
          <span
            aria-hidden
            className={`absolute -start-[5px] top-1.5 h-2.5 w-2.5 rounded-full border ${
              e.current ? "border-brand bg-brand shadow-[0_0_10px_var(--brand)]" : "border-faint bg-ink"
            }`}
          />
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h3 className="text-[15px] font-medium text-fg">{e.role}</h3>
            <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-faint">
              {e.period ?? (e.current ? "Present" : "")}
            </p>
          </div>
          <p className="mt-0.5 flex flex-wrap items-center gap-2 text-sm text-dim">
            {e.url ? (
              <a
                href={e.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-0.5 underline decoration-line underline-offset-4 transition-colors hover:text-brand hover:decoration-brand/50"
              >
                {e.company}
                <ArrowUpRight aria-hidden className="h-3 w-3" />
              </a>
            ) : (
              e.company
            )}
            <span className="rounded border border-line px-1.5 py-px font-mono text-[10px] uppercase tracking-wider text-faint">
              {KIND_LABEL[e.kind]}
            </span>
          </p>
          {e.summary && <p className="mt-2 text-sm leading-relaxed text-faint">{e.summary}</p>}
        </li>
      ))}
    </ol>
  );
}
