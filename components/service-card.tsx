"use client";

import { Card, CardContent } from "@/components/ui/card";
import { AnimatedSvgIcon } from "./animated-svg-icon";
import { cn } from "@/lib/utils";

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
}

export function ServiceCard({
  title,
  description,
  iconType,
  className,
}: ServiceCardProps) {
  return (
    <Card
      className={cn(
        "bg-blue-950/20 border-2 border-blue-900/30 hover:border-gold/50 transition-all duration-500 group relative overflow-hidden h-full flex flex-col",
        className,
      )}
    >
      <CardContent className="p-8 flex flex-col items-center text-center md:items-start md:text-left h-full grow">
        <div className="mb-6 text-blue-400 group-hover:text-gold transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-3">
          <AnimatedSvgIcon type={iconType} />
        </div>
        <h3 className="text-xl font-bold mb-3 text-gold tracking-tight">
          {title}
        </h3>
        <p className="text-sm text-gray-400 leading-relaxed font-medium line-clamp-3">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
