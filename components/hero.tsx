"use client";

import Image from "next/image";
import { CustomButton } from "./custom-button";
import { usePlayerStore, Character } from "@/lib/store";
import { Wand2, Sword, Shield } from "lucide-react";

export default function Hero() {
  const { setCharacter, addXP, character } = usePlayerStore();

  const characters: Character[] = [
    { id: "mage", name: "Mage Architect", avatar: "/Me.png" },
    { id: "warrior", name: "Warrior Coder", avatar: "/Me.png" },
    { id: "rogue", name: "Shadow Dev", avatar: "/Me.png" },
  ];

  const handleSelect = (char: Character) => {
    setCharacter(char);
    addXP(`char_select_${char.id}`, 50);
  };

  return (
    <div className="container px-4 md:px-6 h-full flex items-center justify-center relative z-10">
      <div className="flex flex-col items-center text-center space-y-8">
        <div className="relative">
          <div className="h-40 w-40 rounded-full border-4 border-gold/50 p-1 overflow-hidden">
            <Image
              src="/Me.png"
              alt="Osama Alghoul"
              width={160}
              height={160}
              className="object-cover rounded-full group-hover:scale-110 transition-transform duration-700"
            />
          </div>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-gold px-3 py-1 rounded text-[10px] font-black uppercase text-black italic">
            Founder
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white uppercase italic">
            Osama <span className="text-gold">Alghoul</span>
          </h1>
          <p className="text-blue-400 text-lg md:text-xl font-medium tracking-[0.3em] uppercase">
            Software Engineer & Web Developer
          </p>
        </div>

        {!character ? (
          <div className="space-y-6 max-w-xl animate-in fade-in slide-in-from-bottom-5 duration-700">
            <div className="space-y-2">
              <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-bold">
                Select Your Paradigm
              </p>
              <div className="grid grid-cols-3 gap-4">
                {characters.map((char) => (
                  <button
                    key={char.id}
                    onClick={() => handleSelect(char)}
                    className="group flex flex-col items-center gap-3 p-4 rounded-xl border border-white/10 bg-white/5 hover:border-gold/50 hover:bg-gold/5 transition-all"
                  >
                    <div className="p-3 rounded-lg bg-black/50 border border-white/5 group-hover:border-gold/30 transition-colors">
                      {char.id === "mage" && (
                        <Wand2 className="w-5 h-5 text-purple-400" />
                      )}
                      {char.id === "warrior" && (
                        <Sword className="w-5 h-5 text-red-400" />
                      )}
                      {char.id === "rogue" && (
                        <Shield className="w-5 h-5 text-emerald-400" />
                      )}
                    </div>
                    <span className="text-[10px] font-bold text-white/70 group-hover:text-gold uppercase tracking-tighter">
                      {char.id}
                    </span>
                  </button>
                ))}
              </div>
            </div>
            <p className="text-[10px] text-white/30 italic">
              Selecting a paradigm grants{" "}
              <span className="text-gold">+50 XP</span>
            </p>
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-4 animate-in fade-in zoom-in-95 duration-500">
            <CustomButton
              href="#projects"
              className="h-12 px-8 text-sm uppercase tracking-widest font-black italic"
            >
              Enter The Grid
            </CustomButton>
            <CustomButton
              href="#about"
              variant="outline"
              className="h-12 px-8 text-sm uppercase tracking-widest font-black italic border-white/20"
            >
              View Dossier
            </CustomButton>
          </div>
        )}
      </div>
    </div>
  );
}
