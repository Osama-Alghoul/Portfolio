"use client";

import { usePlayerStore } from "@/lib/store";
import { Shield, Wand2, Sword, User, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

interface PlayerHUDProps {
  variant?: "fixed" | "inline";
}

export default function PlayerHUD({ variant = "fixed" }: PlayerHUDProps) {
  const { xp, level, character } = usePlayerStore();

  // Calculate XP within the current level (0-100)
  const xpCurrentLevel = xp % 100;

  const getIcon = (id?: string) => {
    switch (id) {
      case "mage":
        return <Wand2 className="w-4 h-4 text-purple-400" />;
      case "warrior":
        return <Shield className="w-4 h-4 text-red-400" />;
      case "rogue":
        return <Sword className="w-4 h-4 text-emerald-400" />;
      default:
        return <User className="w-4 h-4 text-blue-400" />;
    }
  };

  const getColorClass = (id?: string) => {
    switch (id) {
      case "mage":
        return "from-purple-900/40 border-purple-500/30";
      case "warrior":
        return "from-red-900/40 border-red-500/30";
      case "rogue":
        return "from-emerald-900/40 border-emerald-500/30";
      default:
        return "from-blue-900/40 border-blue-500/30";
    }
  };

  // Hidden if no character selected
  if (!character) return null;

  if (variant === "inline") {
    return (
      <div
        className={cn(
          "flex flex-col gap-1 p-2 rounded-lg border bg-black/40 backdrop-blur-sm min-w-[150px]",
          getColorClass(character.id)
        )}
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {getIcon(character.id)}
            <span className="text-[10px] font-black text-white uppercase tracking-tighter truncate max-w-[80px]">
              {character.name}
            </span>
          </div>
          <span className="text-[10px] font-bold text-gold px-1 py-0.5 bg-black/60 border border-gold/30 rounded">
            L{level}
          </span>
        </div>
        <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 via-gold to-gold transition-all duration-700"
            style={{ width: `${xpCurrentLevel}%` }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-[100] pointer-events-none fade-in hidden md:block">
      <div
        className={cn(
          "bg-gradient-to-br to-black/80 p-4 rounded-xl border-2 shadow-2xl backdrop-blur-xl min-w-[240px] pointer-events-auto",
          getColorClass(character.id)
        )}
      >
        <div className="flex items-center gap-4 mb-3">
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-black text-white uppercase tracking-tighter antialiased">
                {character.name}
              </h4>
              <span className="text-[10px] font-bold text-gold px-1.5 py-0.5 bg-black/60 border border-gold/30 rounded">
                LVL {level}
              </span>
            </div>
            <p className="text-[9px] text-white/50 uppercase tracking-widest mt-0.5">
              Software Engineer
            </p>
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between text-[10px] items-center">
            <span className="text-white/60 font-medium tracking-tight">
              Experience Progress
            </span>
            <span className="text-white/80 font-mono tracking-tighter">
              {xpCurrentLevel} <span className="text-white/30">/ 100</span>
            </span>
          </div>
          <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/10 p-[1px]">
            <div
              className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-gold transition-all duration-700 ease-out rounded-full shadow-[0_0_10px_rgba(255,215,0,0.3)]"
              style={{ width: `${xpCurrentLevel}%` }}
            />
          </div>
        </div>

        <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-[9px] text-white/40 uppercase tracking-tighter">
          <div className="flex items-center gap-1">
            <Trophy className="w-3 h-3 text-gold" />
            <span>Rank: Novice</span>
          </div>
          <span>Total XP: {xp}</span>
        </div>
      </div>
    </div>
  );
}
