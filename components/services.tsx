import { CustomButton } from "./custom-button";
import { ServiceCard } from "./service-card";

export default function Services() {
  const services = [
    {
      title: "Designing Systems That Scale With You",
      description:
        "Architecting strong technical foundations and scalable systems from day one, so your product can grow without needing a constant rebuild.",
      iconType: "integration" as const,
    },
    {
      title: "Building Full-Stack Web & AI-Powered Apps",
      description:
        "Designing and building complete applications — from polished, interactive interfaces to the AI-powered features running underneath them.",
      iconType: "interactive" as const,
    },
    {
      title: "Integrating AI Into Real Products",
      description:
        "Connecting AI services into your existing systems and workflows, turning them from a demo into something reliable your users can depend on.",
      iconType: "design" as const,
    },
    {
      title: "Making Everything Fast Under Real Load",
      description:
        "Tuning and optimizing your website or application so it stays fast and responsive as your traffic and data grow, not just in the demo.",
      iconType: "performance" as const,
    },
    {
      title: "Leading Teams and Technical Direction",
      description:
        "Providing technical leadership for your engineering team — architecture decisions, code review, mentorship, and keeping the project on a solid long-term path.",
      iconType: "usability" as const,
    },
    {
      title: "Keeping Systems Running and Scaling Smoothly",
      description:
        "Ongoing support to keep your systems secure, stable, and ready to scale as your business needs grow.",
      iconType: "maintenance" as const,
    },
  ];
  return (
    <section id="services" className="py-20 bg-black/95">
      <div className="container px-4 md:px-6 mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gold">
          My Services
        </h2>
        <p className="text-blue-400 text-center max-w-3xl mx-auto mb-12">
          I help businesses architect, build, and scale technical systems —
          from strong infrastructure to AI integration
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <ServiceCard
              key={service.title}
              title={service.title}
              description={service.description}
              iconType={service.iconType}
              className="service-card"
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <CustomButton href="#contact">Discuss Your Project</CustomButton>
        </div>
      </div>
    </section>
  );
}
