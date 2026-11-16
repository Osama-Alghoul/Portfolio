import Link from "next/link";
import SocialLinks from "./social-links";

const EXPLORE = [
  { href: "/#projects", label: "Projects" },
  { href: "/#experience", label: "Experience" },
  { href: "/blog", label: "Blog" },
  { href: "/gaming", label: "Gaming" },
  { href: "/blog/en/feed.xml", label: "RSS" },
];

export default function Footer() {
  return (
    <footer className="rail border-t border-line px-5 pb-10 pt-12 sm:px-10">
      <div className="grid gap-10 sm:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-serif text-2xl italic text-fg">
            Osama <span className="text-brand">Alghoul</span>
          </p>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-faint">
            Software engineer building scalable systems with AI at the core. Player two when the work is done.
          </p>
        </div>
        <nav aria-label="Footer">
          <p className="kicker mb-3">Explore</p>
          <ul className="space-y-2 text-sm">
            {EXPLORE.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-dim transition-colors hover:text-brand">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="kicker mb-3">Elsewhere</p>
          <SocialLinks size="sm" />
        </div>
      </div>
      <p className="mt-12 font-mono text-[11px] text-faint">
        © {new Date().getFullYear()} Osama Alghoul (OsssGhoul). Built with Next.js.
      </p>
    </footer>
  );
}
