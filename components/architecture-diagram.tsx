import {
  Bot,
  Brain,
  Cloud,
  Database,
  FileCode,
  Monitor,
  Server,
  User,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { Fragment } from "react";
import type { ArchNode, Architecture, NodeIcon } from "@/lib/projects";
import { cn } from "@/lib/utils";

const ICONS: Record<NodeIcon, LucideIcon> = {
  user: User,
  bot: Bot,
  frontend: Monitor,
  server: Server,
  function: Zap,
  db: Database,
  ai: Brain,
  cloud: Cloud,
  static: FileCode,
};

function Node({ node }: { node: ArchNode }) {
  const Icon = ICONS[node.icon];
  return (
    <div
      className={cn(
        "loot-node flex-1 min-w-0 flex items-center gap-2 rounded-md border px-2.5 py-1.5",
        node.owner === "me" && "loot-node-me",
        node.owner === "team" && "loot-node-team",
        !node.owner && "border-white/10 bg-white/[0.03]",
      )}
    >
      <Icon
        aria-hidden
        className={cn(
          "h-3.5 w-3.5 shrink-0",
          node.owner === "me" ? "text-gold" : node.owner === "team" ? "text-blue-400" : "text-gray-400",
        )}
      />
      <div className="min-w-0 leading-tight">
        <div className="text-[11px] font-bold text-white truncate">{node.label}</div>
        {node.sub && <div className="text-[9px] text-gray-400 truncate">{node.sub}</div>}
      </div>
    </div>
  );
}

export default function ArchitectureDiagram({ architecture }: { architecture: Architecture }) {
  const { layers, note } = architecture;
  const hasTeam = layers.some((l) => l.nodes.some((n) => n.owner === "team"));

  return (
    <figure className="flex flex-col items-stretch">
      <ol className="flex flex-col items-stretch list-none p-0 m-0">
        {layers.map((layer, i) => (
          <Fragment key={layer.nodes.map((n) => n.label).join("|")}>
            {i > 0 && (
              <li aria-hidden className="flex justify-center">
                <span className="loot-flow" />
              </li>
            )}
            <li
              className={cn(
                "relative flex gap-2",
                layer.group && "rounded-lg border border-dashed border-white/20 p-2 pt-4 mt-1",
              )}
            >
              {layer.group && (
                <span className="absolute -top-2 left-2 px-1.5 bg-[#070b14] text-[9px] font-bold uppercase tracking-widest text-gray-300">
                  {layer.group}
                </span>
              )}
              {layer.nodes.map((node) => (
                <Node key={node.label} node={node} />
              ))}
            </li>
          </Fragment>
        ))}
      </ol>

      <figcaption className="mt-3 space-y-1.5">
        {note && <p className="text-[11px] text-gray-300 leading-snug">{note}</p>}
        <div className="flex gap-3 text-[9px] uppercase tracking-widest text-gray-500">
          <span className="flex items-center gap-1">
            <span className="loot-node-me h-2 w-2 rounded-sm border" /> My build
          </span>
          {hasTeam && (
            <span className="flex items-center gap-1">
              <span className="loot-node-team h-2 w-2 rounded-sm border" /> Team
            </span>
          )}
        </div>
      </figcaption>
    </figure>
  );
}
