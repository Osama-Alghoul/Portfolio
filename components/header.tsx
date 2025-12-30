"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { CustomButton } from "./custom-button";
import Image from "next/image";
import PlayerHUD from "./player-hud";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Helper function to determine the correct link format
  const getSectionLink = (section: string) => {
    return isHomePage ? `#${section}` : `/#${section}`;
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-black/90 backdrop-blur-sm py-2 shadow-md"
          : "bg-transparent py-4"
      )}
    >
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/placeholder.svg?height=30&width=30"
              alt="Profile"
              width={30}
              height={30}
              className="object-cover"
            />
            <span className="font-bold text-gold">Osama Alghoul</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href={getSectionLink("about")}
              className="text-gray-300 hover:text-gold transition-colors"
            >
              About
            </Link>
            <Link
              href={getSectionLink("services")}
              className="text-gray-300 hover:text-gold transition-colors"
            >
              Services
            </Link>
            <Link
              href={getSectionLink("projects")}
              className="text-gray-300 hover:text-gold transition-colors"
            >
              Projects
            </Link>
            <Link
              href={getSectionLink("content")}
              className="text-gray-300 hover:text-gold transition-colors"
            >
              Content
            </Link>
            <CustomButton href={getSectionLink("contact")}>
              Contact
            </CustomButton>
          </nav>

          {/* Mobile Menu Button & HUD */}
          <div className="flex md:hidden items-center gap-4">
            <PlayerHUD variant="inline" />
            <button
              className="text-gray-300 p-2 rounded-md hover:bg-blue-900/20"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-sm">
          <nav className="container px-4 py-4 flex flex-col gap-4">
            <Link
              href={getSectionLink("about")}
              className="text-gray-300 hover:text-gold transition-colors py-2 border-b border-blue-900/30"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href={getSectionLink("services")}
              className="text-gray-300 hover:text-gold transition-colors py-2 border-b border-blue-900/30"
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              href={getSectionLink("projects")}
              className="text-gray-300 hover:text-gold transition-colors py-2 border-b border-blue-900/30"
              onClick={() => setIsMenuOpen(false)}
            >
              Projects
            </Link>
            <Link
              href={getSectionLink("content")}
              className="text-gray-300 hover:text-gold transition-colors py-2 border-b border-blue-900/30"
              onClick={() => setIsMenuOpen(false)}
            >
              Content
            </Link>
            <CustomButton
              href={getSectionLink("contact")}
              className="w-full mt-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </CustomButton>
          </nav>
        </div>
      )}
    </header>
  );
}
