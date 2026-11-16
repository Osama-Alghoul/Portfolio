import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "404", robots: { index: false, follow: false } };

// not-found files don't receive params, so this one is bilingual.
export default function BlogNotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">
      <h1 className="text-3xl font-bold text-fg md:text-4xl">404</h1>
      <p lang="ar" dir="rtl" className="text-lg text-dim">المقال غير موجود.</p>
      <p lang="en" dir="ltr" className="text-lg text-dim">This article doesn&apos;t exist.</p>
      <Link href="/blog" className="mt-2 rounded-md bg-brand px-4 py-2 text-sm font-medium text-ink hover:bg-brand/85">
        المدونة · Blog
      </Link>
    </main>
  );
}
