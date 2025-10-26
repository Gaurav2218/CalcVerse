import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CalcButton } from './CalcButton';
import { useCalculatorStore } from '@/store/useCalculatorStore';

export const Keypad: React.FC = () => {
  const {
    inputNumber,
    inputOperator,
    inputDecimal,
    inputParenthesis,
    calculate,
    clear,
    backspace,
  } = useCalculatorStore();

  const handleNumberPress = (number: string) => {
    inputNumber(number);
  };

  const handleOperatorPress = (operator: string) => {
    inputOperator(operator);
  };

  const handleEquals = () => {
    calculate();
  };

  const handleClear = () => {
    clear();
  };

  const handleBackspace = () => {
    backspace();
  };

  const handleDecimal = () => {
    inputDecimal();
  };

  const handleParenthesis = (paren: string) => {
    inputParenthesis(paren);
  };

  return (
    <View style={styles.container}>
      {/* Row 1: Clear, Backspace, Parentheses, Division */}
      <View style={styles.row}>
        <CalcButton
          label="C"
          onPress={handleClear}
          variant="action"
        />
        <CalcButton
          label="⌫"
          onPress={handleBackspace}
          variant="action"
        />
        <CalcButton
          label="("
          onPress={() => handleParenthesis('(')}
          variant="action"
        />
        <CalcButton
          label="÷"
          onPress={() => handleOperatorPress('÷')}
          variant="operator"
        />
      </View>

      {/* Row 2: 7, 8, 9, × */}
      <View style={styles.row}>
        <CalcButton
          label="7"
          onPress={() => handleNumberPress('7')}
          variant="number"
        />
        <CalcButton
          label="8"
          onPress={() => handleNumberPress('8')}
          variant="number"
        />
        <CalcButton
          label="9"
          onPress={() => handleNumberPress('9')}
          variant="number"
        />
        <CalcButton
          label="×"
          onPress={() => handleOperatorPress('×')}
          variant="operator"
        />
      </View>

      {/* Row 3: 4, 5, 6, - */}
      <View style={styles.row}>
        <CalcButton
          label="4"
          onPress={() => handleNumberPress('4')}
          variant="number"
        />
        <CalcButton
          label="5"
          onPress={() => handleNumberPress('5')}
          variant="number"
        />
        <CalcButton
          label="6"
          onPress={() => handleNumberPress('6')}
          variant="number"
        />
        <CalcButton
          label="-"
          onPress={() => handleOperatorPress('-')}
          variant="operator"
        />
      </View>

      {/* Row 4: 1, 2, 3, + */}
      <View style={styles.row}>
        <CalcButton
          label="1"
          onPress={() => handleNumberPress('1')}
          variant="number"
        />
        <CalcButton
          label="2"
          onPress={() => handleNumberPress('2')}
          variant="number"
        />
        <CalcButton
          label="3"
          onPress={() => handleNumberPress('3')}
          variant="number"
        />
        <CalcButton
          label="+"
          onPress={() => handleOperatorPress('+')}
          variant="operator"
        />
      </View>

      {/* Row 5: 0, ., ), = */}
      <View style={styles.row}>
        <CalcButton
          label="0"
          onPress={() => handleNumberPress('0')}
          variant="number"
          size="wide"
        />
        <CalcButton
          label="."
          onPress={handleDecimal}
          variant="number"
        />
        <CalcButton
          label=")"
          onPress={() => handleParenthesis(')')}
          variant="action"
        />
        <CalcButton
          label="="
          onPress={handleEquals}
          variant="equals"
        />
      </View>

      {/* Row 6: mod, (, %, blank */}
      <View style={styles.row}>
        <CalcButton
          label="mod"
          onPress={() => handleOperatorPress('mod')}
          variant="operator"
        />
        <CalcButton
          label="("
          onPress={() => handleParenthesis('(')}
          variant="action"
        />
        <CalcButton
          label="%"
          onPress={() => handleOperatorPress('%')}
          variant="operator"
        />
        <CalcButton
          label=""
          onPress={() => {}}
          variant="action"
          disabled={true}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
});