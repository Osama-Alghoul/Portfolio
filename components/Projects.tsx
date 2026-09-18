import { CustomButton } from "./custom-button";
import ProjectCard from "./project-card";
import { Github } from "lucide-react";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link?: string;
  live: string;
}

interface ProjectCategory {
  name: string;
  description: string;
  projects: Project[];
}

const categories: ProjectCategory[] = [
  {
    name: "Professional Experience",
    description:
      "Production work built as part of a team, for a real business and real users.",
    projects: [
      {
        id: 10,
        title: "PrivCo",
        description:
          "Private company intelligence platform for investment, private equity, and M&A teams. Worked as frontend developer with ooblek, and integrated the AI service (built by the backend team) that powers personalized watchlists and AI-assisted company search, alongside general UI work, performance, and SEO/Google tooling.",
        image: "",
        tags: ["React", "Next.js", "AI Integration", "SEO", "Performance"],
        live: "https://privco.com",
      },
    ],
  },
  {
    name: "Freelance Work",
    description:
      "Quick-turnaround client sites, built end-to-end from design to deployment.",
    projects: [
      {
        id: 11,
        title: "Amtar",
        description:
          "Real estate marketplace for buying, selling, and renting properties across Saudi Arabia, with 15,000+ listings, search, and property comparison tools.",
        image: "",
        tags: ["Next.js", "Real Estate", "Frontend"],
        live: "https://amtar-jade.vercel.app/",
      },
      {
        id: 12,
        title: "Tadawul Real Estate",
        description:
          "Corporate site for a Riyadh-based real estate investment & development company managing commercial towers in the King Abdullah Financial District (KAFD).",
        image: "",
        tags: ["Next.js", "Corporate Site", "Frontend"],
        live: "https://tadaol.vercel.app/",
      },
      {
        id: 13,
        title: "UPAL Systems",
        description:
          "Company site for a Jeddah-based aluminum manufacturer, showcasing windows, doors, facades, and industrial fabrication services.",
        image: "",
        tags: ["Next.js", "Corporate Site", "Frontend"],
        live: "https://al-factory.vercel.app/",
      },
    ],
  },
  {
    name: "Capstone Project",
    description: "My university graduation project.",
    projects: [
      {
        id: 2,
        title: "Masar",
        description:
          "A preview of my full graduation project — a market and mapping platform built to help refugees in the Gaza Strip find services and navigate safely.",
        image: "/masar.png?height=200&width=300",
        tags: ["Next JS", "CSS", "TypeScript", "Laravel", "MySQL"],
        link: "https://github.com/graduationUP/Masar_Project/",
        live: "https://masar-project-frontui.vercel.app/",
      },
    ],
  },
  {
    name: "Learning Journey",
    description:
      "Practice projects from earlier in my path — and there will always be more.",
    projects: [
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
        live: "https://moviedux-react.vercel.app/",
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
    ],
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-20 bg-black/95">
      <div className="container px-4 md:px-6 mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gold">
          My Projects
        </h2>
        <p className="text-blue-400 text-center max-w-3xl mx-auto mb-16">
          From professional production work to freelance builds, a capstone
          project, and the ground where it all started.
        </p>

        <div className="space-y-16">
          {categories.map((category) => (
            <div key={category.name}>
              <div className="mb-6">
                <h3 className="text-xl font-black text-white uppercase italic tracking-tighter">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-400 mt-1">
                  {category.description}
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.projects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </div>
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
