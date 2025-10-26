import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useCalculatorStore } from '@/store/useCalculatorStore';
import { useThemeStore } from '@/store/useThemeStore';
import { calculateFontSize, formatDisplayNumber } from '@/utils/formatters';
import { calculate } from '@/utils/calculator';

export const Display: React.FC = () => {
  const { expression, result, error } = useCalculatorStore();
  const { theme } = useThemeStore();
  const [displayResult, setDisplayResult] = useState('0');

  useEffect(() => {
    if (error) {
      setDisplayResult('Error');
      return;
    }

    if (expression) {
      // Calculate intermediate result for display
      const calculation = calculate(expression);
      if (calculation.error) {
        setDisplayResult('Error');
      } else {
        setDisplayResult(formatDisplayNumber(calculation.result));
      }
    } else {
      setDisplayResult(result);
    }
  }, [expression, result, error]);

  const fontSize = calculateFontSize(displayResult);

  return (
    <View style={styles.container}>
      {/* Expression Display */}
      {expression && (
        <View style={styles.expressionContainer}>
          <Text
            style={[
              styles.expression,
              { color: theme.colors.textSecondary },
            ]}
            numberOfLines={1}
            ellipsizeMode="head"
          >
            {expression}
          </Text>
        </View>
      )}

      {/* Result Display */}
      <View style={styles.resultContainer}>
        <Text
          style={[
            styles.result,
            {
              fontSize: fontSize,
              lineHeight: fontSize * 1.1,
              color: error ? theme.colors.error : theme.colors.text,
            },
          ]}
          numberOfLines={1}
          ellipsizeMode="head"
        >
          {displayResult}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  expressionContainer: {
    marginBottom: 8,
  },
  expression: {
    textAlign: 'right',
    fontSize: 18,
    lineHeight: 24,
  },
  resultContainer: {
    // Simple container for result
  },
  result: {
    textAlign: 'right',
    fontWeight: '300',
  },
});