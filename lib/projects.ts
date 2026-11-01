export type Rarity = "legendary" | "epic" | "rare" | "common";

export type NodeIcon =
  | "user"
  | "bot"
  | "frontend"
  | "server"
  | "function"
  | "db"
  | "ai"
  | "cloud"
  | "static";

export interface ArchNode {
  label: string;
  sub?: string;
  icon: NodeIcon;
  /** "me" = built by Osama, "team" = built by another team, omitted = external (users, hosts). */
  owner?: "me" | "team";
}

export interface ArchLayer {
  nodes: ArchNode[];
  /** Draws a dashed boundary around the layer's nodes, e.g. one deploy unit. */
  group?: string;
}

export interface Architecture {
  layers: ArchLayer[];
  note?: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link?: string;
  live: string;
  rarity: Rarity;
  stats?: { label: string; value: string }[];
  architecture?: Architecture;
}

export interface ProjectCategory {
  name: string;
  description: string;
  projects: Project[];
}

export const RARITY_LABEL: Record<Rarity, string> = {
  legendary: "Legendary",
  epic: "Epic",
  rare: "Rare",
  common: "Common",
};

const vercel: ArchNode = { label: "Vercel", sub: "hosting · CDN", icon: "cloud" };
const ghPages: ArchNode = { label: "GitHub Pages", sub: "static hosting", icon: "cloud" };
const visitor: ArchNode = { label: "Visitor", icon: "user" };

