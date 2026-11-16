import { ArrowUpRight } from "lucide-react";
import ProjectCard from "./project-card";
import { categories } from "@/lib/projects";

export default function Projects() {
  return (
    <div className="space-y-12">
      {categories.map((category) => (
        <div key={category.name}>
          <div className="mb-5 border-b border-line pb-3">
            <h3 className="font-mono text-xs uppercase tracking-[0.12em] text-brand">{category.name}</h3>
            <p className="mt-1 text-sm text-faint">{category.description}</p>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {category.projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      ))}

      <a
        href="https://github.com/Osama-Alghoul"
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center justify-between rounded-xl border border-dashed border-line px-5 py-4 text-sm text-dim transition-colors hover:border-brand/40 hover:text-brand"
      >
        More experiments on GitHub
        <ArrowUpRight aria-hidden className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </a>
    </div>
  );
}
