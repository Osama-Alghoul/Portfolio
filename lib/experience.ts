// Experience timeline shown on the home page (components/experience.tsx).
// Prefilled from the notes in data.json ("Experince"). Add `period` (e.g. "2024 — Present") to each entry.

export type ExperienceEntry = {
  role: string;
  company: string;
  url?: string;
  /** e.g. "Jan 2024 — Present". Hidden when empty. */
  period?: string;
  kind: "work" | "freelance" | "training" | "project";
  current?: boolean;
  summary?: string;
};

export const experience: ExperienceEntry[] = [
  {
    role: "Frontend Developer",
    company: "ooblek agentic",
    url: "https://ooblek.xyz",
    kind: "work",
    current: true,
    summary:
      "Building production frontends for client products such as privco.com.",
  },
  {
    role: "Project Manager (Externship)",
    company: "Extern × BeReal",
    kind: "training",
    current: true,
  },
  {
    role: "Founder & Developer",
    company: "Quranik",
    url: "https://quranik.org",
    kind: "project",
    current: true,
    summary:
      "A platform supporting Quran teachers in Gaza. Odoo backend, Next.js frontend.",
  },
  {
    role: "Freelance Web Developer",
    company: "Khamsat, Mostaql & direct clients",
    kind: "freelance",
    summary:
      "Projects for clients in Palestine, Turkey and Saudi Arabia, most recently rowwadhimam.org.",
  },
  {
    role: "Trainee, then Trainer",
    company: "Aristo · Qader “Khareej” program",
    kind: "training",
    summary:
      "Trained in the first season of the program and came back as a trainer for the third.",
  },
  {
    role: "React Pro Trainee",
    company: "Gaza Sky Geeks",
    kind: "training",
  },
];
