import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type ThemeState = {
  darkMode: boolean;
  toggleDarkMode: () => void;
};

export const useThemeStore = create(
  persist<ThemeState>(
    (set) => ({
      darkMode: false,
      toggleDarkMode: (): void =>
        set((state: ThemeState): { darkMode: boolean } => ({
          darkMode: !state.darkMode,
        })),
    }),
    {
      name: 'theme-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
