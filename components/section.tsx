import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  id?: string;
  /** Two-digit index shown in the mono kicker, e.g. "02". */
  index?: string;
  /** Kicker text, e.g. "experience". */
  label: string;
  title: ReactNode;
  /** Optional element aligned to the right of the title (a link, a counter…). */
  aside?: ReactNode;
  className?: string;
  children: ReactNode;
}

/** One block of the home column: mono kicker, serif title, content. */
export default function Section({ id, index, label, title, aside, className, children }: SectionProps) {
  const headingId = id ? `${id}-title` : undefined;
  return (
    <section id={id} aria-labelledby={headingId} className={cn("px-5 py-14 sm:px-10", className)}>
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <p className="kicker">
            {index && <span className="text-brand">{index}</span>}
            {index && " · "}
            {label}
          </p>
          <h2 id={headingId} className="mt-2 font-serif text-4xl italic tracking-tight text-fg sm:text-5xl">
            {title}
          </h2>
        </div>
        {aside}
      </div>
      {children}
    </section>
  );
}
