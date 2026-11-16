// Root layout for the blog. It's a separate root layout (the rest of the site lives in app/(site))
// so <html lang dir> matches the page language: Arabic pages are served as lang="ar" dir="rtl".
import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import { fontVariables } from "@/lib/fonts";
import ThemeSync, { themeBootScript } from "@/components/theme-sync";
import "@/app/globals.css";
import "./blog.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { LOCALES, dict, isLocale, localeMeta } from "@/lib/blog";
import { SITE_URL, indexableRobots, siteConfig } from "@/lib/site";

const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "600", "700"],
  variable: "--font-arabic",
});

export const dynamicParams = false;
export const generateStaticParams = () => LOCALES.map((lang) => ({ lang }));

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: siteConfig.themeColor,
};

type Props = { children: React.ReactNode; params: Promise<{ lang: string }> };

// Site-wide defaults for blog pages. Every page sets its own title, description,
// canonical, hreflang and Open Graph (re-spreading these shared fields).
export async function generateMetadata({ params }: Pick<Props, "params">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = dict[lang];
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: t.blogSeoTitle, template: `%s | ${t.brand}` },
    description: t.blogDescription,
    applicationName: t.brand,
    authors: [{ name: t.brand, url: SITE_URL }],
    creator: siteConfig.name,
    robots: indexableRobots,
    formatDetection: { email: false, address: false, telephone: false },
    twitter: { card: "summary_large_image" },
  };
}

export default async function BlogRootLayout({ children, params }: Props) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const { dir } = localeMeta[lang];

  return (
    <html suppressHydrationWarning lang={lang} dir={dir} className={`dark ${fontVariables} ${plexArabic.variable}`} style={{ colorScheme: "dark" }}>
      <head>
        {/* Applies the saved gaming-class theme before paint. */}
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
      </head>
      <body className="blog-body min-h-screen overflow-x-hidden">
        <ThemeSync />
        {/* Site chrome is English-only, so keep it LTR inside Arabic pages. */}
        <div dir="ltr" lang="en">
          <Header />
        </div>
        {children}
        <div dir="ltr" lang="en">
          <Footer />
        </div>
      </body>
    </html>
  );
}
