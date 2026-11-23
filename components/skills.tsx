import { Badge } from "./ui/badge";

export default function SkillsSet() {
  return (
    <div className="flex gap-2 flex-wrap">
      {[
        "HTML",
        "CSS",
        "JavaScript",
        "AI",
        "Bootstrap",
        "Tailwind",
        "TypeScript",
        "React",
        "NextJS",
        "NodeJS",
        "ExpressJS",
        "SQLite",
        "Docker",
        "Cloudflare",
        "Git & GitHub",
        "Google Analytics",
        "SEO",
      ].map((skill) => (
        <Badge
          key={skill}
          variant="secondary"
          className="bg-blue-900/50 text-blue-200"
        >
          {skill}
        </Badge>
      ))}
    </div>
  );
}
