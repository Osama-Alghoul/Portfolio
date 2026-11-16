import type { Metadata } from "next";
import Hero from "@/components/hero";
import Section from "@/components/section";
import SocialLinks from "@/components/social-links";
import TechStack from "@/components/tech-stack";
import GithubActivity from "@/components/github-activity";
import Experience from "@/components/experience";
import Services from "@/components/services";
import Projects from "@/components/Projects";
import BlogPreview from "@/components/blog-preview";
import Contact from "@/components/contact";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

// GitHub activity is fetched at build time and refreshed hourly.
export const revalidate = 3600;

const Divider = () => <div aria-hidden className="stripes" />;

export default function Home() {
  return (
    <main className="rail min-h-screen">
      <Hero />

      <div className="px-5 pb-14 sm:px-10">
        <SocialLinks variant="chips" />
      </div>

      <Divider />

      <Section id="stack" index="01" label="toolbox" title="Tech stack">
        {/* Bleed the marquee to the rails. */}
        <div className="-mx-5 sm:-mx-10">
          <TechStack />
        </div>
      </Section>

      <Divider />

      <Section id="activity" index="02" label="proof of work" title="GitHub activity">
        <GithubActivity />
      </Section>

      <Divider />

      <Section id="experience" index="03" label="journey" title="Experience">
        <Experience />
      </Section>

      <Divider />

      <Section id="services" index="04" label="what I do" title="Services">
        <Services />
      </Section>

      <Divider />

      <Section id="projects" index="05" label="loot" title="Projects">
        <Projects />
      </Section>

      <Divider />

      <Section id="writing" index="06" label="notes from the workshop" title="Writing">
        <BlogPreview />
      </Section>

      <Divider />

      <Contact />
    </main>
  );
}
