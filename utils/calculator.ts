export interface CalculationResult {
  result: string;
  error?: string;
}

export interface CalculationHistory {
  id: string;
  expression: string;
  result: string;
  timestamp: number;
}

// Operator precedence mapping
const PRECEDENCE: Record<string, number> = {
  '+': 1,
  '-': 1,
  '×': 2,
  '÷': 2,
  '%': 3,
  'mod': 3,
};

// Check if character is a digit
function isDigit(char: string): boolean {
  return /[0-9]/.test(char);
}

// Check if character is a decimal point
function isDecimalPoint(char: string): boolean {
  return char === '.';
}

// Check if character is an operator
function isOperator(char: string): boolean {
  return /[+\-×÷%]/.test(char);
}

// Check if string is a multi-character operator
function isMultiCharOperator(str: string): boolean {
  return str === 'mod';
}

// Check if character is a parenthesis
function isParenthesis(char: string): boolean {
  return /[()]/.test(char);
}

// Tokenize the expression
function tokenize(expression: string): string[] {
  const tokens: string[] = [];
  let currentNumber = '';
  let i = 0;
  
  while (i < expression.length) {
    const char = expression[i];
    
    if (isDigit(char) || isDecimalPoint(char)) {
      currentNumber += char;
      i++;
    } else if (isOperator(char) || isParenthesis(char)) {
      if (currentNumber) {
        tokens.push(currentNumber);
        currentNumber = '';
      }
      tokens.push(char);
      i++;
    } else if (char === ' ') {
      // Skip spaces
      if (currentNumber) {
        tokens.push(currentNumber);
        currentNumber = '';
      }
      i++;
    } else {
      // Check for multi-character operators
      const remaining = expression.substring(i);
      if (remaining.startsWith('mod')) {
        if (currentNumber) {
          tokens.push(currentNumber);
          currentNumber = '';
        }
        tokens.push('mod');
        i += 3;
      } else {
        i++;
      }
    }
  }
  
  if (currentNumber) {
    tokens.push(currentNumber);
  }
  
  return tokens;
}

// Convert infix to postfix notation using Shunting Yard algorithm
function infixToPostfix(tokens: string[]): string[] {
  const output: string[] = [];
  const operators: string[] = [];
  
  for (const token of tokens) {
    if (isDigit(token) || (token.includes('.') && !isNaN(parseFloat(token)))) {
      output.push(token);
    } else if (isOperator(token) || isMultiCharOperator(token)) {
      while (
        operators.length > 0 &&
        operators[operators.length - 1] !== '(' &&
        PRECEDENCE[operators[operators.length - 1]] >= PRECEDENCE[token]
      ) {
        output.push(operators.pop()!);
      }
      operators.push(token);
    } else if (token === '(') {
      operators.push(token);
    } else if (token === ')') {
      while (operators.length > 0 && operators[operators.length - 1] !== '(') {
        output.push(operators.pop()!);
      }
      if (operators.length > 0) {
        operators.pop(); // Remove the '('
      }
    }
  }
  
  while (operators.length > 0) {
    output.push(operators.pop()!);
  }
  
  return output;
}

// Evaluate postfix expression
function evaluatePostfix(postfix: string[]): number {
  const stack: number[] = [];
  
  for (const token of postfix) {
    if (isDigit(token) || (token.includes('.') && !isNaN(parseFloat(token)))) {
      stack.push(parseFloat(token));
    } else if (isOperator(token) || isMultiCharOperator(token)) {
      if (stack.length < 2) {
        throw new Error('Invalid expression');
      }
      
      const b = stack.pop()!;
      const a = stack.pop()!;
      
      let result: number;
      switch (token) {
        case '+':
          result = a + b;
          break;
        case '-':
          result = a - b;
          break;
        case '×':
          result = a * b;
          break;
        case '÷':
          if (b === 0) {
            throw new Error('Division by zero');
          }
          result = a / b;
          // Handle very small results that might be floating point errors
          if (Math.abs(result) < 1e-15 && result !== 0) {
            result = 0;
          }
          break;
        case 'mod':
          if (b === 0) {
            throw new Error('Modulo by zero');
          }
          result = a % b;
          break;
        case '%':
          // Calculator-style percentage: context-aware calculation
          // This is a simplified version - in a real calculator, percentage
          // behavior depends on the previous operation context
          result = b / 100;
          break;
        default:
          throw new Error(`Unknown operator: ${token}`);
      }
      
      stack.push(result);
    }
  }
  
  if (stack.length !== 1) {
    throw new Error('Invalid expression');
  }
  
  return stack[0];
}