export const categories: ProjectCategory[] = [
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
        image: "/privco.png",
        tags: ["React", "Next.js", "AI Integration", "SEO", "Performance"],
        live: "https://privco.com",
        rarity: "legendary",
        stats: [
          { label: "Role", value: "Frontend · ooblek" },
          { label: "Focus", value: "AI · SEO · Perf" },
        ],
        architecture: {
          layers: [
            {
              nodes: [
                { label: "Analysts", sub: "PE · M&A teams", icon: "user" },
                { label: "Googlebot", sub: "SEO", icon: "bot" },
              ],
            },
            {
              nodes: [
                {
                  label: "Next.js Frontend",
                  sub: "UI · performance · SEO",
                  icon: "frontend",
                  owner: "me",
                },
              ],
            },
            {
              nodes: [
                {
                  label: "AI Service",
                  sub: "watchlists · AI search",
                  icon: "ai",
                  owner: "team",
                },
              ],
            },
          ],
          note: "I integrated the backend team's AI service into the product UI.",
        },
      },
      {
        id: 14,
        title: "Quranik",
        description:
          "One-to-one online Quran sessions with licensed teachers from Gaza (Hifdh, Tajweed, and Ijazah) for students of every age worldwide. Built with an Odoo backend and a Next.js frontend.",
        image: "/quranik.png",
        tags: ["Next.js", "Odoo", "Full-Stack"],
        live: "https://quranik.org",
        rarity: "epic",
        stats: [
          { label: "Format", value: "1:1 live" },
          { label: "Teachers", value: "From Gaza" },
        ],
        architecture: {
          layers: [
            { nodes: [{ label: "Students", sub: "worldwide", icon: "user" }] },
            {
              nodes: [
                {
                  label: "Next.js Frontend",
                  sub: "programs · teachers · booking",
                  icon: "frontend",
                  owner: "me",
                },
              ],
            },
            {
              nodes: [
                {
                  label: "Odoo Backend",
                  sub: "business logic · data",
                  icon: "server",
                  owner: "me",
                },
              ],
            },
          ],
        },
      },
      {
        id: 15,
        title: "Cordapoint",
        description:
          "Arabic–English AI data annotation, speech transcription, model evaluation, and translation services. A React site with a serverless TypeScript backend running as Cloudflare Pages Functions, deployed together with the frontend.",
        image: "/cordapoint.png",
        tags: ["React", "TypeScript", "Cloudflare Pages Functions", "Serverless"],
        live: "https://cordapoint.net",
        rarity: "epic",
        stats: [
          { label: "Servers", value: "0" },
          { label: "Deploys", value: "1 unit" },
        ],
        architecture: {
          layers: [
            { nodes: [{ label: "AI Labs", sub: "clients", icon: "user" }] },
            {
              group: "One Cloudflare Pages deploy",
              nodes: [
                { label: "React Site", sub: "static assets", icon: "frontend", owner: "me" },
                { label: "Pages Functions", sub: "TypeScript API", icon: "function", owner: "me" },
              ],
            },
          ],
          note: "No Express or Node server. The backend ships with the site.",
        },
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
        image: "/amtar.png",
        tags: ["Next.js", "Real Estate", "Frontend"],
        live: "https://amtar-jade.vercel.app/",
        rarity: "rare",
        stats: [
          { label: "Listings", value: "15,000+" },
          { label: "Compounds", value: "800+" },
        ],
        architecture: {
          layers: [
            { nodes: [{ label: "Buyers & Renters", icon: "user" }] },
            {
              nodes: [
                { label: "Next.js App", sub: "search · compare", icon: "frontend", owner: "me" },
              ],
            },
            { nodes: [vercel] },
          ],
        },
      },
      {
        id: 12,
        title: "Tadawul Real Estate",
        description:
          "Corporate site for a Riyadh-based real estate investment & development company managing commercial towers in the King Abdullah Financial District (KAFD).",
        image: "/tadaol.png",
        tags: ["Next.js", "Corporate Site", "Frontend"],
        live: "https://tadaol.vercel.app/",
        rarity: "rare",
        stats: [{ label: "Location", value: "KAFD, Riyadh" }],
        architecture: {
          layers: [
            { nodes: [{ label: "Investors", icon: "user" }] },
            { nodes: [{ label: "Next.js Site", sub: "RTL · Arabic", icon: "frontend", owner: "me" }] },
            { nodes: [vercel] },
          ],
        },
      },
      {
        id: 13,
        title: "UPAL Systems",
        description:
          "Company site for a Jeddah-based aluminum manufacturer, showcasing windows, doors, facades, and industrial fabrication services.",
        image: "/upal.png",
        tags: ["Next.js", "Corporate Site", "Frontend"],
        live: "https://al-factory.vercel.app/",
        rarity: "rare",
        stats: [{ label: "Client", value: "Jeddah factory" }],
        architecture: {
          layers: [
            { nodes: [{ label: "Customers", icon: "user" }] },
            {
              nodes: [
                { label: "Next.js Site", sub: "AR/EN · dark mode", icon: "frontend", owner: "me" },
              ],
            },
            { nodes: [vercel] },
          ],
        },
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
        rarity: "rare",
        stats: [{ label: "Type", value: "Graduation" }],
        architecture: {
          layers: [
            { nodes: [{ label: "Refugees", sub: "Gaza Strip", icon: "user" }] },
            { nodes: [{ label: "Next.js + TS", sub: "market · maps", icon: "frontend", owner: "me" }] },
            { nodes: [{ label: "Laravel API", icon: "server", owner: "team" }] },
            { nodes: [{ label: "MySQL", icon: "db", owner: "team" }] },
          ],
        },
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
        rarity: "common",
        architecture: {
          layers: [
            { nodes: [visitor] },
            { nodes: [{ label: "React + Vite SPA", icon: "frontend", owner: "me" }] },
            { nodes: [vercel] },
          ],
        },
      },
      {
        id: 7,
        title: "Next Level Food",
        description: "Yummy Food recepies !",
        image: "/nlfood.png?height=200&width=300",
        tags: ["HTML", "CSS", "JavaScript", "Next JS", "sqlite"],
        link: "https://github.com/Osama-Alghoul/Next-Level-Food",
        live: "https://next-level-food-lovat.vercel.app/",
        rarity: "common",
        architecture: {
          layers: [
            { nodes: [visitor] },
            { nodes: [{ label: "Next.js App", icon: "frontend", owner: "me" }] },
            { nodes: [{ label: "SQLite", sub: "recipes", icon: "db", owner: "me" }] },
          ],
        },
      },
      {
        id: 8,
        title: "Developer Portfolio",
        description: "Mobile developer portfolio website",
        image: "/mobileDev.png?height=200&width=300",
        tags: ["HTML", "CSS", "TypeScript", "Next JS"],
        link: "https://github.com/Osama-Alghoul/Portfolio.Abdullah-Abo-sido",
        live: "https://portfolio-abdullah-abo-sido.vercel.app/",
        rarity: "common",
        architecture: {
          layers: [
            { nodes: [visitor] },
            { nodes: [{ label: "Next.js Site", icon: "frontend", owner: "me" }] },
            { nodes: [vercel] },
          ],
        },
      },
      {
        id: 1,
        title: "Moviedux",
        description: "Moives website built using React",
        image: "/moviedux.png?height=200&width=300",
        tags: ["HTML", "CSS", "JavaScript", "React"],
        link: "https://github.com/Osama-Alghoul/Moviedux-React",
        live: "https://moviedux-react.vercel.app/",
        rarity: "common",
        architecture: {
          layers: [
            { nodes: [visitor] },
            { nodes: [{ label: "React App", icon: "frontend", owner: "me" }] },
            { nodes: [vercel] },
          ],
        },
      },
      {
        id: 4,
        title: "Shipping company",
        description: "A HTML, CSS & JS website built with single page",
        image: "/shipping.png?height=200&width=300",
        tags: ["HTML", "CSS", "JavaScript"],
        link: "https://github.com/Osama-Alghoul/Shipping_company",
        live: "https://osama-alghoul.github.io/Shipping_company/",
        rarity: "common",
        architecture: {
          layers: [
            { nodes: [visitor] },
            { nodes: [{ label: "HTML · CSS · JS", sub: "single page", icon: "static", owner: "me" }] },
            { nodes: [ghPages] },
          ],
        },
      },
      {
        id: 6,
        title: "Elzero Web School",
        description: "All Elzero Web School Tasks, Assignments and challenges",
        image: "/elzero.png?height=200&width=300",
        tags: ["HTML", "CSS", "JavaScript"],
        link: "https://github.com/Osama-Alghoul/Elzero-web-school",
        live: "https://osama-alghoul.github.io/Elzero-web-school/",
        rarity: "common",
        architecture: {
          layers: [
            { nodes: [visitor] },
            { nodes: [{ label: "HTML · CSS · JS", sub: "exercises", icon: "static", owner: "me" }] },
            { nodes: [ghPages] },
          ],
        },
      },
    ],
  },
];
