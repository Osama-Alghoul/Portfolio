// Unmatched URLs. Needed because the app has two root layouts: app/(site) and app/blog/[lang].
import "@/app/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NotFoundPage from "@/app/(site)/not-found";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  robots: { index: false, follow: false },
};

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white`}>
        <NotFoundPage />
      </body>
    </html>
  );
}
