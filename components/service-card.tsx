"use client";

import { Card, CardContent } from "@/components/ui/card";
import { AnimatedSvgIcon } from "./animated-svg-icon";
import { cn } from "@/lib/utils";
import { usePlayerStore } from "@/lib/store";
import { Badge } from "./ui/badge";
import { Zap, CheckCircle2 } from "lucide-react";
import { XPNode } from "./xp-node";

interface ServiceCardProps {
  title: string;
  description: string;
  iconType:
    | "design"
    | "responsive"
    | "usability"
    | "performance"
    | "interactive"
    | "integration"
    | "maintenance"
    | "ecommerce"
    | "maps";
  className?: string;
  index: number;
}

export function ServiceCard({
  title,
  description,
  iconType,
  className,
  index,
}: ServiceCardProps) {
  const { collectedXP } = usePlayerStore();
  const nodeId = `service_${iconType}`;
  const isCollected = collectedXP.includes(nodeId);
  const manaCost = (index + 1) * 10;

  return (
    <Card
      className={cn(
        "bg-blue-950/20 border-2 border-blue-900/30 hover:border-gold/50 transition-all duration-500 group relative overflow-hidden h-full flex flex-col",
        isCollected && "border-gold/20 opacity-90",
        className
      )}
    >
      <div className="absolute top-0 right-0 p-3 flex gap-2">
        {isCollected && (
          <CheckCircle2 className="w-4 h-4 text-gold animate-in zoom-in" />
        )}
        <Badge
          variant="outline"
          className="text-[9px] bg-black/60 border-blue-500/30 text-blue-400 gap-1 uppercase font-black italic tracking-tighter"
        >
          <Zap className="w-2.5 h-2.5" /> {manaCost} MN
        </Badge>
      </div>

      <CardContent className="p-8 flex flex-col items-center text-center md:items-start md:text-left h-full flex-grow">
        <div className="mb-6 text-blue-400 group-hover:text-gold transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-3">
          <AnimatedSvgIcon type={iconType} />
        </div>
        <h3 className="text-xl font-black mb-3 text-gold uppercase italic tracking-tighter">
          {title}
        </h3>
        <p className="text-sm text-gray-400 mb-8 leading-relaxed font-medium line-clamp-3">
          {description}
        </p>

        <div className="mt-auto w-full">
          <XPNode id={nodeId} amount={15} onInteraction={() => {}}>
            <div
              className={cn(
                "w-full py-2.5 rounded-lg text-[10px] font-black uppercase tracking-[0.2em] transition-all text-center",
                isCollected
                  ? "bg-gold/10 text-gold border border-gold/30 cursor-default"
                  : "bg-blue-600/20 border border-blue-500/30 text-blue-400 hover:bg-gold hover:text-black hover:border-gold italic"
              )}
            >
              {isCollected
                ? "Paradigm Integrated"
                : "Initialize Ability (+15 XP)"}
            </div>
          </XPNode>
        </div>
      </CardContent>

      {/* Visual Glitch Decor */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </Card>
  );
}
