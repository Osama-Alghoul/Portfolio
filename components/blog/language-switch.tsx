"use client";

import Link from "next/link";
import { Languages } from "lucide-react";
import { LOCALE_COOKIE, localeMeta, type Locale } from "@/lib/blog-locales";

/**
 * Links to the same page in the other language. Clicking it remembers the choice in a
 * cookie, so the language-neutral URLs (/blog, /blog/<slug>) respect it from then on.
 */
export default function LanguageSwitch({ target, href, label }: { target: Locale; href: string; label: string }) {
  const remember = () => {
    document.cookie = `${LOCALE_COOKIE}=${target}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
  };
  return (
    <Link
      href={href}
      hrefLang={target}
      lang={target}
      dir={localeMeta[target].dir}
      onClick={remember}
      className="inline-flex items-center gap-2 rounded-full border border-blue-800/70 px-3 py-1.5 text-sm text-gray-300 transition-colors hover:border-gold hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
    >
      <Languages aria-hidden className="h-4 w-4" />
      {label}
    </Link>
  );
}
