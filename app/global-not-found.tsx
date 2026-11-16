// Unmatched URLs. Needed because the app has two root layouts: app/(site) and app/blog/[lang].
import "@/app/globals.css";
import type { Metadata } from "next";
import { fontVariables } from "@/lib/fonts";
import ThemeSync, { themeBootScript } from "@/components/theme-sync";
import NotFoundPage from "@/app/(site)/not-found";

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  robots: { index: false, follow: false },
};

export default function GlobalNotFound() {
  return (
    <html suppressHydrationWarning lang="en" className={`dark ${fontVariables}`} style={{ colorScheme: "dark" }}>
      <head>
        {/* Applies the saved gaming-class theme before paint. */}
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
      </head>
      <body className="bg-ink text-fg font-sans">
        <ThemeSync />
        <NotFoundPage />
      </body>
    </html>
  );
}
