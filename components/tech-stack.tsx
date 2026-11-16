import data from "@/data.json";

const STACK = Array.from(new Set(Object.values(data.skills).flat()));

/** Infinite chip marquee. The second copy is decorative; it pauses on hover and for reduced motion. */
export default function TechStack() {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 gap-2 pr-2">
      {STACK.map((t) => (
        <li
          key={t}
          className="whitespace-nowrap rounded-md border border-line bg-chip px-3 py-1.5 font-mono text-xs text-dim transition-colors hover:border-brand/50 hover:text-brand"
        >
          {t}
        </li>
      ))}
    </ul>
  );

  return (
    <div className="marquee-mask group overflow-hidden">
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
