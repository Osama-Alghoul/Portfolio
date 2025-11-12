import { CustomButton } from "./custom-button";
import ProjectCard from "./project-card";
import { Github } from "lucide-react";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
  live: string;
}

export default function Projects() {
  const projects: Project[] = [
    {
      id: 2,
      title: "Masar",
      description:
        "Market and a map platform built to help the refugees in Gaza strip",
      image: "/masar.png?height=200&width=300",
      tags: ["Next JS", "CSS", "TypeScript", "Laravel", "MySQL"],
      link: "https://github.com/graduationUP/Masar_Project/",
      live: "https://masar-project-frontui.vercel.app/",
    },
    {
      id: 3,
      title: "E-commerce app",
      description: "An e-commerce application built with React and Vite",
      image: "/e-commerce.png?height=200&width=300",
      tags: ["React", "CSS", "TypeScript", "Vite"],
      link: "https://github.com/Osama-Alghoul/Full-E-commerce-website",
      live: "https://full-e-commerce-react.vercel.app/",
    },
    {
      id: 7,
      title: "Next Level Food",
      description: "Yummy Food recepies !",
      image: "/nlfood.png?height=200&width=300",
      tags: ["HTML", "CSS", "JavaScript", "Next JS", "sqlite"],
      link: "https://github.com/Osama-Alghoul/Next-Level-Food",
      live: "https://next-level-food-lovat.vercel.app/",
    },
    {
      id: 8,
      title: "Developer Portfolio",
      description: "Mobile developer portfolio website",
      image: "/mobileDev.png?height=200&width=300",
      tags: ["HTML", "CSS", "TypeScript", "Next JS"],
      link: "https://github.com/Osama-Alghoul/Portfolio.Abdullah-Abo-sido",
      live: "https://portfolio-abdullah-abo-sido.vercel.app/",
    },
    {
      id: 1,
      title: "Moviedux",
      description: "Moives website built using React",
      image: "/moviedux.png?height=200&width=300",
      tags: ["HTML", "CSS", "JavaScript", "React"],
      link: "https://github.com/Osama-Alghoul/Moviedux-React",
      live: "https://moviedux-react-34a6yw6ng-osama-alghouls-projects.vercel.app/",
    },
    {
      id: 4,
      title: "Shipping company",
      description: "A HTML, CSS & JS website built with single page",
      image: "/shipping.png?height=200&width=300",
      tags: ["HTML", "CSS", "JavaScript"],
      link: "https://github.com/Osama-Alghoul/Shipping_company",
      live: "https://osama-alghoul.github.io/Shipping_company/",
    },
    {
      id: 6,
      title: "Elzero Web School",
      description: "All Elzero Web School Tasks, Assignments and challenges",
      image: "/elzero.png?height=200&width=300",
      tags: ["HTML", "CSS", "JavaScript"],
      link: "https://github.com/Osama-Alghoul/Elzero-web-school",
      live: "https://osama-alghoul.github.io/Elzero-web-school/",
    },
  ];
  return (
    <section id="projects" className="py-20 bg-black/95">
      <div className="container px-4 md:px-6 mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gold">
          My Projects
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
        <div className="text-center mt-12">
          <CustomButton
            href="https://github.com/yourusername"
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
