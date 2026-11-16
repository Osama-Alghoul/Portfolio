"use client";

import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import { AnimatedSvgIcon } from "./animated-svg-icon";
import { cn } from "@/lib/utils";
import { usePlayerStore } from "@/lib/store";

export type ServiceIcon =
  | "design"
  | "responsive"
  | "usability"
  | "performance"
  | "interactive"
  | "integration"
  | "maintenance"
  | "ecommerce"
  | "maps";

interface ServiceCardProps {
  title: string;
  description: string;
  iconType: ServiceIcon;
  className?: string;
}

/** One cell of the hairline services grid. */
export function ServiceCard({ title, description, iconType, className }: ServiceCardProps) {
  const { collectedXP } = usePlayerStore();
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  const isCollected = hydrated && collectedXP.includes(`service_${iconType}`);

  return (
    <article className={cn("group relative h-full p-6 transition-colors hover:bg-hover", className)}>
      <div className="mb-5 flex items-center justify-between text-brand/70 transition-colors group-hover:text-brand">
        <AnimatedSvgIcon type={iconType} className="h-7 w-7" />
        {isCollected && <Check aria-label="Collected" className="h-3.5 w-3.5 text-dim" />}
      </div>
      <h3 className="text-[15px] font-medium leading-snug text-fg">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-dim">{description}</p>
    </article>
  );
}
