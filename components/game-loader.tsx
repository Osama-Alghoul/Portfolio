"use client";

import React, { useEffect, useState } from "react";
import { Progress } from "./ui/progress";
import {
  Shield,
  Wand2,
  Sword,
  Loader2,
  Cpu,
  Database,
  Network,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function GameLoader() {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [status, setStatus] = useState("Initializing Core...");

  useEffect(() => {
    const statuses = [
      "Synchronizing Neural Links...",
      "Allocating Mana Channels...",
      "Hardening System Shields...",
      "Decrypting Portfolio Dossiers...",
      "Establishing Secure Grid...",
      "Finalizing Paradigms...",
    ];

    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.random() * 15;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        setTimeout(() => setIsDone(true), 500);
      }
      setProgress(currentProgress);

      const statusIndex = Math.floor((currentProgress / 100) * statuses.length);
      if (statusIndex < statuses.length) {
        setStatus(statuses[statusIndex]);
      }
    }, 200);

    return () => clearInterval(interval);
  }, []);

  if (isDone) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center p-6 transition-all duration-1000">
      <div className="max-w-md w-full space-y-12">
        {/* Animated Icon Grid */}
        <div className="flex justify-center gap-8 relative">
          <div className="absolute inset-0 blur-3xl bg-blue-500/10 rounded-full animate-pulse" />
          <Wand2
            className={cn(
              "w-10 h-10 text-purple-500 transition-all duration-500",
              progress > 20 ? "opacity-100 scale-100" : "opacity-0 scale-50"
            )}
          />
          <Shield
            className={cn(
              "w-10 h-10 text-red-500 transition-all duration-500",
              progress > 50 ? "opacity-100 scale-100" : "opacity-0 scale-50"
            )}
          />
          <Sword
            className={cn(
              "w-10 h-10 text-emerald-500 transition-all duration-500",
              progress > 80 ? "opacity-100 scale-100" : "opacity-0 scale-50"
            )}
          />
        </div>

        {/* Brand/System Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-black text-white italic tracking-tighter uppercase antialiased">
            Grid <span className="text-gold">OS</span>
          </h1>
          <div className="flex items-center justify-center gap-2 text-[10px] text-blue-400 font-mono tracking-[0.3em] uppercase opacity-70">
            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-ping" />
            v3.0.4 - Secure Connection
          </div>
        </div>

        {/* Progress System */}
        <div className="space-y-4">
          <div className="flex justify-between items-end">
            <div className="space-y-1">
              <p className="text-[10px] text-white/40 uppercase tracking-widest font-black italic">
                System Message
              </p>
              <p className="text-sm text-blue-400 font-mono italic animate-pulse">
                {status}
              </p>
            </div>
            <span className="text-2xl font-black text-white italic font-mono tracking-tighter">
              {Math.floor(progress)}
              <span className="text-gold opacity-50">%</span>
            </span>
          </div>

          <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/10 p-[1px] relative">
            <div
              className="h-full bg-gradient-to-r from-blue-600 via-purple-600 to-gold transition-all duration-300 ease-out rounded-full shadow-[0_0_15px_rgba(255,215,0,0.3)]"
              style={{ width: `${progress}%` }}
            />
            {/* Scanned line effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent w-20 transform -translate-x-full animate-[shimmer_2s_infinite]" />
          </div>
        </div>

        {/* Footer Details */}
        <div className="grid grid-cols-3 gap-4 pt-10 opacity-30">
          <div className="flex flex-col items-center gap-2">
            <Cpu className="w-4 h-4 text-white" />
            <span className="text-[8px] uppercase tracking-widest text-white font-bold italic">
              Compute
            </span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Database className="w-4 h-4 text-white" />
            <span className="text-[8px] uppercase tracking-widest text-white font-bold italic">
              Database
            </span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Network className="w-4 h-4 text-white" />
            <span className="text-[8px] uppercase tracking-widest text-white font-bold italic">
              Network
            </span>
          </div>
        </div>
      </div>

      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>
    </div>
  );
}
