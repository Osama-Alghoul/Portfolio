"use client";

import React from "react";
import { useInView } from "react-intersection-observer";
import { Briefcase, FileText, Globe2, Layers, Sparkles } from "lucide-react";
import SkillsSet from "./skills";
import { CustomButton } from "./custom-button";
import { CV_URL } from "@/lib/site";

const highlights = [
  {
    icon: Briefcase,
    title: "Full-time remote engineer",
    text: "Shipping production work for international teams since 2020.",
  },
  {
    icon: Sparkles,
    title: "AI integration",
    text: "Turning AI services into reliable features inside real products.",
  },
  {
    icon: Layers,
    title: "System design & leadership",
    text: "Architecture, code review, and mentoring for scalable systems.",
  },
  {
    icon: Globe2,
    title: "Arabic & English products",
    text: "Bilingual, RTL-ready interfaces built for speed and SEO.",
  },
];

export default function About() {
  const [firstDivRef, firstDivInView] = useInView({ triggerOnce: true });
  const [secondDivRef, secondDivInView] = useInView({ triggerOnce: true });
  const [stackRef, stackInView] = useInView({ triggerOnce: true });

  return (
    <section
      id="about"
      className="h-full flex items-center bg-black overflow-hidden py-20"
    >
      <div className="container px-4 md:px-6 mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gold">
          About Me
        </h2>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div
            ref={firstDivRef}
            className={`space-y-8 transition-all duration-1000 ${
              firstDivInView ? "slide-in-left" : "opacity-0"
            }`}
          >
            <p className="text-lg md:text-xl text-gray-300 font-medium leading-relaxed">
              Hello! I&apos;m{" "}
              <span className="text-gold font-semibold">Osama Alghoul</span>, a
              Software Engineer & Web Developer based in Palestine. I build
              high-performance web applications with AI integrations using
              React, Next.js, and TypeScript with a focus on clean, maintainable
              code and a strong technical foundation.
            </p>
            <div className="flex flex-wrap gap-4">
              <CustomButton
                href="#contact"
                variant="gold"
                className="h-12 px-8 font-semibold"
              >
                <Briefcase aria-hidden className="mr-2 h-4 w-4" />
                Hire Me
              </CustomButton>
              <CustomButton
                href={CV_URL}
                external
                variant="outline"
                className="h-12 px-8 font-semibold"
              >
                <FileText aria-hidden className="mr-2 h-4 w-4" />
                Show CV
              </CustomButton>
            </div>
          </div>
          <ul
            ref={secondDivRef}
            className={`grid sm:grid-cols-2 gap-4 transition-all duration-1000 ${
              secondDivInView ? "slide-in-right" : "opacity-0"
            }`}
          >
            {highlights.map(({ icon: Icon, title, text }) => (
              <li
                key={title}
                className="bg-blue-950/20 p-6 rounded-2xl border border-blue-900/40 hover:border-gold/40 transition-colors"
              >
                <Icon aria-hidden className="h-6 w-6 text-gold mb-3" />
                <h3 className="text-base font-semibold text-white mb-1">
                  {title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">{text}</p>
              </li>
            ))}
          </ul>
        </div>

        <div
          ref={stackRef}
          className={`mt-16 transition-all duration-1000 ${
            stackInView ? "fade-in" : "opacity-0"
          }`}
        >
          <h3 className="text-xs font-bold text-blue-400 uppercase tracking-[0.3em] text-center mb-6">
            Tech Stack
          </h3>
          <SkillsSet />
        </div>
      </div>
    </section>
  );
}
