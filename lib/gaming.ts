import data from "@/data.json";

export const DISCORD_URL = data.contact.Discord;
export const STEAM_URL = data.contact.Steam;
export const DISCORD_SERVER_NAME = "Section Zero";

export type PlayStyleId = "coop" | "competitive" | "story" | "survival";

export interface PlayStyle {
  id: PlayStyleId;
  /** Short HUD-style label shown above the title. */
  kicker: string;
  title: string;
  blurb: string;
  games: string[];
  /** Combined hours across the listed games. */
  hours: number;
  /** CSS color used for the scene's accent. */
  accent: string;
}

export const PLAY_STYLES: PlayStyle[] = [
  {
    id: "coop",
    kicker: "Co-op shooters",
    title: "Squad up.",
    blurb:
      "A heist going sideways with three friends on voice is my favorite kind of chaos. Co-op is where callouts, timing, and trust matter more than raw aim.",
    games: ["PAYDAY 2", "Borderlands", "Left 4 Dead 2", "Zombie Army Trilogy"],
    hours: 530,
    accent: "hsl(37 89% 59%)",
  },
  {
    id: "competitive",
    kicker: "Competitive FPS",
    title: "Lock in.",
    blurb:
      "Ranked rounds, clutch moments, and the grind to get a little sharper every match. Same loop I use for code: review the replay, adjust, run it back.",
    games: ["Counter-Strike 2", "Valorant", "Rogue Company"],
    hours: 265,
    accent: "#fb7185",
  },
  {
    id: "story",
    kicker: "Story & puzzle FPS",
    title: "Solve the level.",
    blurb:
      "Worlds that teach you through play: no walls of tutorial text, just smart level design and puzzles that click. It shaped how I think about UX.",
    games: ["Half-Life 2", "Black Mesa", "Portal 2"],
    hours: 55,
    accent: "#38bdf8",
  },
  {
    id: "survival",
    kicker: "Survival & open world",
    title: "Go anywhere.",
    blurb:
      "Parkour across rooftops at night, build something from nothing, or just cause chaos in a city. Freedom to make your own fun.",
    games: ["Dying Light", "Minecraft", "GTA V"],
    hours: 105,
    accent: "#4ade80",
  },
];
