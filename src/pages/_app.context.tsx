import { createContext } from 'react';

interface ThemeContextProperties {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export const ThemeContext = createContext<ThemeContextProperties>({
  darkMode: false,
  toggleDarkMode: () => {},
});
