import create from 'zustand';

type ThemeState = {
  darkMode: boolean;
  toggleDarkMode: () => void;
};

export const useThemeStore = create<ThemeState>((set) => ({
  darkMode: false,
  toggleDarkMode: (): void =>
    set((state: ThemeState): { darkMode: boolean } => ({
      darkMode: !state.darkMode,
    })),
}));
