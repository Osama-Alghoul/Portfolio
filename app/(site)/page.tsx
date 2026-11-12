import type { Metadata } from "next";
import About from "@/components/aboutSection";
import Projects from "@/components/Projects";
import Content from "@/components/Content";
import HeroSection from "@/components/heroSection";
import Contact from "@/components/contact";
import Services from "@/components/services";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <HeroSection />
      <About />
      <Services />
      <Projects />
      <Content />
      <Contact />
    </main>
  );
}
