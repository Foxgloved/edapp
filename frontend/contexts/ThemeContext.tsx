'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'Light' | 'Dark' | 'System';
type Language = 'English' | 'Spanish' | 'French' | 'German';

interface ThemeContextType {
  theme: Theme;
  language: Language;
  setTheme: (theme: Theme) => void;
  setLanguage: (language: Language) => void;
  effectiveTheme: 'Light' | 'Dark';
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('Light');
  const [language, setLanguageState] = useState<Language>('English');
  const [effectiveTheme, setEffectiveTheme] = useState<'Light' | 'Dark'>('Light');
  const [mounted, setMounted] = useState(false);

  // Load saved preferences from localStorage on mount (non-blocking)
  useEffect(() => {
    setMounted(true);
    
    // Non-blocking localStorage read
    const loadPreferences = () => {
      try {
        const savedTheme = localStorage.getItem('theme') as Theme;
        const savedLanguage = localStorage.getItem('language') as Language;
        
        if (savedTheme) {
          setThemeState(savedTheme);
        } else {
          setThemeState('Light');
        }
        if (savedLanguage) {
          setLanguageState(savedLanguage);
        }
      } catch (e) {
        // Fallback to defaults on error
        setThemeState('Light');
        setLanguageState('English');
      }
    };

    // Defer to next tick to avoid blocking render
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      requestIdleCallback(loadPreferences, { timeout: 50 });
    } else {
      setTimeout(loadPreferences, 0);
    }
  }, []);

  // Update effective theme based on theme setting
  useEffect(() => {
    const updateEffectiveTheme = () => {
      if (theme === 'System') {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setEffectiveTheme(prefersDark ? 'Dark' : 'Light');
      } else {
        setEffectiveTheme(theme);
      }
    };

    updateEffectiveTheme();

    // Listen for system theme changes when in System mode
    if (theme === 'System') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handler = (e: MediaQueryListEvent) => {
        setEffectiveTheme(e.matches ? 'Dark' : 'Light');
      };
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    }
  }, [theme]);

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement;
    if (effectiveTheme === 'Dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [effectiveTheme]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  return (
    <ThemeContext.Provider value={{ theme, language, setTheme, setLanguage, effectiveTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

