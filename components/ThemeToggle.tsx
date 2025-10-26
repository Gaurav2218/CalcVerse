import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useThemeStore } from '@/store/useThemeStore';
import { CalcButton } from './CalcButton';

export const ThemeToggle: React.FC = () => {
  const { isDark, toggleTheme } = useThemeStore();

  return (
    <View style={[
      styles.container,
      { backgroundColor: isDark ? '#1C1C1E' : '#F2F2F7' }
    ]}>
      <CalcButton
        label={isDark ? '🌙' : '☀️'}
        onPress={toggleTheme}
        variant="action"
        size="normal"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    padding: 4,
  },
});