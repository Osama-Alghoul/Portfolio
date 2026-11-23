import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";

const SKILL_GROUPS: { name: string; skills: string[]; wide?: boolean }[] = [
  {
    name: "Frontend",
    wide: true,
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "HTML",
      "CSS",
      "Tailwind CSS",
      "Bootstrap",
      "shadcn/ui",
      "Material UI",
      "Chakra UI",
      "RTL Arabic UI",
      "i18n",
    ],
  },
  {
    name: "Backend & Data",
    skills: [
      "Node.js",
      "Express",
      "NestJS",
      "PostgreSQL",
      "Drizzle ORM",
      "SQLite",
      "Odoo",
    ],
  },
  {
    name: "AI",
    skills: ["AI Integration", "LLM", "Claude API", "AI Agents"],
  },
  {
    name: "Cloud & Workflow",
    skills: ["Docker", "Cloudflare", "Vercel", "Git & GitHub"],
  },
  {
    name: "Performance & SEO",
    skills: [
      "Core Web Vitals",
      "Web Performance",
      "Technical SEO",
      "GA4",
      "Search Console",
    ],
  },
];

export default function SkillsSet() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {SKILL_GROUPS.map((group) => (
        <div
          key={group.name}
          className={cn(
            "rounded-2xl border border-blue-900/40 bg-blue-950/20 p-5 transition-colors hover:border-gold/40",
            group.wide && "sm:col-span-2",
          )}
        >
          <h4 className="mb-3 text-sm font-semibold text-gold">{group.name}</h4>
          <ul className="flex flex-wrap gap-2">
            {group.skills.map((skill) => (
              <li key={skill}>
                <Badge
                  variant="secondary"
                  className="bg-blue-900/50 text-blue-200 hover:bg-blue-900/70"
                >
                  {skill}
                </Badge>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
