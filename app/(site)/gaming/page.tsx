import type { Metadata } from "next";
import { ChevronDown } from "lucide-react";
import { CustomButton } from "@/components/custom-button";
import BattleStation from "@/components/gaming/battle-station";
import PlayStyles from "@/components/gaming/play-styles";
import Community from "@/components/gaming/community";
import "./gaming.css";

export const metadata: Metadata = {
  title: "Gaming | Osama Alghoul (OsssGhoul)",
  description:
    "Off-duty mode: the co-op shooters, competitive FPS, story-driven and open-world games Osama Alghoul plays, plus his Section Zero gaming crew on Discord.",
  alternates: { canonical: "/gaming" },
  openGraph: {
    type: "website",
    url: "/gaming",
    siteName: "Osama Alghoul - Portfolio",
    title: "Gaming | Osama Alghoul (OsssGhoul)",
    description:
      "Off-duty mode: the co-op shooters, competitive FPS, story-driven and open-world games Osama Alghoul plays, plus his Section Zero gaming crew on Discord.",
    locale: "en_US",
  },
};

export default function GamingPage() {
  return (
    <main className="flex min-h-screen flex-col bg-ink">
      {/* Hero */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-brand/15 via-[var(--brand-2)]/5 to-ink" aria-hidden />
        <div className="container relative mx-auto px-4 md:px-6 flex flex-col items-center text-center gap-5">
          <p className="rounded-full border border-brand/40 px-3 py-1 text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-brand">
            Off-duty mode
          </p>
          <h1 className="text-6xl md:text-8xl font-serif italic tracking-tight pr-3 bg-linear-to-r from-brand to-[var(--brand-2)] bg-clip-text text-transparent">Gaming</h1>
          <p className="max-w-xl text-lg md:text-xl text-dim">
            Where I recharge, team up with friends, and quietly pick up ideas for the things I build.
          </p>
        </div>
      </section>

      {/* Why I Game */}
      <section aria-labelledby="why-title" className="pb-20 md:pb-28">
        <div className="container mx-auto px-4 md:px-6">
          <div className="overflow-hidden rounded-2xl border border-line bg-surface">
            <div className="relative h-64 md:h-96">
              <BattleStation className="absolute inset-0 h-full w-full" />
              <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/20 to-transparent" aria-hidden />
              <div className="absolute bottom-6 left-6 md:bottom-8 md:left-10">
                <span className="inline-block rounded-md bg-brand px-2 py-0.5 font-mono text-[11px] uppercase tracking-wider text-ink mb-2">
                  Gaming Passion
                </span>
                <h2 id="why-title" className="text-3xl md:text-5xl font-serif text-fg italic tracking-tight pr-2">
                  Why I Game
                </h2>
              </div>
            </div>
            <div className="grid md:grid-cols-[1fr_auto] gap-8 p-6 md:p-10">
              <div className="max-w-3xl space-y-4 text-lg text-dim leading-relaxed">
                <p>
                  Gaming is how I unplug, and how I stay connected. From story-driven worlds to chaotic co-op
                  nights and tense ranked matches, it&apos;s where I&apos;ve made some of my best friends.
                </p>
                <p>
                  It also sharpened how I build software: read the map, communicate with the squad, adapt when
                  the plan breaks. Good games and good products share the same secret: clear feedback and a
                  loop that keeps you coming back.
                </p>
              </div>
              <a
                href="#play-styles-title"
                className="self-end inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-fg hover:text-brand transition-colors"
              >
                What I play <ChevronDown aria-hidden className="h-4 w-4 animate-bounce" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <PlayStyles />

      <Community />

      <div className="pb-20 text-center">
        <CustomButton href="/">Back to Home</CustomButton>
      </div>
    </main>
  );
}
