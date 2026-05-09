"use client";

import { usePlayerStore } from "@/lib/store";
import { Shield, Wand2, Sword, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface PlayerHUDProps {
  variant?: "fixed" | "inline";
}

export default function PlayerHUD({ variant = "fixed" }: PlayerHUDProps) {
  const { character } = usePlayerStore();

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
          getColorClass(character.id),
        )}
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {getIcon(character.id)}
            <span className="text-[10px] font-black text-white uppercase tracking-tighter truncate max-w-[80px]">
              {character.name}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 left-6 z-100 pointer-events-none fade-in hidden md:block">
      <div
        className={cn(
          "bg-linear-to-br to-black/80 p-4 rounded-xl border-2 shadow-2xl backdrop-blur-xl",
          getColorClass(character.id),
        )}
      >
        {getIcon(character.id)}
      </div>
    </div>
  );
}
