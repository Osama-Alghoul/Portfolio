import { ArrowUpRight, Mail } from "lucide-react";
import SocialLinks from "./social-links";

const EMAIL = "osamalghoul2@gmail.com";

export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="px-5 py-20 text-center sm:px-10">
      <p className="kicker">
        Final quest · <span className="text-brand">establish connection</span>
      </p>
      <h2 id="contact-title" className="mt-3 font-serif text-5xl tracking-tight text-fg sm:text-6xl">
        Have a project{" "}
        <span className="bg-linear-to-r from-brand to-[var(--brand-2)] bg-clip-text pe-1 italic text-transparent">in mind?</span>
      </h2>
      <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-dim">
        Architecture, a full product build, or an AI feature that has to hold up in production. Send a signal and
        I&apos;ll get back to you.
      </p>

      <a
        href={`mailto:${EMAIL}`}
        className="group mx-auto mt-8 inline-flex items-center gap-3 rounded-full border border-line bg-chip py-2 pe-3 ps-4 text-sm text-fg transition-colors hover:border-brand/50 hover:bg-hover"
      >
        <Mail aria-hidden className="h-4 w-4 text-brand" />
        {EMAIL}
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand text-ink">
          <ArrowUpRight aria-hidden className="h-4 w-4 transition-transform group-hover:rotate-45" />
        </span>
      </a>

      <SocialLinks className="mt-10 justify-center" />
    </section>
  );
}
