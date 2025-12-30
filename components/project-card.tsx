"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, Trophy } from "lucide-react";
import { CustomButton } from "./custom-button";
import { usePlayerStore } from "@/lib/store";
import { XPNode } from "./xp-node";
import { cn } from "@/lib/utils";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
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
        isFullyCollected && "border-gold/30"
      )}
    >
      <div className="absolute top-3 left-3 z-20 flex gap-2">
        <Badge className="bg-black/80 border-gold/50 text-gold text-[10px] font-black uppercase italic gap-1.5 px-2.5 py-1 backdrop-blur-md shadow-lg">
          <Trophy className="w-3.5 h-3.5" /> Quest #{project.id}
        </Badge>
        {isFullyCollected && (
          <Badge className="bg-gold text-black border-none text-[10px] font-black uppercase italic px-2 py-1 animate-in zoom-in">
            Completed
          </Badge>
        )}
      </div>

      <div className="aspect-video relative overflow-hidden flex-shrink-0">
        <Image
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-[1.5s] ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80" />
      </div>

      <CardContent className="p-8 relative flex-grow flex flex-col">
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
          <XPNode id={codeNodeId} amount={25} className="flex-1">
            <CustomButton
              href={project.link}
              external
              variant="outline"
              className={cn(
                "w-full text-[10px] h-10 font-black uppercase tracking-widest italic border-2 transition-all",
                isCodeCollected
                  ? "border-gold/30 text-gold bg-gold/5"
                  : "border-white/10 text-white/40 hover:border-gold hover:text-gold"
              )}
            >
              <Github className="h-4 w-4 mr-2" />
              <span>
                {isCodeCollected ? "Dossier Read" : "Examine Code (+25)"}
              </span>
            </CustomButton>
          </XPNode>

          <XPNode id={liveNodeId} amount={25} className="flex-1">
            <CustomButton
              href={project.live}
              external
              variant="outline"
              className={cn(
                "w-full text-[10px] h-10 font-black uppercase tracking-widest italic border-2 shadow-lg transition-all",
                isLiveCollected
                  ? "border-gold text-gold bg-gold/10"
                  : "bg-gold/90 border-gold text-blue-400 hover:bg-white hover:text-blue-400 hover:border-white shadow-blue-400/20"
              )}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              <span>
                {isLiveCollected ? "Mission Clear" : "Enter Realm (+25)"}
              </span>
            </CustomButton>
          </XPNode>
        </div>
      </CardContent>
    </Card>
  );
}
