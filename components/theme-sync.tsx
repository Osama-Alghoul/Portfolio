"use client";

import { useEffect } from "react";
import { usePlayerStore } from "@/lib/store";

/** Gaming classes that have a site theme (see :root[data-theme] in app/globals.css). */
export const THEMED_CLASSES = ["mage", "warrior", "rogue"] as const;

const STORE_KEY = "portfolio-save-v2";

/**
 * Inline <head> script: applies the saved class theme before first paint, so
 * returning players don't see a flash of the default blue.
 */
export const themeBootScript = `try{var s=JSON.parse(localStorage.getItem(${JSON.stringify(STORE_KEY)}));var c=s&&s.state&&s.state.character;if(c&&${JSON.stringify(THEMED_CLASSES)}.indexOf(c.id)>-1)document.documentElement.dataset.theme=c.id}catch(e){}`;

/** Keeps <html data-theme> in sync with the chosen gaming class. Renders nothing. */
export default function ThemeSync() {
  const id = usePlayerStore((s) => s.character?.id);

  useEffect(() => {
    const root = document.documentElement;
    if (id && (THEMED_CLASSES as readonly string[]).includes(id)) root.dataset.theme = id;
    else delete root.dataset.theme;
  }, [id]);

  return null;
}
