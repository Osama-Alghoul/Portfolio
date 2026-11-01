"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { PLAY_STYLES } from "@/lib/gaming";
import { usePlayerStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import SceneArt from "./scene-art";

const COUNT = PLAY_STYLES.length;
const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Pinned scroll story: the section is COUNT screens tall, its inner stage sticks
 * to the viewport, and scroll position picks which play style is on stage.
 * With prefers-reduced-motion the CSS unpins it into a plain stacked list.
 */
export default function PlayStyles() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const addXP = usePlayerStore((s) => s.addXP);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const p = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
      section.style.setProperty("--gs-progress", p.toFixed(4));
      setActive(Math.min(COUNT - 1, Math.floor(p * COUNT)));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  // Reward the player for each play style they scroll through.
  useEffect(() => {
    addXP(`gaming_style_${PLAY_STYLES[active].id}`, 10);
  }, [active, addXP]);

  const jumpTo = (i: number) => {
    const section = sectionRef.current;
    if (!section) return;
    const total = section.offsetHeight - window.innerHeight;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({
      top: section.offsetTop + ((i + 0.5) / COUNT) * total,
      behavior: reduce ? "auto" : "smooth",
    });
  };

  const current = PLAY_STYLES[active];

  return (
    <section
      ref={sectionRef}
      aria-labelledby="play-styles-title"
      className="gs-pin relative"
      style={{ "--gs-count": COUNT, "--accent": current.accent } as CSSProperties}
    >
      <div className="gs-stage">
        <div className="container mx-auto px-4 md:px-6 h-full flex flex-col pt-24 pb-6 md:pb-10">
          <header className="flex items-end justify-between gap-4 mb-4 md:mb-8">
            <div>
              <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-gray-500">
                Select your mode
              </p>
              <h2 id="play-styles-title" className="text-2xl md:text-4xl font-black text-gold italic tracking-tighter">
                What I Play
              </h2>
            </div>
            <p className="gs-counter font-mono text-sm md:text-base text-gray-500" aria-hidden>
              <span style={{ color: current.accent }}>{pad(active + 1)}</span> / {pad(COUNT)}
            </p>
          </header>

          <div className="gs-scenes relative grow min-h-0">
            {PLAY_STYLES.map((style, i) => (
              <article
                key={style.id}
                className="gs-scene"
                data-state={i === active ? "active" : i < active ? "before" : "after"}
                style={{ "--accent": style.accent } as CSSProperties}
                aria-labelledby={`play-style-${style.id}`}
              >
                <div className="gs-art">
                  <SceneArt id={style.id} />
                </div>
                <div className="gs-copy">
                  <p className="text-xs md:text-sm font-bold uppercase tracking-[0.25em]" style={{ color: style.accent }}>
                    <span className="font-mono text-gray-500 mr-2" aria-hidden>
                      {pad(i + 1)}
                    </span>
                    {style.kicker}
                  </p>
                  <h3
                    id={`play-style-${style.id}`}
                    className="text-4xl md:text-6xl font-black italic tracking-tighter text-white pr-2"
                  >
                    {style.title}
                  </h3>
                  <p className="text-sm md:text-lg text-gray-300 leading-relaxed max-w-md">{style.blurb}</p>
                  <ul className="flex flex-wrap gap-2" aria-label="Favorite games">
                    {style.games.map((g) => (
                      <li
                        key={g}
                        className="rounded-full border px-3 py-1 text-[10px] md:text-xs font-bold uppercase tracking-widest text-white/80"
                        style={{ borderColor: `color-mix(in srgb, ${style.accent} 45%, transparent)` }}
                      >
                        {g}
                      </li>
                    ))}
                  </ul>
                  <p className="font-mono text-xs text-gray-500">
                    <span className="text-xl md:text-2xl font-black text-white">{style.hours}+</span> hrs logged
                  </p>
                </div>
              </article>
            ))}
          </div>

          <nav className="gs-progress mt-4 md:mt-8 flex items-center gap-4 pr-16 md:pr-20" aria-label="Play styles">
            <div className="gs-bar relative h-1 grow rounded-full bg-white/10 overflow-hidden" aria-hidden>
              <div className="gs-bar-fill absolute inset-y-0 left-0 rounded-full" />
            </div>
            <ol className="flex gap-2">
              {PLAY_STYLES.map((style, i) => (
                <li key={style.id}>
                  <button
                    type="button"
                    onClick={() => jumpTo(i)}
                    aria-label={`Show ${style.kicker}`}
                    aria-current={i === active ? "step" : undefined}
                    className={cn(
                      "h-3 w-3 rounded-full border-2 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-black",
                      i === active ? "w-8" : "opacity-50 hover:opacity-100",
                    )}
                    style={{
                      borderColor: style.accent,
                      background: i <= active ? style.accent : "transparent",
                    }}
                  />
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </div>
    </section>
  );
}
