"use client";

import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import ProjectCard from "./project-card";
import type { ProjectCategory } from "@/lib/projects";
import { cn } from "@/lib/utils";

const arrow =
  "static translate-y-0 h-9 w-9 border-2 border-gold/60 bg-black text-gold hover:bg-gold hover:text-black disabled:border-white/10 disabled:text-white/20 disabled:opacity-100";

export default function ProjectCarousel({
  category,
}: {
  category: ProjectCategory;
}) {
  const [api, setApi] = useState<CarouselApi>();
  const [snaps, setSnaps] = useState(0);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    const update = () => {
      setSnaps(api.scrollSnapList().length);
      setCurrent(api.selectedScrollSnap());
    };
    update();
    api.on("select", update).on("reInit", update);
    return () => {
      api.off("select", update).off("reInit", update);
    };
  }, [api]);

  const scrollable = snaps > 1;
  const headingId = `projects-${category.name.toLowerCase().replace(/\W+/g, "-")}`;

  return (
    <Carousel
      setApi={setApi}
      opts={{ align: "start" }}
      aria-labelledby={headingId}
    >
      <div className="mb-2 flex items-end justify-between gap-4">
        <div>
          <h3
            id={headingId}
            className="text-xl font-black text-white uppercase italic tracking-tighter"
          >
            {category.name}
            <span className="ml-2 text-sm font-bold not-italic text-gray-500">
              {category.projects.length}
            </span>
          </h3>
          <p className="text-sm text-gray-400 mt-1">{category.description}</p>
        </div>
        {scrollable && (
          <div className="flex shrink-0 gap-2">
            <CarouselPrevious className={arrow} />
            <CarouselNext className={arrow} />
          </div>
        )}
      </div>

      {/* Vertical padding leaves room for the cards' glow and tilt inside the clipped track. */}
      <CarouselContent className="py-6">
        {category.projects.map((project) => (
          <CarouselItem
            key={project.id}
            className="basis-[88%] sm:basis-1/2 lg:basis-1/3"
          >
            <ProjectCard project={project} />
          </CarouselItem>
        ))}
      </CarouselContent>

      {scrollable && (
        <div className="flex justify-center gap-2">
          {Array.from({ length: snaps }, (_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => api?.scrollTo(i)}
              aria-label={`Go to slide ${i + 1} of ${snaps}`}
              aria-current={i === current}
              className={cn(
                "h-1.5 rounded-full transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-gold",
                i === current ? "w-6 bg-gold" : "w-1.5 bg-white/25 hover:bg-white/50",
              )}
            />
          ))}
        </div>
      )}
    </Carousel>
  );
}
