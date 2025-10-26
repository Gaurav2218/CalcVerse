import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS, StorageKey } from '@/constants/keys';
import { CalculationHistory } from './calculator';

// Generic storage functions
export async function getItem<T>(key: StorageKey): Promise<T | null> {
  try {
    const item = await AsyncStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error(`Error getting item ${key}:`, error);
    return null;
  }
}

export async function setItem<T>(key: StorageKey, value: T): Promise<boolean> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Error setting item ${key}:`, error);
    return false;
  }
}

export async function removeItem(key: StorageKey): Promise<boolean> {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing item ${key}:`, error);
    return false;
  }
}

// Calculator history specific functions
export async function getCalculatorHistory(): Promise<CalculationHistory[]> {
  const history = await getItem<CalculationHistory[]>(STORAGE_KEYS.CALCULATOR_HISTORY);
  return history || [];
}

export async function saveCalculatorHistory(history: CalculationHistory[]): Promise<boolean> {
  return setItem(STORAGE_KEYS.CALCULATOR_HISTORY, history);
}

export async function addToCalculatorHistory(calculation: CalculationHistory): Promise<boolean> {
  try {
    const history = await getCalculatorHistory();
    const newHistory = [calculation, ...history].slice(0, 100); // Keep last 100 calculations
    return saveCalculatorHistory(newHistory);
  } catch (error) {
    console.error('Error adding to calculator history:', error);
    return false;
  }
}

export async function clearCalculatorHistory(): Promise<boolean> {
  return removeItem(STORAGE_KEYS.CALCULATOR_HISTORY);
}

// Theme preference functions
export async function getThemePreference(): Promise<boolean | null> {
  const preference = await getItem<boolean>(STORAGE_KEYS.THEME_PREFERENCE);
  return preference;
}

export async function saveThemePreference(isDark: boolean): Promise<boolean> {
  return setItem(STORAGE_KEYS.THEME_PREFERENCE, isDark);
}

// Clear all app data
export async function clearAllData(): Promise<boolean> {
  try {
    await AsyncStorage.multiRemove([
      STORAGE_KEYS.CALCULATOR_HISTORY,
      STORAGE_KEYS.THEME_PREFERENCE,
    ]);
    return true;
  } catch (error) {
    console.error('Error clearing all data:', error);
    return false;
  }
}
