import { Card, CardContent } from "./ui/card";
import { Briefcase, FileText, Mail } from "lucide-react";
import SocialLinks from "./social-links";
import { CustomButton } from "./custom-button";
import { CV_URL } from "@/lib/site";

const EMAIL = "osamalghoul2@gmail.com";

export default function Contact() {
  return (
    <section id="contact" className="h-full flex items-center bg-black/95 py-20">
      <div className="container px-4 md:px-6 mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gold">
          Let&apos;s Work Together
        </h2>
        <p className="text-blue-400 text-center max-w-2xl mx-auto mb-12">
          Available for full-time roles, contracts, and freelance projects. I
          can start immediately.
        </p>

        <div className="max-w-xl mx-auto">
          <Card className="bg-blue-950/20 border border-blue-900/40 shadow-[0_0_50px_rgba(30,58,138,0.25)] hover:border-gold/40 transition-colors duration-500">
            <CardContent className="p-8 md:p-10 space-y-8">
              <div className="space-y-3">
                <p className="text-xs text-white/60 uppercase tracking-[0.2em] font-semibold">
                  Email
                </p>
                <a
                  href={`mailto:${EMAIL}`}
                  className="flex items-center p-4 rounded-xl bg-black/60 border border-white/5 hover:border-blue-500/50 transition-colors text-blue-400 hover:text-gold text-lg font-semibold break-all"
                >
                  <Mail aria-hidden className="mr-4 h-6 w-6 shrink-0" />
                  {EMAIL}
                </a>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <CustomButton
                  href={`mailto:${EMAIL}?subject=${encodeURIComponent("Hiring inquiry")}`}
                  variant="gold"
                  className="h-12 font-semibold"
                >
                  <Briefcase aria-hidden className="mr-2 h-4 w-4" />
                  Hire Me
                </CustomButton>
                <CustomButton
                  href={CV_URL}
                  external
                  variant="outline"
                  className="h-12 font-semibold"
                >
                  <FileText aria-hidden className="mr-2 h-4 w-4" />
                  Show CV
                </CustomButton>
              </div>

              <div className="space-y-4">
                <p className="text-xs text-white/60 uppercase tracking-[0.2em] font-semibold">
                  Find me online
                </p>
                <div className="flex justify-center md:justify-start">
                  <SocialLinks size="lg" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
