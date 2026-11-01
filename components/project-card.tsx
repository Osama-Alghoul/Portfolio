"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type PointerEvent } from "react";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  Cpu,
  ExternalLink,
  Gem,
  Github,
  RotateCcw,
} from "lucide-react";
import ArchitectureDiagram from "./architecture-diagram";
import { usePlayerStore } from "@/lib/store";
import { RARITY_LABEL, type Project } from "@/lib/projects";
import { cn } from "@/lib/utils";

const XP = { live: 25, code: 15, inspect: 10 };

const btn =
  "inline-flex flex-1 items-center justify-center rounded-md h-10 px-3 text-[10px] font-black uppercase tracking-widest italic border-2 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-black";

export default function ProjectCard({ project }: { project: Project }) {
  const { collectedXP, addXP } = usePlayerStore();
  const [flipped, setFlipped] = useState(false);
  const tiltRef = useRef<HTMLDivElement>(null);
  const inspectRef = useRef<HTMLButtonElement>(null);
  const backRef = useRef<HTMLButtonElement>(null);
  const didMount = useRef(false);

  const ids = {
    code: `project_${project.id}_code`,
    live: `project_${project.id}_live`,
    inspect: `project_${project.id}_inspect`,
  };
  const isLiveCollected = collectedXP.includes(ids.live);
  const isFullyCollected =
    isLiveCollected &&
    collectedXP.includes(ids.inspect) &&
    (!project.link || collectedXP.includes(ids.code));

  // Move focus to the face that just turned toward the viewer.
  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      return;
    }
    const t = setTimeout(
      () => (flipped ? backRef : inspectRef).current?.focus(),
      50,
    );
    return () => clearTimeout(t);
  }, [flipped]);

  const flip = () => {
    if (!flipped) addXP(ids.inspect, XP.inspect);
    setFlipped((f) => !f);
  };

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || !tiltRef.current) return;
    const r = tiltRef.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    const s = tiltRef.current.style;
    s.setProperty("--ry", `${(x - 0.5) * 10}deg`);
    s.setProperty("--rx", `${(0.5 - y) * 10}deg`);
    s.setProperty("--mx", `${x * 100}%`);
    s.setProperty("--my", `${y * 100}%`);
  };

  const onPointerLeave = () => {
    const s = tiltRef.current?.style;
    if (!s) return;
    s.setProperty("--rx", "0deg");
    s.setProperty("--ry", "0deg");
  };

  const rarityLabel = RARITY_LABEL[project.rarity];

  const liveButton = (
    <a
      href={project.live}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => addXP(ids.live, XP.live)}
      className={cn(
        btn,
        isLiveCollected
          ? "border-gold text-gold bg-gold/10"
          : "bg-gold/90 border-gold text-blue-400 hover:bg-white hover:border-white",
      )}
    >
      <ExternalLink aria-hidden className="h-4 w-4 mr-2" />
      Enter Realm
    </a>
  );

  return (
    <div className="loot-card h-full" data-rarity={project.rarity}>
      <div
        ref={tiltRef}
        className="loot-tilt h-full"
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
      >
        <div className="loot-flip h-full" data-flipped={flipped}>
          {/* ---------- Front ---------- */}
          <article
            className="loot-face group flex flex-col"
            aria-hidden={flipped}
            aria-label={`${project.title}, ${rarityLabel} project`}
          >
            <div className="loot-shine" aria-hidden />
            <div className="aspect-video relative overflow-hidden shrink-0 rounded-t-[10px]">
              <Image
                src={project.image || "/placeholder.svg"}
                alt={`Screenshot of ${project.title}`}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                className="object-cover object-top group-hover:scale-110 transition-transform duration-[1.5s] ease-out"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent opacity-80" />
              <span className="loot-badge absolute top-3 left-3">
                <Gem aria-hidden className="h-3 w-3" />
                {rarityLabel}
              </span>
              {isFullyCollected && (
                <span className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-black/70 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-gold">
                  <CheckCircle2 aria-hidden className="h-3 w-3" /> Looted
                </span>
              )}
            </div>

            <div className="p-8 relative grow flex flex-col">
              <h3 className="loot-title text-2xl font-black mb-3 pr-2 uppercase italic tracking-tighter">
                {project.title}
              </h3>
              <p className="text-sm text-gray-400 mb-6 font-medium leading-relaxed line-clamp-3">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {project.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="bg-white/5 border border-white/10 text-white/50 text-[9px] font-bold uppercase tracking-widest px-2 py-0.5"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="mt-auto flex flex-col gap-3">
                {project.architecture && (
                  <button
                    ref={inspectRef}
                    type="button"
                    onClick={flip}
                    tabIndex={flipped ? -1 : 0}
                    className={cn(
                      btn,
                      "w-full border-white/15 text-white/70 hover:border-gold/60 hover:text-gold bg-white/[0.03]",
                    )}
                  >
                    <Cpu aria-hidden className="h-7 w-4 mr-2" />
                    Inspect Build
                  </button>
                )}
                <div className="flex gap-3">
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => addXP(ids.code, XP.code)}
                      className={cn(
                        btn,
                        "border-gold/30 text-gold bg-gold/5 hover:bg-gold/10",
                      )}
                    >
                      <Github aria-hidden className="h-4 w-4 mr-2" />
                      Examine Code
                    </a>
                  )}
                  {liveButton}
                </div>
              </div>
            </div>
          </article>

          {/* ---------- Back ---------- */}
          {project.architecture && (
            <article
              className="loot-face loot-face-back flex flex-col p-6"
              aria-hidden={!flipped}
              aria-label={`${project.title} build schematic`}
            >
              <div className="loot-shine" aria-hidden />
              <header className="flex items-start justify-between gap-3 mb-4">
                <div className="min-w-0">
                  <span className="loot-badge mb-2">
                    <Gem aria-hidden className="h-3 w-3" />
                    {rarityLabel}
                  </span>
                  <h3 className="loot-title text-xl font-black pr-2 uppercase italic tracking-tighter truncate">
                    {project.title}
                  </h3>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500">
                    Build schematic
                  </p>
                </div>
              </header>

              {project.stats && (
                <dl className="grid grid-cols-2 gap-2 mb-4">
                  {project.stats.map((s) => (
                    <div
                      key={s.label}
                      className="rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1.5"
                    >
                      <dt className="text-[9px] uppercase tracking-widest text-gray-500">
                        {s.label}
                      </dt>
                      <dd className="loot-title text-sm font-black truncate pr-1">
                        {s.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              )}

              <ArchitectureDiagram architecture={project.architecture} />

              <div className="mt-auto pt-5 flex gap-3">
                <button
                  ref={backRef}
                  type="button"
                  onClick={flip}
                  tabIndex={flipped ? 0 : -1}
                  className={cn(
                    btn,
                    "border-white/15 text-white/70 hover:border-gold/60 hover:text-gold",
                  )}
                >
                  <RotateCcw aria-hidden className="h-4 w-4 mr-2" />
                  Back
                </button>
                {liveButton}
              </div>
            </article>
          )}
        </div>
      </div>
    </div>
  );
}
