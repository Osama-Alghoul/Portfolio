"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github } from "lucide-react";
import { CustomButton } from "./custom-button";
import { usePlayerStore } from "@/lib/store";
import { cn } from "@/lib/utils";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link?: string;
  live: string;
}

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const { collectedXP } = usePlayerStore();

  const codeNodeId = `project_${project.id}_code`;
  const liveNodeId = `project_${project.id}_live`;

  const isCodeCollected = collectedXP.includes(codeNodeId);
  const isLiveCollected = collectedXP.includes(liveNodeId);
  const isFullyCollected = isCodeCollected && isLiveCollected;

  return (
    <Card
      className={cn(
        "overflow-hidden bg-blue-950/20 border-2 border-blue-900/30 hover:border-gold/50 transition-all duration-700 group relative flex flex-col h-full shadow-2xl",
        isFullyCollected && "border-gold/30",
      )}
    >
      <div className="aspect-video relative overflow-hidden shrink-0">
        <Image
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-[1.5s] ease-out"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent opacity-80" />
      </div>

      <CardContent className="p-8 relative grow flex flex-col">
        <h3 className="text-2xl font-black mb-3 text-gold group-hover:text-white transition-colors uppercase italic tracking-tighter">
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

        <div className="mt-auto flex gap-3 items-center">
          {project.link && (
            <CustomButton
              href={project.link}
              external
              variant="outline"
              className="w-full text-[10px] h-10 font-black uppercase tracking-widest italic border-2 transition-all border-gold/30 text-gold bg-gold/5"
            >
              <Github className="h-4 w-4 mr-2" />
              <span>Examine Code</span>
            </CustomButton>
          )}

          <CustomButton
            href={project.live}
            external
            variant="outline"
            className={cn(
              "w-full text-[10px] h-10 font-black uppercase tracking-widest italic border-2 shadow-lg transition-all",
              isLiveCollected
                ? "border-gold text-gold bg-gold/10"
                : "bg-gold/90 border-gold text-blue-400 hover:bg-white hover:text-blue-400 hover:border-white shadow-blue-400/20",
            )}
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Enter Realm
          </CustomButton>
        </div>
      </CardContent>
    </Card>
  );
}
