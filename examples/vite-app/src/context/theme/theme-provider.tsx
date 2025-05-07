import React, { useEffect, useMemo, useState } from 'react';
import type { Theme, ThemeProviderStates } from './theme-context';
import { ThemeProviderContext } from './theme-context';

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme: Theme;
};

export const ThemeProvider: React.FC<Readonly<ThemeProviderProps>> = ({ children, defaultTheme, ...props }) => {
  const [theme, setTheme] = useState<ThemeProviderStates['theme']>(
    () => (localStorage.getItem('@lync-analytics-dashboard/app-theme') as Theme) || defaultTheme
  );

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  const providerStates = useMemo(
    () =>
      ({
        theme,
        setTheme: (theme: Theme) => {
          localStorage.setItem('@lync-analytics-dashboard/app-theme', theme);
          setTheme(theme);
        },
      } as const satisfies ThemeProviderStates),
    [theme]
  );

  return (
    <ThemeProviderContext.Provider {...props} value={providerStates}>
      {children}
    </ThemeProviderContext.Provider>
  );
};
