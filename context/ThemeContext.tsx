import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { THEMES, ThemeName, ThemeObject } from '../constants/themes';

const STORAGE_KEY = '@app_theme';

type ThemeContextType = {
  themeName: ThemeName;
  theme: ThemeObject;
  setThemeName: (name: ThemeName) => Promise<void>;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeName, setThemeNameState] = useState<ThemeName>('default');

  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored && (stored in THEMES)) {
          // @ts-ignore
          setThemeNameState(stored);
        }
      } catch (e) {
        // ignore
      }
    })();
  }, []);

  const setThemeName = async (name: ThemeName) => {
    setThemeNameState(name);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, name);
    } catch (e) {
      // ignore
    }
  };

  const theme = THEMES[themeName];

  return (
    <ThemeContext.Provider value={{ themeName, theme, setThemeName }}>
      {children}
    </ThemeContext.Provider>
  );
};

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider');
  return ctx;
}
