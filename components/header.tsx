"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { BookOpen, Gamepad2, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { CustomButton } from "./custom-button";

/** Home-page sections linked from the nav. */
const SECTIONS = [
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "projects", label: "Projects" },
  { id: "content", label: "Content" },
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
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setIsMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isMenuOpen]);

  const sectionHref = (id: string) => (isHomePage ? `#${id}` : `/#${id}`);
  const closeMenu = () => setIsMenuOpen(false);

  const linkClass = "text-gray-300 hover:text-gold transition-colors";
  const blogClass = cn(
    "inline-flex items-center gap-1.5 transition-colors",
    isBlogPage ? "text-gold" : "text-gray-300 hover:text-gold",
  );
  const gamingClass = cn(
    "inline-flex items-center gap-1.5 transition-colors",
    isGamingPage ? "text-gold" : "text-gray-300 hover:text-gold",
  );

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled || isMenuOpen ? "bg-black/90 backdrop-blur-sm py-2 shadow-md" : "bg-transparent py-4",
      )}
    >
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/placeholder.svg?height=30&width=30"
              alt=""
              width={30}
              height={30}
              className="object-cover"
            />
            <span className="font-bold text-gold">Osama Alghoul</span>
          </Link>

          {/* Desktop navigation */}
          <nav aria-label="Main" className="hidden md:flex items-center gap-6">
            {SECTIONS.map((s) => (
              <Link key={s.id} href={sectionHref(s.id)} className={linkClass}>
                {s.label}
              </Link>
            ))}
            <Link href="/blog" className={blogClass} aria-current={isBlogPage ? "page" : undefined}>
              <BookOpen aria-hidden className="h-4 w-4" />
              Blog
            </Link>
            <Link href="/gaming" className={gamingClass} aria-current={isGamingPage ? "page" : undefined}>
              <Gamepad2 aria-hidden className="h-4 w-4" />
              Gaming
            </Link>
            <CustomButton href={sectionHref("contact")}>Contact</CustomButton>
          </nav>

          <button
            type="button"
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-md text-gray-300 hover:text-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsMenuOpen((o) => !o)}
          >
            {isMenuOpen ? <X aria-hidden className="h-6 w-6" /> : <Menu aria-hidden className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation */}
      {isMenuOpen && (
        <div id="mobile-nav" className="md:hidden bg-black/95 backdrop-blur-sm">
          <nav aria-label="Main" className="container px-4 py-4 flex flex-col gap-4">
            {SECTIONS.map((s) => (
              <Link
                key={s.id}
                href={sectionHref(s.id)}
                className={cn(linkClass, "py-2 border-b border-blue-900/30")}
                onClick={closeMenu}
              >
                {s.label}
              </Link>
            ))}
            <Link
              href="/blog"
              className={cn(blogClass, "py-2 border-b border-blue-900/30")}
              aria-current={isBlogPage ? "page" : undefined}
              onClick={closeMenu}
            >
              <BookOpen aria-hidden className="h-4 w-4" />
              Blog
            </Link>
            <Link
              href="/gaming"
              className={cn(gamingClass, "py-2 border-b border-blue-900/30")}
              aria-current={isGamingPage ? "page" : undefined}
              onClick={closeMenu}
            >
              <Gamepad2 aria-hidden className="h-4 w-4" />
              Gaming
            </Link>
            <Link
              href={sectionHref("contact")}
              onClick={closeMenu}
              className="mt-2 inline-flex w-full items-center justify-center rounded-md bg-blue-600 hover:bg-blue-700 px-4 py-2 text-sm font-medium text-white transition-colors"
            >
              Contact
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
