import { Badge } from "./ui/badge";

export default function SkillsSet() {
  return (
    <div className="flex gap-2 flex-wrap">
      <Badge variant="secondary" className="bg-blue-900/50 text-blue-200">
        HTML
      </Badge>
      <Badge variant="secondary" className="bg-blue-900/50 text-blue-200">
        CSS
      </Badge>
      <Badge variant="secondary" className="bg-blue-900/50 text-blue-200">
        JavaScript
      </Badge>
      <Badge variant="secondary" className="bg-blue-900/50 text-blue-200">
        Sass
      </Badge>
      <Badge variant="secondary" className="bg-blue-900/50 text-blue-200">
        Bootstarp
      </Badge>
      <Badge variant="secondary" className="bg-blue-900/50 text-blue-200">
        Tailwind
      </Badge>
      <Badge variant="secondary" className="bg-blue-900/50 text-blue-200">
        TypeScript
      </Badge>
      <Badge variant="secondary" className="bg-blue-900/50 text-blue-200">
        React
      </Badge>
      <Badge variant="secondary" className="bg-blue-900/50 text-blue-200">
        NextJS
      </Badge>
      <Badge variant="secondary" className="bg-blue-900/50 text-blue-200">
        Git & GitHub
      </Badge>
    </div>
  );
}
