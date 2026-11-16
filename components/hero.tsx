"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowUpRight, Mail, Shield, Sword, Wand2 } from "lucide-react";
import { CustomButton } from "./custom-button";
import ElectronicBackground from "./electronic-background";
import { usePlayerStore, type Character } from "@/lib/store";
import { cn } from "@/lib/utils";

const EMAIL = "osamalghoul2@gmail.com";

/** Each class re-themes the site (colors live in app/globals.css under :root[data-theme]). */
const CLASSES: (Character & { icon: typeof Wand2; theme: string; swatch: string })[] = [
  { id: "mage", name: "Mage Architect", avatar: "/Me.png", icon: Wand2, theme: "Arcane violet", swatch: "#a78bfa" },
  { id: "warrior", name: "Warrior Coder", avatar: "/Me.png", icon: Sword, theme: "Crimson forge", swatch: "#f87171" },
  { id: "rogue", name: "Shadow Dev", avatar: "/Me.png", icon: Shield, theme: "Venom green", swatch: "#34d399" },
];

export default function Hero() {
  const { setCharacter, clearCharacter, addXP, character } = usePlayerStore();
  // The store is persisted in localStorage, so wait for the client before showing saved state.
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  const picked = hydrated ? CLASSES.find((c) => c.id === character?.id) : undefined;

  const toggle = ({ id, name, avatar }: Character) => {
    if (picked?.id === id) return clearCharacter();
    setCharacter({ id, name, avatar });
    addXP(`char_select_${id}`, 50);
  };

  return (
    <section id="top" className="relative overflow-hidden px-5 pb-8 pt-28 sm:px-10 sm:pt-32">
      <ElectronicBackground className="[mask-image:linear-gradient(to_bottom,#000_30%,transparent)]" />

      <div className="relative z-10">
        <div className="flex items-center gap-4">
          <div className="relative shrink-0">
            <div className="rounded-2xl bg-linear-to-br from-brand to-[var(--brand-2)] p-px shadow-[0_0_40px_-12px_var(--brand)]">
              <Image
                src="/Me.png"
                alt="Osama Alghoul"
                width={88}
                height={88}
                priority
                className="h-20 w-20 rounded-2xl bg-ink object-cover sm:h-22 sm:w-22"
              />
            </div>
            <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-ink">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </span>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 font-mono text-[11px] text-emerald-300">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60 motion-reduce:hidden" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            Available for freelance
          </div>
        </div>

        <h1 className="mt-8 font-serif text-6xl leading-[0.95] tracking-tight text-fg sm:text-7xl">
          Osama{" "}
          <span className="bg-linear-to-r from-brand to-[var(--brand-2)] bg-clip-text pe-1 italic text-transparent">
            Alghoul
          </span>
        </h1>
        <p className="mt-4 font-mono text-xs uppercase tracking-[0.14em] text-faint">
          <span className="text-brand">@OsssGhoul</span> · Software Engineer &amp; Web Developer · Palestine
        </p>

        <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-dim">
          I build, lead and integrate <span className="text-fg">AI services</span> into scalable systems on a
          strong infrastructure. I care about solid architecture, clean and maintainable code, and fast products
          built with <span className="text-fg">React, Next.js and TypeScript</span>. Gamer when I&apos;m off duty.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <CustomButton href={`mailto:${EMAIL}`} className="h-10 px-5">
            <Mail aria-hidden className="h-4 w-4" />
            Hire me
          </CustomButton>
          <CustomButton href="#projects" variant="outline" className="h-10 px-5">
            View projects
            <ArrowUpRight aria-hidden className="h-4 w-4" />
          </CustomButton>
        </div>

        {/* Gaming layer: picking a class grants +50 XP and re-themes the whole site. */}
        <div className="mt-10 rounded-xl border border-dashed border-brand/30 bg-brand/[0.04] p-3 sm:p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-faint" aria-live="polite">
              {picked ? (
                <>
                  <span className="text-brand">{picked.name}</span> · {picked.theme} theme
                </>
              ) : (
                <>
                  Choose your class · <span className="text-brand">+50 XP</span> · new theme
                </>
              )}
            </p>
            <div className="flex gap-2" role="group" aria-label="Choose your class and site theme">
              {CLASSES.map((c) => {
                const Icon = c.icon;
                const active = picked?.id === c.id;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => toggle(c)}
                    aria-pressed={active}
                    title={active ? `${c.name}: click to return to the default theme` : `${c.name}: ${c.theme} theme`}
                    className={cn(
                      "group/c inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 font-mono text-[11px] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/60",
                      active
                        ? "border-brand/60 bg-brand/15 text-fg"
                        : "border-line bg-chip text-dim hover:border-white/20 hover:text-fg",
                    )}
                  >
                    <Icon aria-hidden className="h-3.5 w-3.5" style={{ color: c.swatch }} />
                    {c.id}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
