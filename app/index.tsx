import React, { useEffect } from 'react';
import { View, Pressable, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import { Display } from '@/components/Display';
import { Keypad } from '@/components/Keypad';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useThemeStore } from '@/store/useThemeStore';
import { useCalculatorStore } from '@/store/useCalculatorStore';
import { isCompleteExpression } from '@/utils/calculator';

export default function CalculatorScreen() {
  const { theme } = useThemeStore();
  const { expression, result, addToHistory } = useCalculatorStore();

  // Auto-save to history when calculation is complete
  useEffect(() => {
    if (expression && isCompleteExpression(expression) && result !== '0') {
      addToHistory(expression, result);
    }
  }, [expression, result, addToHistory]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.content}>
        {/* Header with History Link and Theme Toggle */}
        <View style={styles.header}>
          <Link href="/history" asChild>
            <Pressable style={[styles.historyButton, { backgroundColor: theme.colors.surface }]}>
              <Text style={styles.historyIcon}>📊</Text>
            </Pressable>
          </Link>
          <ThemeToggle />
        </View>

        {/* Calculator Display */}
        <View style={styles.displayContainer}>
          <Display />
        </View>

        {/* Calculator Keypad */}
        <View style={styles.keypadContainer}>
          <Keypad />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  historyButton: {
    borderRadius: 20,
    padding: 12,
  },
  historyIcon: {
    fontSize: 18,
  },
  displayContainer: {
    flex: 1,
  },
  keypadContainer: {
    flexShrink: 0,
  },
});