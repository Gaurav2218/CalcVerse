import { create } from 'zustand';
import { lightTheme, darkTheme, Theme } from '@/constants/theme';
import { getThemePreference, saveThemePreference } from '@/utils/storage';

interface ThemeState {
  isDark: boolean;
  theme: Theme;
  isInitialized: boolean;
}

interface ThemeActions {
  toggleTheme: () => void;
  setTheme: (isDark: boolean) => void;
  initializeTheme: () => Promise<void>;
}

type ThemeStore = ThemeState & ThemeActions;

export const useThemeStore = create<ThemeStore>((set, get) => ({
  // Initial state
  isDark: false,
  theme: lightTheme,
  isInitialized: false,

  // Actions
  toggleTheme: () => {
    const { isDark } = get();
    const newIsDark = !isDark;
    const newTheme = newIsDark ? darkTheme : lightTheme;
    
    set({
      isDark: newIsDark,
      theme: newTheme,
    });
    
    // Save to storage
    saveThemePreference(newIsDark);
  },

  setTheme: (isDark: boolean) => {
    const theme = isDark ? darkTheme : lightTheme;
    
    set({
      isDark,
      theme,
    });
    
    // Save to storage
    saveThemePreference(isDark);
  },

  initializeTheme: async () => {
    try {
      const savedPreference = await getThemePreference();
      
      if (savedPreference !== null) {
        const theme = savedPreference ? darkTheme : lightTheme;
        set({
          isDark: savedPreference,
          theme,
          isInitialized: true,
        });
      } else {
        // Use system preference if no saved preference
        set({
          isDark: false, // Default to light theme
          theme: lightTheme,
          isInitialized: true,
        });
      }
    } catch (error) {
      console.error('Error initializing theme:', error);
      set({
        isDark: false,
        theme: lightTheme,
        isInitialized: true,
      });
    }
  },
}));
