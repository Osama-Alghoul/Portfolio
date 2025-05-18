'use client'

import React from 'react';
import { useInView } from 'react-intersection-observer';
import SkillsSet from './skills';
import { CustomButton } from './custom-button';

export default function About() {
  const [firstDivRef, firstDivInView] = useInView({
    triggerOnce: true,
  });

  const [secondDivRef, secondDivInView] = useInView({
    triggerOnce: true,
  });

  return (
    <section id="about" className="py-20 bg-black">
      <div className="container px-4 md:px-6 mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gold">About Me</h2>
        <div className="grid md:grid-cols-2 gap-9 md:gap-0 items-center">
          <div
            ref={firstDivRef}
            className={`transition-all duration-1000 ${firstDivInView ? 'slide-in-left' : 'opacity-0'}`}
          >
            <svg className="mx-auto" width="359" height="236" viewBox="0 0 359 236" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="126.335" y="22.832" width="26" height="154.102" rx="13" transform="rotate(55 126.335 22.832)" fill="#F3AC39" />
              <rect x="142" y="6.10544" width="26" height="235.937" rx="13" transform="rotate(-13.5813 142 6.10544)" fill="#F3AC39" />
              <rect x="134.761" y="196.055" width="26" height="154.102" rx="13" transform="rotate(130 134.761 196.055)" fill="#F3AC39" />
              <rect width="26" height="154.102" rx="13" transform="matrix(-0.573576 0.819152 0.819152 0.573576 231.913 21)" fill="#F3AC39" />
              <rect width="26" height="154.102" rx="13" transform="matrix(0.642788 0.766044 0.766044 -0.642788 223.487 194.223)" fill="#F3AC39" />
            </svg>
          </div>
          <div
            ref={secondDivRef}
            className={`space-y-4 transition-all duration-1000 ${secondDivInView ? 'slide-in-right' : 'opacity-0'}`}
          >
            <p className="text-lg text-gray-300">
              Hello! I&apos;m a passionate software engineer and web developer with expertise in modern web technologies. I
              specialize in building responsive, user-friendly applications using React, Next.js, and TypeScript with 5 years of experience and 4
              monthes of internship. Here is my
              full programming skills:
            </p>
            <SkillsSet />
            <div className="flex flex-wrap gap-4 pt-4">
              <CustomButton href="#contact">Get In Touch</CustomButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
