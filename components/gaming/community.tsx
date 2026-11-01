"use client";

import { useState } from "react";
import { Check, Copy, Headphones, Volume2 } from "lucide-react";
import { DISCORD_SERVER_NAME, DISCORD_URL, STEAM_URL } from "@/lib/gaming";
import { usePlayerStore } from "@/lib/store";
import { DiscordIcon, SteamIcon } from "@/components/brand-icons";

const lobby = [
  { id: "host", name: "OsssGhoul", tag: "host", speaking: true },
  { id: "mate-1", name: "squadmate", tag: "in game", speaking: false },
  { id: "mate-2", name: "squadmate", tag: "AFK, brb", speaking: false },
];

export default function Community() {
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">("idle");
  const addXP = usePlayerStore((s) => s.addXP);

  const copyInvite = async () => {
    try {
      await navigator.clipboard.writeText(DISCORD_URL);
      setCopyState("copied");
      setTimeout(() => setCopyState("idle"), 2000);
    } catch {
      setCopyState("failed");
    }
  };

  return (
    <section aria-labelledby="community-title" className="py-20 md:py-28 bg-black">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center rounded-2xl border border-[#5865F2]/30 bg-linear-to-br from-[#5865F2]/10 via-blue-950/20 to-black p-6 md:p-10">
          <div className="space-y-5">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#8b95f9]">Party up</p>
            <h2 id="community-title" className="text-3xl md:text-5xl font-black italic tracking-tighter text-gold pr-2">
              Join {DISCORD_SERVER_NAME}
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              No schedules, no events, no grind. Just a crew of gaming mates who jump into voice and play
              together. If you&apos;re down for a few rounds, come say hi.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href={DISCORD_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => addXP("gaming_discord", 25)}
                className="inline-flex items-center justify-center gap-2 rounded-md bg-[#5865F2] px-5 h-12 font-bold text-white hover:bg-[#4752c4] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                <DiscordIcon className="h-5 w-5" />
                Join the Discord
              </a>
              <a
                href={STEAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => addXP("gaming_steam", 15)}
                className="inline-flex items-center justify-center gap-2 rounded-md border border-[#66c0f4]/50 bg-[#171a21] px-5 h-12 font-bold text-[#c7d5e0] hover:border-[#66c0f4] hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#66c0f4] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                <SteamIcon className="h-5 w-5" />
                Add me on Steam
              </a>
            </div>
            <button
              type="button"
              onClick={copyInvite}
              className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors focus:outline-none focus-visible:underline"
            >
              {copyState === "copied" ? (
                <Check aria-hidden className="h-4 w-4 text-green-400" />
              ) : (
                <Copy aria-hidden className="h-4 w-4" />
              )}
              <span aria-live="polite">
                {copyState === "copied"
                  ? "Invite copied!"
                  : copyState === "failed"
                    ? DISCORD_URL
                    : "Copy invite link"}
              </span>
            </button>
          </div>

          {/* Voice lobby mock */}
          <div aria-hidden className="rounded-xl border border-white/10 bg-[#111214] shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-[#1a1b1e]">
              <span className="font-black text-white tracking-tight">{DISCORD_SERVER_NAME}</span>
              <span className="flex items-center gap-1.5 text-xs text-green-400">
                <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" /> online
              </span>
            </div>
            <div className="p-4 space-y-1">
              <p className="flex items-center gap-2 text-sm font-semibold text-gray-300 px-2 py-1.5">
                <Volume2 className="h-4 w-4 text-gray-500" /> Lobby
              </p>
              {lobby.map((m) => (
                <div key={m.id} className="flex items-center gap-3 rounded-md px-2 py-2 ml-4 hover:bg-white/5">
                  <span
                    className={
                      "relative h-8 w-8 rounded-full bg-linear-to-br from-[#5865F2] to-purple-500 grid place-items-center text-xs font-black text-white " +
                      (m.speaking ? "gs-speaking" : "")
                    }
                  >
                    {m.name[0].toUpperCase()}
                  </span>
                  <span className="text-sm text-gray-200 font-medium">{m.name}</span>
                  <span className="ml-auto text-[10px] uppercase tracking-widest text-gray-500">{m.tag}</span>
                </div>
              ))}
              <div className="flex items-center gap-3 rounded-md px-2 py-2 ml-4 border border-dashed border-gold/40 mt-2">
                <span className="h-8 w-8 rounded-full border-2 border-dashed border-gold/60 grid place-items-center">
                  <Headphones className="h-4 w-4 text-gold" />
                </span>
                <span className="text-sm text-gold font-bold">Your seat is open</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
