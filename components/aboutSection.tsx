"use client";

import React from "react";
import { useInView } from "react-intersection-observer";
import SkillsSet from "./skills";
import { CustomButton } from "./custom-button";
import { usePlayerStore } from "@/lib/store";
import { XPNode } from "./xp-node";

export default function About() {
  const { character } = usePlayerStore();
  const [firstDivRef, firstDivInView] = useInView({
    triggerOnce: true,
  });

  const [secondDivRef, secondDivInView] = useInView({
    triggerOnce: true,
  });

  const stats = [
    { name: "Intelligence", value: 92, color: "bg-blue-500" },
    { name: "Strength", value: 75, color: "bg-red-500" },
    { name: "Agility", value: 88, color: "bg-emerald-500" },
  ];

  if (!character) return null;

  return (
    <section
      id="about"
      className="h-full flex items-center bg-black overflow-hidden py-12"
    >
      <div className="container px-4 md:px-6 mx-auto">
        <XPNode id="about_lore_read" amount={30}>
          <h2 className="text-3xl md:text-5xl font-black text-center mb-16 text-gold uppercase italic tracking-widest">
            Character Profile
          </h2>
        </XPNode>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div
            ref={firstDivRef}
            className={`transition-all duration-1000 ${
              firstDivInView ? "slide-in-left" : "opacity-0"
            }`}
          >
            <div className="space-y-6 bg-blue-950/20 p-8 rounded-2xl border-2 border-blue-900/30 backdrop-blur-md shadow-2xl relative">
              <div className="absolute -top-3 left-6 bg-blue-600 px-3 py-1 rounded text-[10px] font-bold uppercase tracking-tighter shadow-lg">
                Level 1 Stats
              </div>
              <h3 className="text-xl font-black text-white uppercase tracking-widest mb-6 italic">
                Base Attributes
              </h3>
              {stats.map((stat) => (
                <div key={stat.name} className="space-y-2">
                  <div className="flex justify-between text-[10px] font-black uppercase text-white/50 tracking-widest">
                    <span>{stat.name}</span>
                    <span className="text-gold">{stat.value}%</span>
                  </div>
                  <div className="h-2.5 w-full bg-black/40 rounded-full overflow-hidden border border-white/5">
                    <div
                      className={`h-full ${stat.color} transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(255,255,255,0.1)]`}
                      style={{
                        width: firstDivInView ? `${stat.value}%` : "0%",
                      }}
                    />
                  </div>
                </div>
              ))}
              <div className="pt-6 border-t border-white/5">
                <p className="text-[10px] text-white/30 leading-relaxed uppercase tracking-tighter font-medium">
                  Trait:{" "}
                  <span className="text-white/60">Perpetual Learner</span>
                  <br />
                  Gear:{" "}
                  <span className="text-white/60">
                    Keyboard of Destiny (+10 Speed)
                  </span>
                  <br />
                  Buff:{" "}
                  <span className="text-white/60">
                    Coffee of Focus (+5 Intellect)
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div
            ref={secondDivRef}
            className={`space-y-8 transition-all duration-1000 ${
              secondDivInView ? "slide-in-right" : "opacity-0"
            }`}
          >
            <XPNode id="about_bio_read" amount={20}>
              <p className="text-lg md:text-xl text-gray-300 font-medium leading-relaxed">
                Hello! I&apos;m{" "}
                <span className="text-gold font-black italic underline decoration-gold/30">
                  Osama Alghoul
                </span>
                , a Software Engineer crafting premium digital paradigms. I
                build high-performance systems with React, Next.js, and
                TypeScript.
              </p>
            </XPNode>
            <div className="space-y-4">
              <h4 className="text-xs font-black text-blue-400 uppercase tracking-[0.3em]">
                Skill Tree Unlocked
              </h4>
              <SkillsSet />
            </div>
            <div className="flex flex-wrap gap-4 pt-4">
              <XPNode id="about_contact_cta" amount={10}>
                <CustomButton
                  href="#contact"
                  className="h-12 px-8 uppercase font-black italic tracking-widest"
                >
                  Initialize Quest
                </CustomButton>
              </XPNode>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
