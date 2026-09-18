import data from "@/data.json";

const SITE_URL = "https://www.osssghoul.com";

export const dynamic = "force-static";

const TITLE_EN = "Software Engineer & Web Developer";

const SERVICES_EN = [
  {
    name: "System Architecture & Scalable Infrastructure",
    description:
      "Designing strong technical architecture and scalable systems from the ground up, built to support long-term growth without constant rebuilds.",
  },
  {
    name: "Web Application Development",
    description:
      "Designing and building full-stack web applications with interactive UIs and robust backends.",
  },
  {
    name: "Performance & Scalability Optimization",
    description:
      "Optimizing website and application speed, and tuning systems to scale under high load, for a better user experience.",
  },
  {
    name: "Scalable AI Systems Leadership",
    description:
      "Leading, building, and integrating AI services into scalable systems on a strong infrastructure, with custom solutions tailored to your business needs.",
  },
];

const TECH_FAQ_EN = [
  {
    q: "What is your preferred tech stack?",
    a: "Next.js with TypeScript for full-stack projects, and Tailwind CSS for fast, consistent styling. Also comfortable with Vue, Angular, and Nuxt.js.",
  },
  {
    q: "What's your take on AI?",
    a: "AI is a great tool for writing code faster and more efficiently, but it's a tool, not a replacement for human skill and experience.",
  },
  {
    q: "Do you take freelance work?",
    a: "Yes. Reach out by email or WhatsApp to discuss project details.",
  },
  {
    q: "How long does building a website take?",
    a: "Depends on complexity: a simple site can take a day or two, a full-stack application one to three months.",
  },
  {
    q: "Why hire Osama?",
    a: "Focus on understanding the real problem first, then proposing the most cost-effective, maintainable long-term solution rather than a quick generic build. Strong emphasis on SEO (a site that doesn't rank isn't useful) and on analyzing visitor behavior with Google's tools to improve UX.",
  },
];

function section(title: string, lines: string[]): string {
  return `## ${title}\n\n${lines.join("\n")}\n`;
}

export function GET() {
  const skills = [
    `- Frontend: ${data.skills.frontend.join(", ")}`,
    `- Backend: ${data.skills.backend.join(", ")}`,
    `- AI: ${data.skills.AI.join(", ")}`,
    `- Architecture: ${data.skills.Architecture.join(", ")}`,
    `- Tools: ${data.skills.tools.join(", ")}`,
    `- Also familiar with: ${data.Light_knowledge.join(", ")}`,
  ];

  const services = SERVICES_EN.map((s) => `- ${s.name}: ${s.description}`);

  const projects = data.Projects_sample.map(
    (p) => `- [${p.name}](${p.link}) (${p.type})`,
  );

  const contact = [
    `- Email: ${data.contact.email}`,
    `- GitHub: ${data.contact.github}`,
    `- LinkedIn: ${data.contact.linkedin}`,
    `- Telegram: ${data.contact.Telegram}`,
    `- Discord: ${data.contact.Discord}`,
    `- Steam: ${data.contact.Steam}`,
    `- WhatsApp: ${data.contact.Whatsapp}`,
    `- Facebook: ${data.contact.Facebook}`,
    `- Instagram: ${data.contact.Instagram}`,
  ];

  const faq = TECH_FAQ_EN.map((f) => `- Q: ${f.q}\n  A: ${f.a}`);

  const body = [
    `# ${data.personal.name_en}`,
    "",
    `> ${TITLE_EN} based in Palestine. Builds, leads, and integrates AI services into scalable systems on a strong infrastructure, using Next.js, React, and TypeScript.`,
    "",
    `Also known as: ${data.personal.handle}, ${data.personal.name}. ${SITE_URL}`,
    "",
    section("Skills", skills),
    section("Services", services),
    section("Sample Projects", projects),
    section("Contact", contact),
    section("FAQ", faq),
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
