import { Facebook, Github, Instagram, type LucideIcon } from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import data from "@/data.json";
import { DiscordIcon, SteamIcon, TelegramIcon, WhatsAppIcon } from "./brand-icons";

interface SocialLinksProps {
  size?: "sm" | "md" | "lg";
}

type Icon = LucideIcon | ComponentType<SVGProps<SVGSVGElement>>;

const { contact } = data;

const LINKS: { label: string; href: string; icon: Icon }[] = [
  { label: "Instagram", href: contact.Instagram, icon: Instagram },
  { label: "Facebook", href: contact.Facebook, icon: Facebook },
  { label: "GitHub", href: contact.github, icon: Github },
  { label: "Discord", href: contact.Discord, icon: DiscordIcon },
  { label: "Steam", href: contact.Steam, icon: SteamIcon },
  { label: "Telegram", href: contact.Telegram, icon: TelegramIcon },
  { label: "WhatsApp", href: contact.Whatsapp, icon: WhatsAppIcon },
];

export default function SocialLinks({ size = "md" }: SocialLinksProps) {
  const iconSize = size === "sm" ? "h-4 w-4" : size === "lg" ? "h-6 w-6" : "h-5 w-5";
  const gap = size === "sm" ? "gap-3" : size === "lg" ? "gap-6" : "gap-4";

  return (
    <div className={`flex items-center ${gap}`}>
      {LINKS.map(({ label, href, icon: Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-gold transition-colors"
          aria-label={label}
        >
          <Icon className={iconSize} aria-hidden />
        </a>
      ))}
    </div>
  );
}
