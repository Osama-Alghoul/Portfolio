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
  "inline-flex flex-1 items-center justify-center rounded-md h-9 px-3 font-mono text-[11px] uppercase tracking-wider border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/60 focus-visible:ring-offset-2 focus-visible:ring-offset-ink";

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
          ? "border-brand/50 text-brand bg-brand/10"
          : "bg-brand border-brand text-ink hover:bg-brand/85",
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
                sizes="(min-width: 768px) 24rem, 100vw"
                className="object-cover object-top group-hover:scale-110 transition-transform duration-[1.5s] ease-out"
              />
              <div className="absolute inset-0 bg-linear-to-t from-surface via-surface/30 to-transparent opacity-90" />
              <span className="loot-badge absolute top-3 left-3">
                <Gem aria-hidden className="h-3 w-3" />
                {rarityLabel}
              </span>
              {isFullyCollected && (
                <span className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-ink/80 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-fg">
                  <CheckCircle2 aria-hidden className="h-3 w-3" /> Looted
                </span>
              )}
            </div>

            <div className="p-6 relative grow flex flex-col">
              <h3 className="loot-title font-serif text-3xl italic mb-2 pr-2 tracking-tight">
                {project.title}
              </h3>
              <p className="text-sm text-dim mb-5 leading-relaxed line-clamp-3">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-6">
                {project.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="rounded border border-line bg-chip text-faint font-mono text-[10px] font-normal px-1.5 py-0.5 hover:bg-chip"
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
                      "w-full border-line bg-chip text-dim hover:border-white/20 hover:text-fg",
                    )}
                  >
                    <Cpu aria-hidden className="h-4 w-4 mr-2" />
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
                        "border-line bg-chip text-dim hover:border-white/20 hover:text-fg",
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
                  <h3 className="loot-title font-serif text-2xl italic pr-2 tracking-tight truncate">
                    {project.title}
                  </h3>
                  <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-faint">
                    Build schematic
                  </p>
                </div>
              </header>

              {project.stats && (
                <dl className="grid grid-cols-2 gap-2 mb-4">
                  {project.stats.map((s) => (
                    <div
                      key={s.label}
                      className="rounded-md border border-line bg-chip px-2.5 py-1.5"
                    >
                      <dt className="font-mono text-[10px] uppercase tracking-wider text-faint">
                        {s.label}
                      </dt>
                      <dd className="loot-title text-sm font-medium truncate pr-1">
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
                    "border-line bg-chip text-dim hover:border-white/20 hover:text-fg",
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
