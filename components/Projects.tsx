import { CustomButton } from "./custom-button";
import ProjectCarousel from "./project-carousel";
import { Github } from "lucide-react";
import { categories } from "@/lib/projects";

export default function Projects() {
  return (
    <section id="projects" className="py-20 bg-black/95">
      <div className="container px-4 md:px-6 mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gold">
          My Projects
        </h2>
        <p className="text-blue-400 text-center max-w-3xl mx-auto mb-16">
          From professional production work to freelance builds, open-source
          tools, and the ground where it all started.
        </p>

        <div className="space-y-10">
          {categories.map((category) => (
            <ProjectCarousel key={category.name} category={category} />
          ))}
        </div>

        <div className="text-center mt-16">
          <CustomButton
            href="https://github.com/Osama-Alghoul"
            variant="outline"
            external
          >
            <Github className="mr-2 h-4 w-4" />
            View More on GitHub
          </CustomButton>
        </div>
      </div>
    </section>
  );
}
