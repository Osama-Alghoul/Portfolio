// Shared type scale for both root layouts (app/(site) and app/blog/[lang]).
// Inter for body copy, Instrument Serif (italic) for display headings, JetBrains Mono for labels.
import { Inter, Instrument_Serif, JetBrains_Mono } from "next/font/google";

export const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const fontVariables = `${inter.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`;
