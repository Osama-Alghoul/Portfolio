import { ServiceCard, type ServiceIcon } from "./service-card";

const SERVICES: { title: string; description: string; iconType: ServiceIcon }[] = [
  {
    title: "Designing Systems That Scale With You",
    description:
      "Architecting strong technical foundations and scalable systems from day one, so your product can grow without needing a constant rebuild.",
    iconType: "integration",
  },
  {
    title: "Building Full-Stack Web & AI-Powered Apps",
    description:
      "Designing and building complete applications — from polished, interactive interfaces to the AI-powered features running underneath them.",
    iconType: "interactive",
  },
  {
    title: "Integrating AI Into Real Products",
    description:
      "Connecting AI services into your existing systems and workflows, turning them from a demo into something reliable your users can depend on.",
    iconType: "design",
  },
  {
    title: "Making Everything Fast Under Real Load",
    description:
      "Tuning and optimizing your website or application so it stays fast and responsive as your traffic and data grow, not just in the demo.",
    iconType: "performance",
  },
  {
    title: "Leading Teams and Technical Direction",
    description:
      "Providing technical leadership for your engineering team — architecture decisions, code review, mentorship, and keeping the project on a solid long-term path.",
    iconType: "usability",
  },
  {
    title: "Keeping Systems Running and Scaling Smoothly",
    description:
      "Ongoing support to keep your systems secure, stable, and ready to scale as your business needs grow.",
    iconType: "maintenance",
  },
];

/** Hairline grid: a 1px gap over a line-colored background draws the dividers. */
export default function Services() {
  return (
    <div className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
      {SERVICES.map((s) => (
        <ServiceCard key={s.iconType} {...s} className="bg-ink" />
      ))}
    </div>
  );
}
