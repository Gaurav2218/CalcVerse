export const STORAGE_KEYS = {
  CALCULATOR_HISTORY: 'calculator_history',
  THEME_PREFERENCE: 'theme_preference',
} as const;

export type StorageKey = typeof STORAGE_KEYS[keyof typeof STORAGE_KEYS];
