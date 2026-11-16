"use client";

import { useEffect, useState } from "react";
import { usePlayerStore } from "@/lib/store";
import { Shield, Wand2, Sword, User } from "lucide-react";

interface PlayerHUDProps {
  variant?: "fixed" | "inline";
}

const ICONS = { mage: Wand2, warrior: Sword, rogue: Shield } as const;
const XP_PER_LEVEL = 100;

export default function PlayerHUD({ variant = "fixed" }: PlayerHUDProps) {
  const { character, xp, level } = usePlayerStore();
  // Persisted store: render nothing until the client has hydrated it.
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);

  if (!hydrated || !character) return null;

  const Icon = ICONS[character.id as keyof typeof ICONS] ?? User;
  const progress = (xp % XP_PER_LEVEL) / XP_PER_LEVEL;

  const body = (
    <>
      <div className="flex items-center gap-2">
        <span className="flex h-6 w-6 items-center justify-center rounded-md border border-brand/40 bg-brand/10">
          <Icon aria-hidden className="h-3.5 w-3.5 text-brand" />
        </span>
        <div className="min-w-0 leading-tight">
          <p className="truncate text-[11px] font-medium text-fg">{character.name}</p>
          <p className="font-mono text-[10px] text-faint">
            LV {level} · {xp} XP
          </p>
        </div>
      </div>
      <div
        className="mt-2 h-1 w-full overflow-hidden rounded-full bg-white/10"
        role="progressbar"
        aria-label="Progress to next level"
        aria-valuemin={0}
        aria-valuemax={XP_PER_LEVEL}
        aria-valuenow={xp % XP_PER_LEVEL}
      >
        <div className="h-full rounded-full bg-linear-to-r from-brand to-[var(--brand-2)] transition-[width] duration-500" style={{ width: `${progress * 100}%` }} />
      </div>
    </>
  );

  if (variant === "inline") {
    return <div className="min-w-[150px] rounded-lg border border-line bg-surface p-2">{body}</div>;
  }

  return (
    <div className="fade-in pointer-events-none fixed bottom-4 left-4 z-40 hidden md:block">
      <div className="w-48 rounded-xl border border-brand/25 bg-ink/85 p-3 shadow-[0_0_30px_-12px_var(--brand)] backdrop-blur-md">{body}</div>
    </div>
  );
}
