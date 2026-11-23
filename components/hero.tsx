import Image from "next/image";
import { Briefcase, FileText } from "lucide-react";
import { CustomButton } from "./custom-button";
import { CV_URL } from "@/lib/site";

export default function Hero() {
  return (
    <div className="container px-4 md:px-6 h-full flex items-center justify-center relative z-10">
      <div className="flex flex-col items-center text-center space-y-8">
        <div className="relative">
          <div className="rounded-tr-[48px] rounded-bl-[48px] border-4 border-gold/50 p-1 overflow-hidden bg-[#1a2350]">
            <Image
              src="/Me.png"
              alt="Osama Alghoul"
              width={160}
              height={160}
              priority
              className="object-cover rounded-tr-[44px] rounded-bl-[44px]"
            />
          </div>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-gold px-3 py-1 rounded text-[10px] font-bold uppercase tracking-wider text-black">
            Founder
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white">
            Osama <span className="text-gold">Alghoul</span>
          </h1>
          <p className="text-blue-400 text-lg md:text-xl font-medium tracking-[0.2em] uppercase">
            Software Engineer
          </p>
          <p className="max-w-2xl mx-auto text-gray-300 text-base md:text-lg leading-relaxed">
            I design, build, and scale web platforms with AI integrations using
            React, Next.js, and TypeScript on a solid infrastructure.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 animate-in fade-in slide-in-from-bottom-5 duration-700">
          <CustomButton
            href="#contact"
            variant="gold"
            className="h-12 px-8 text-sm font-semibold"
          >
            <Briefcase aria-hidden className="mr-2 h-4 w-4" />
            Hire Me
          </CustomButton>
          <CustomButton
            href={CV_URL}
            external
            variant="outline"
            className="h-12 px-8 text-sm font-semibold"
          >
            <FileText aria-hidden className="mr-2 h-4 w-4" />
            Show CV
          </CustomButton>
        </div>
      </div>
    </div>
  );
}
