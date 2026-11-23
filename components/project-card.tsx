"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type PointerEvent } from "react";
import { Badge } from "@/components/ui/badge";
import { Cpu, ExternalLink, Github, PlayCircle, RotateCcw } from "lucide-react";
import ArchitectureDiagram from "./architecture-diagram";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { Project } from "@/lib/projects";
import { cn } from "@/lib/utils";

const btn =
  "inline-flex flex-1 items-center justify-center rounded-md h-10 px-3 text-[10px] font-bold uppercase tracking-wider border-2 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-black";

export default function ProjectCard({ project }: { project: Project }) {
  const [flipped, setFlipped] = useState(false);
  const tiltRef = useRef<HTMLDivElement>(null);
  const inspectRef = useRef<HTMLButtonElement>(null);
  const backRef = useRef<HTMLButtonElement>(null);
  const didMount = useRef(false);
  const descRef = useRef<HTMLParagraphElement>(null);
  const [isClamped, setIsClamped] = useState(false);

  // Offer "Read more" only when line-clamp actually cut the description off.
  useEffect(() => {
    const el = descRef.current;
    if (!el) return;
    const check = () => setIsClamped(el.scrollHeight > el.clientHeight + 1);
    check();
    const ro = new ResizeObserver(check);
    ro.observe(el);
    return () => ro.disconnect();
  }, [project.description]);

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

  const flip = () => setFlipped((f) => !f);

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

  const liveButton = project.live && (
    <a
      href={project.live}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        btn,
        "bg-gold border-gold text-black hover:bg-white hover:border-white",
      )}
    >
      <ExternalLink aria-hidden className="h-4 w-4 mr-2" />
      Live Site
    </a>
  );

  const codeButton = project.link && (
    <a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(btn, "border-gold/30 text-gold bg-gold/5 hover:bg-gold/10")}
    >
      <Github aria-hidden className="h-4 w-4 mr-2" />
      Source Code
    </a>
  );

  const videoButton = project.video && (
    <a
      href={project.video}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(btn, "border-gold/30 text-gold bg-gold/5 hover:bg-gold/10")}
    >
      <PlayCircle aria-hidden className="h-4 w-4 mr-2" />
      Watch Demo
    </a>
  );

  return (
    <div className="loot-card h-full">
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
            aria-label={project.title}
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
            </div>

            <div className="p-8 relative grow flex flex-col">
              <h3 className="loot-title text-2xl font-black mb-3 pr-2 tracking-tight">
                {project.title}
              </h3>
              <div className="relative mb-6">
                <p
                  ref={descRef}
                  className="text-sm text-gray-400 font-medium leading-relaxed line-clamp-3"
                >
                  {project.description}
                </p>
                {/* Covers the browser's own ellipsis with a gold, clickable one. */}
                {isClamped && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <button
                        type="button"
                        tabIndex={flipped ? -1 : 0}
                        aria-haspopup="dialog"
                        title="Read full description"
                        className="absolute bottom-0 right-0 bg-[#080d18] pl-1 pr-0.5 text-sm font-bold leading-relaxed text-gold shadow-[-14px_0_10px_#080d18] transition-transform hover:scale-125 focus:outline-none focus-visible:scale-125 focus-visible:underline"
                      >
                        <span aria-hidden>more</span>
                        <span className="sr-only">
                          Read the full description of {project.title}
                        </span>
                      </button>
                    </DialogTrigger>
                    <DialogContent className="loot-card max-w-2xl max-h-[90vh] overflow-y-auto gap-0 p-0 border-2 border-[hsl(var(--card-accent)/0.5)] bg-[#070b14] text-white sm:rounded-xl [&>button:last-child]:rounded-full [&>button:last-child]:bg-black/70 [&>button:last-child]:p-1.5 [&>button:last-child]:text-white [&>button:last-child]:opacity-100">
                      <div className="aspect-video relative shrink-0">
                        <Image
                          src={project.image || "/placeholder.svg"}
                          alt={`Screenshot of ${project.title}`}
                          fill
                          sizes="(min-width: 672px) 672px, 100vw"
                          className="object-cover object-top"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-[#070b14] via-transparent to-transparent" />
                      </div>

                      <div className="p-6 sm:p-8 space-y-5">
                        <DialogTitle className="loot-title text-2xl sm:text-3xl font-black tracking-tight">
                          {project.title}
                        </DialogTitle>
                        <DialogDescription className="text-sm sm:text-base text-gray-300 leading-relaxed">
                          {project.description}
                        </DialogDescription>

                        {project.stats && (
                          <dl className="grid grid-cols-2 gap-2">
                            {project.stats.map((s) => (
                              <div
                                key={s.label}
                                className="rounded-md border border-white/10 bg-white/[0.03] px-3 py-2"
                              >
                                <dt className="text-[9px] uppercase tracking-widest text-gray-500">
                                  {s.label}
                                </dt>
                                <dd className="loot-title text-sm font-black">
                                  {s.value}
                                </dd>
                              </div>
                            ))}
                          </dl>
                        )}

                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="bg-white/5 border border-white/10 text-white/60 text-[9px] font-bold uppercase tracking-widest px-2 py-0.5"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 pt-2">
                          {codeButton}
                          {videoButton}
                          {liveButton}
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
              </div>

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
                      "w-full border-white/15 text-white/70 hover:border-gold/60 hover:text-gold bg-white/[0.03] cursor-pointer",
                    )}
                  >
                    <Cpu aria-hidden className="h-7 w-4 mr-2" />
                    View Architecture
                  </button>
                )}
                <div className="flex gap-3">
                  {codeButton}
                  {videoButton}
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
              aria-label={`${project.title} architecture`}
            >
              <div className="loot-shine" aria-hidden />
              <header className="flex items-start justify-between gap-3 mb-4">
                <div className="min-w-0">
                  <h3 className="loot-title text-xl font-black pr-2 tracking-tight truncate">
                    {project.title}
                  </h3>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500">
                    Architecture
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
