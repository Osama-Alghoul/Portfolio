"use client";

import { Card, CardContent } from "./ui/card";
import { MessageSquare, Sparkles, CheckCircle } from "lucide-react";
import SocialLinks from "./social-links";
import { usePlayerStore } from "@/lib/store";
import { Badge } from "./ui/badge";
import { XPNode } from "./xp-node";

export default function Contact() {
  const { character } = usePlayerStore();

  if (!character) return null;

  return (
    <section
      id="contact"
      className="h-full flex items-center bg-black/95 py-12"
    >
      <div className="container px-4 md:px-6 mx-auto">
        <XPNode id="contact_header" amount={10}>
          <h2 className="text-3xl md:text-5xl font-black text-center mb-12 text-gold tracking-[0.2em] uppercase italic">
            The Final Phase
          </h2>
        </XPNode>

        <div className="max-w-xl mx-auto">
          <Card className="bg-blue-950/20 border-2 border-blue-900/30 shadow-[0_0_50px_rgba(30,58,138,0.3)] hover:border-gold/50 transition-all duration-700 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

            <CardContent className="p-10 space-y-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-gold/10 rounded-xl border border-gold/30">
                  <Sparkles className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-gold uppercase tracking-tighter italic">
                    Quest: Establish Connection
                  </h3>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">
                    Difficulty: Zero-Day
                  </p>
                </div>
              </div>

              <div className="space-y-4 border-l-4 border-gold/30 pl-6 py-2 italic font-serif relative">
                <p className="text-base text-gray-300 leading-relaxed antialiased">
                  &quot;Your journey across the digital layers ends here,
                  traveler. The final objective is clear: send your signal
                  across the expanse. Will you forge a new alliance?&quot;
                </p>
              </div>

              <div className="space-y-8 pt-6">
                <div className="space-y-3">
                  <p className="text-[10px] text-white/40 uppercase tracking-[0.3em] font-black">
                    Transmission Channel
                  </p>
                  <XPNode id="contact_email" amount={50}>
                    <div className="flex items-center p-4 rounded-xl bg-black/60 border border-white/5 hover:border-blue-500/50 transition-all group/item">
                      <MessageSquare className="mr-4 h-6 w-6 text-blue-400 group-hover/item:scale-110 transition-transform" />
                      <a
                        href="mailto:osamalghoul2@gmail.com"
                        className="text-blue-400 hover:text-gold transition-colors text-lg font-black tracking-tight"
                      >
                        osamalghoul2@gmail.com
                      </a>
                      <Badge
                        variant="outline"
                        className="ml-auto text-[10px] border-gold/30 text-gold font-black italic"
                      >
                        +50 XP
                      </Badge>
                    </div>
                  </XPNode>
                </div>

                <div className="space-y-4">
                  <p className="text-[10px] text-white/40 uppercase tracking-[0.3em] font-black">
                    Decrypt Socials
                  </p>
                  <XPNode id="contact_socials" amount={20}>
                    <div className="flex justify-center md:justify-start">
                      <SocialLinks size="lg" />
                    </div>
                  </XPNode>
                </div>
              </div>

              <div className="pt-8 border-t border-white/5 opacity-50">
                <div className="flex items-center justify-between">
                  <p className="text-[10px] text-white/30 italic uppercase tracking-tighter">
                    Achievement: The Golden Handshake
                  </p>
                  <div className="flex items-center gap-1.5 grayscale group-hover:grayscale-0 transition-all">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    <span className="text-[9px] text-emerald-500 font-bold uppercase">
                      Locked
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
