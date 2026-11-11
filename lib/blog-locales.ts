// Locale constants only: no post data, so it is safe to import from middleware (edge bundle).

export const LOCALES = ["ar", "en"] as const;
export type Locale = (typeof LOCALES)[number];
/** Arabic is the default; visitors whose browser prefers another language get English. */
export const DEFAULT_LOCALE: Locale = "ar";
/** Cookie set by the language switcher; it overrides Accept-Language on later visits. */
export const LOCALE_COOKIE = "blog-lang";

export const isLocale = (v: string | undefined): v is Locale => !!v && (LOCALES as readonly string[]).includes(v);

export const localeMeta: Record<Locale, { dir: "rtl" | "ltr"; ogLocale: string; label: string; dateLocale: string }> = {
  ar: { dir: "rtl", ogLocale: "ar_AR", label: "العربية", dateLocale: "ar-u-nu-latn" },
  en: { dir: "ltr", ogLocale: "en_US", label: "English", dateLocale: "en-US" },
};
