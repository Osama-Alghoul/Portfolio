import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface Character {
  id: string;
  name: string;
  avatar: string;
}

interface PlayerState {
  xp: number;
  level: number;
  character: Character | null;
  collectedXP: string[];

  // Actions
  addXP: (id: string, amount: number) => void;
  setCharacter: (character: Character) => void;
  resetSave: () => void;
}

const XP_PER_LEVEL = 100;

export const usePlayerStore = create<PlayerState>()(
  persist(
    (set, get) => ({
      xp: 0,
      level: 1,
      character: null,
      collectedXP: [],

      addXP: (id, amount) => {
        const { collectedXP, xp } = get();

        // Prevent duplicate XP collection
        if (collectedXP.includes(id)) return;

        const newTotalXp = xp + amount;
        const newLevel = Math.floor(newTotalXp / XP_PER_LEVEL) + 1;

        set({
          xp: newTotalXp,
          level: newLevel,
          collectedXP: [...collectedXP, id],
        });
      },

      setCharacter: (character) => set({ character }),

      resetSave: () =>
        set({
          xp: 0,
          level: 1,
          character: null,
          collectedXP: [],
        }),
    }),
    {
      name: "portfolio-save-v2",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
