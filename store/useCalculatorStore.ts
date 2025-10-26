import { create } from 'zustand';
import { calculate, CalculationHistory, isCompleteExpression } from '@/utils/calculator';
import { getCalculatorHistory, addToCalculatorHistory, clearCalculatorHistory } from '@/utils/storage';

interface CalculatorState {
  expression: string;
  result: string;
  history: CalculationHistory[];
  isLoading: boolean;
  error: string | null;
}

interface CalculatorActions {
  inputNumber: (number: string) => void;
  inputOperator: (operator: string) => void;
  inputDecimal: () => void;
  inputParenthesis: (paren: string) => void;
  calculate: () => void;
  clear: () => void;
  backspace: () => void;
  clearHistory: () => Promise<void>;
  loadHistory: () => Promise<void>;
  addToHistory: (expression: string, result: string) => Promise<void>;
  useHistoryItem: (historyItem: CalculationHistory) => void;
  setError: (error: string | null) => void;
}

type CalculatorStore = CalculatorState & CalculatorActions;

export const useCalculatorStore = create<CalculatorStore>((set, get) => ({
  // Initial state
  expression: '',
  result: '0',
  history: [],
  isLoading: false,
  error: null,

  // Actions
  inputNumber: (number: string) => {
    set((state) => {
      const newExpression = state.expression + number;
      return {
        expression: newExpression,
        error: null,
      };
    });
  },

  inputOperator: (operator: string) => {
    set((state) => {
      let newExpression = state.expression;
      
      // If expression is empty and operator is minus, allow it
      if (!state.expression && operator === '-') {
        newExpression = '-';
      } else if (state.expression) {
        // If last character is an operator, replace it
        const lastChar = state.expression[state.expression.length - 1];
        if (['+', '-', '×', '÷', '%'].includes(lastChar)) {
          newExpression = state.expression.slice(0, -1) + operator;
        } else {
          newExpression = state.expression + operator;
        }
      }
      
      return {
        expression: newExpression,
        error: null,
      };
    });
  },

  inputDecimal: () => {
    set((state) => {
      // Check if current number already has a decimal point
      const parts = state.expression.split(/[+\-×÷%]/);
      const currentNumber = parts[parts.length - 1];
      
      if (!currentNumber.includes('.')) {
        return {
          expression: state.expression + '.',
          error: null,
        };
      }
      
      return state;
    });
  },

  inputParenthesis: (paren: string) => {
    set((state) => {
      return {
        expression: state.expression + paren,
        error: null,
      };
    });
  },

  calculate: () => {
    set((state) => {
      if (!state.expression) {
        return state;
      }
      
      const calculation = calculate(state.expression);
      
      if (calculation.error) {
        return {
          result: 'Error',
          error: calculation.error,
        };
      }
      
      return {
        result: calculation.result,
        error: null,
      };
    });
  },

  clear: () => {
    set({
      expression: '',
      result: '0',
      error: null,
    });
  },

  backspace: () => {
    set((state) => {
      if (state.expression.length > 0) {
        return {
          expression: state.expression.slice(0, -1),
          error: null,
        };
      }
      return state;
    });
  },

  clearHistory: async () => {
    set({ isLoading: true });
    try {
      await clearCalculatorHistory();
      set({ history: [], isLoading: false });
    } catch (error) {
      console.error('Error clearing history:', error);
      set({ isLoading: false });
    }
  },

  loadHistory: async () => {
    set({ isLoading: true });
    try {
      const history = await getCalculatorHistory();
      set({ history, isLoading: false });
    } catch (error) {
      console.error('Error loading history:', error);
      set({ isLoading: false });
    }
  },

  addToHistory: async (expression: string, result: string) => {
    try {
      const historyItem: CalculationHistory = {
        id: Date.now().toString(),
        expression,
        result,
        timestamp: Date.now(),
      };
      
      await addToCalculatorHistory(historyItem);
      
      // Update local state
      set((state) => ({
        history: [historyItem, ...state.history].slice(0, 100),
      }));
    } catch (error) {
      console.error('Error adding to history:', error);
    }
  },

  useHistoryItem: (historyItem: CalculationHistory) => {
    set({
      expression: historyItem.expression,
      result: historyItem.result,
      error: null,
    });
  },

  setError: (error: string | null) => {
    set({ error });
  },
}));
