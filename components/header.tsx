"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { BookOpen, Gamepad2, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

/** Home-page sections linked from the nav. */
const SECTIONS = [
  { id: "experience", label: "Experience" },
  { id: "services", label: "Services" },
  { id: "projects", label: "Projects" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const isGamingPage = pathname === "/gaming";
  const isBlogPage = pathname === "/blog" || pathname.startsWith("/blog/");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close the mobile menu on navigation and on Escape.
  useEffect(() => setIsMenuOpen(false), [pathname]);
  useEffect(() => {
    if (!isMenuOpen) return;
    const onKey = (e: KeyboardEvent) =>
      e.key === "Escape" && setIsMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isMenuOpen]);

  const sectionHref = (id: string) => (isHomePage ? `#${id}` : `/#${id}`);
  const closeMenu = () => setIsMenuOpen(false);

  const linkClass = "text-dim transition-colors hover:text-fg";
  const pageClass = (active: boolean) =>
    cn(
      "inline-flex items-center gap-1.5 transition-colors",
      active ? "text-brand" : "text-dim hover:text-fg",
    );

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "rail border-0 transition-colors duration-300 rounded-[20px]",
          isScrolled || isMenuOpen
            ? "bg-ink/80 backdrop-blur-md"
            : "bg-transparent",
        )}
      >
        <div className="rail flex h-14 items-center justify-between px-5 sm:px-10 border-none">
          <Link href="/" className="group flex items-center gap-2.5">
            <Image
              src="/Me.png"
              alt=""
              width={24}
              height={24}
              className="h-6 w-6 rounded-md border border-brand/40 object-cover"
            />
            <span className="text-sm font-medium text-fg">Osama Alghoul</span>
            <span className="hidden font-mono text-[11px] text-faint sm:inline">
              / OsssGhoul
            </span>
          </Link>

          {/* Desktop navigation */}
          <nav
            aria-label="Main"
            className="hidden items-center gap-5 text-[13px] md:flex"
          >
            {SECTIONS.map((s) => (
              <Link key={s.id} href={sectionHref(s.id)} className={linkClass}>
                {s.label}
              </Link>
            ))}
            <Link
              href="/blog"
              className={pageClass(isBlogPage)}
              aria-current={isBlogPage ? "page" : undefined}
            >
              <BookOpen aria-hidden className="h-3.5 w-3.5" />
              Blog
            </Link>
            <Link
              href="/gaming"
              className={pageClass(isGamingPage)}
              aria-current={isGamingPage ? "page" : undefined}
            >
              <Gamepad2 aria-hidden className="h-3.5 w-3.5" />
              Gaming
            </Link>
            <Link
              href={sectionHref("contact")}
              className="rounded-md bg-brand px-3 py-1.5 text-[13px] font-medium text-ink transition-colors hover:bg-brand/85"
            >
              Contact
            </Link>
          </nav>

          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-dim hover:text-fg focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/60 md:hidden"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsMenuOpen((o) => !o)}
          >
            {isMenuOpen ? (
              <X aria-hidden className="h-5 w-5" />
            ) : (
              <Menu aria-hidden className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <nav
            id="mobile-nav"
            aria-label="Main"
            className="flex flex-col border-t border-line px-5 py-3 text-sm md:hidden"
          >
            {SECTIONS.map((s) => (
              <Link
                key={s.id}
                href={sectionHref(s.id)}
                className={cn(linkClass, "border-b border-line py-3")}
                onClick={closeMenu}
              >
                {s.label}
              </Link>
            ))}
            <Link
              href="/blog"
              className={cn(pageClass(isBlogPage), "border-b border-line py-3")}
              aria-current={isBlogPage ? "page" : undefined}
              onClick={closeMenu}
            >
              <BookOpen aria-hidden className="h-4 w-4" />
              Blog
            </Link>
            <Link
              href="/gaming"
              className={cn(
                pageClass(isGamingPage),
                "border-b border-line py-3",
              )}
              aria-current={isGamingPage ? "page" : undefined}
              onClick={closeMenu}
            >
              <Gamepad2 aria-hidden className="h-4 w-4" />
              Gaming
            </Link>
            <Link
              href={sectionHref("contact")}
              onClick={closeMenu}
              className="mt-3 inline-flex w-full items-center justify-center rounded-md bg-brand px-4 py-2 font-medium text-ink"
            >
              Contact
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
