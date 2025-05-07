import { createContext, useContext } from "react";

export type Theme = "dark" | "light";
export type ThemeProviderStates = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

export const initialState = {
  theme: "light",
  setTheme: () => null,
} as const satisfies ThemeProviderStates;

export const ThemeProviderContext = createContext<Readonly<ThemeProviderStates>>(initialState);
export const useThemeProvider = () => {
  const context = useContext(ThemeProviderContext);
  if (context === undefined) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};
