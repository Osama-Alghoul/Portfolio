import { Facebook, Github, Instagram, Linkedin, Youtube, type LucideIcon } from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import data from "@/data.json";
import { DiscordIcon, SteamIcon, TelegramIcon, WhatsAppIcon } from "./brand-icons";
import { cn } from "@/lib/utils";

interface SocialLinksProps {
  size?: "sm" | "md" | "lg";
  /** "icons": bare icons. "chips": bordered pills with labels (home page). */
  variant?: "icons" | "chips";
  className?: string;
}

type Icon = LucideIcon | ComponentType<SVGProps<SVGSVGElement>>;

const { contact } = data;

export const SOCIALS: { label: string; href: string; icon: Icon }[] = [
  { label: "GitHub", href: contact.github, icon: Github },
  { label: "LinkedIn", href: contact.linkedin, icon: Linkedin },
  { label: "YouTube", href: "https://www.youtube.com/channel/UC4w0lxr1YonewXpbUeOH5Vw", icon: Youtube },
  { label: "Instagram", href: contact.Instagram, icon: Instagram },
  { label: "Discord", href: contact.Discord, icon: DiscordIcon },
  { label: "Steam", href: contact.Steam, icon: SteamIcon },
  { label: "Telegram", href: contact.Telegram, icon: TelegramIcon },
  { label: "WhatsApp", href: contact.Whatsapp, icon: WhatsAppIcon },
  { label: "Facebook", href: contact.Facebook, icon: Facebook },
];

export default function SocialLinks({ size = "md", variant = "icons", className }: SocialLinksProps) {
  if (variant === "chips") {
    return (
      <ul className={cn("flex flex-wrap gap-2", className)}>
        {SOCIALS.map(({ label, href, icon: Icon }) => (
          <li key={label}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-line bg-chip px-3 py-1.5 text-[13px] text-dim transition-colors hover:border-brand/40 hover:bg-hover hover:text-fg"
            >
              <Icon className="h-3.5 w-3.5 text-brand/80" aria-hidden />
              {label}
            </a>
          </li>
        ))}
      </ul>
    );
  }

  const iconSize = size === "sm" ? "h-4 w-4" : size === "lg" ? "h-6 w-6" : "h-5 w-5";
  const gap = size === "sm" ? "gap-3" : size === "lg" ? "gap-6" : "gap-4";

  return (
    <div className={cn("flex flex-wrap items-center", gap, className)}>
      {SOCIALS.map(({ label, href, icon: Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-faint transition-colors hover:text-brand"
          aria-label={label}
        >
          <Icon className={iconSize} aria-hidden />
        </a>
      ))}
    </div>
  );
}