// Format number for display
function formatNumber(num: number): string {
  if (Number.isNaN(num) || !Number.isFinite(num)) {
    return 'Error';
  }
  
  // Handle very large or very small numbers
  if (Math.abs(num) > 1e15 || (Math.abs(num) < 1e-10 && num !== 0)) {
    return num.toExponential(6);
  }
  
  // Round to avoid floating point precision issues
  const rounded = Math.round(num * 1e12) / 1e12;
  
  // Format as integer if it's a whole number
  if (Number.isInteger(rounded)) {
    return rounded.toString();
  }
  
  // Format with appropriate decimal places
  const str = rounded.toString();
  const decimalIndex = str.indexOf('.');
  
  if (decimalIndex === -1) {
    return str;
  }
  
  // Remove trailing zeros but keep at least one decimal place if it's a decimal
  return str.replace(/\.?0+$/, '');
}

// Main calculator function
export function calculate(expression: string): CalculationResult {
  try {
    if (!expression.trim()) {
      return { result: '0' };
    }
    
    // Clean and validate expression
    const cleanExpression = expression.replace(/\s+/g, ' ').trim();
    
    // Check for empty expression
    if (!cleanExpression) {
      return { result: '0' };
    }
    
    // Tokenize the expression
    const tokens = tokenize(cleanExpression);
    
    if (tokens.length === 0) {
      return { result: '0' };
    }
    
    // Convert to postfix notation
    const postfix = infixToPostfix(tokens);
    
    if (postfix.length === 0) {
      return { result: '0' };
    }
    
    // Evaluate the expression
    const result = evaluatePostfix(postfix);
    
    return { result: formatNumber(result) };
  } catch (error) {
    return {
      result: 'Error',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

// Validate if expression can be extended
export function canExtendExpression(expression: string, newChar: string): boolean {
  if (!expression) {
    return isDigit(newChar) || newChar === '(' || newChar === '-';
  }
  
  const lastChar = expression[expression.length - 1];
  
  if (isDigit(lastChar)) {
    // Check if we can add a decimal point (only if current number doesn't have one)
    const lastNumber = expression.match(/\d+\.?\d*$/)?.[0] || '';
    const canAddDecimal = newChar === '.' && !lastNumber.includes('.');
    return isDigit(newChar) || isOperator(newChar) || newChar === ')' || canAddDecimal;
  }
  
  if (isOperator(lastChar)) {
    return isDigit(newChar) || newChar === '(' || newChar === '-';
  }
  
  // Handle multi-character operators
  if (expression.endsWith('mod')) {
    return isDigit(newChar) || newChar === '(' || newChar === '-';
  }
  
  if (lastChar === '(') {
    return isDigit(newChar) || newChar === '-' || newChar === '(';
  }
  
  if (lastChar === ')') {
    return isOperator(newChar) || newChar === ')';
  }
  
  return false;
}

// Check if expression is complete (can be evaluated)
export function isCompleteExpression(expression: string): boolean {
  if (!expression.trim()) return false;
  
  const tokens = tokenize(expression);
  if (tokens.length === 0) return false;
  
  // Check for balanced parentheses
  let parenCount = 0;
  for (const token of tokens) {
    if (token === '(') parenCount++;
    if (token === ')') parenCount--;
    if (parenCount < 0) return false;
  }
  
  if (parenCount !== 0) return false;
  
  // Check if expression ends with a number or closing parenthesis
  const lastToken = tokens[tokens.length - 1];
  return isDigit(lastToken) || (lastToken.includes('.') && !isNaN(parseFloat(lastToken))) || lastToken === ')';
}
