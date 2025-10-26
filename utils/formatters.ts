// Format number with commas for large numbers
export function formatWithCommas(num: string): string {
  if (num === 'Error' || num === '0') return num;
  
  const parts = num.split('.');
  const integerPart = parts[0];
  const decimalPart = parts[1];
  
  // Add commas to integer part
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  
  return decimalPart ? `${formattedInteger}.${decimalPart}` : formattedInteger;
}

// Format number for display with appropriate precision
export function formatDisplayNumber(num: string): string {
  if (num === 'Error' || num === '0') return num;
  
  const number = parseFloat(num);
  
  if (Number.isNaN(number) || !Number.isFinite(number)) {
    return 'Error';
  }
  
  // Handle very large numbers
  if (Math.abs(number) > 1e12) {
    return number.toExponential(6);
  }
  
  // Handle very small numbers
  if (Math.abs(number) < 1e-6 && number !== 0) {
    return number.toExponential(6);
  }
  
  // Format with appropriate decimal places
  const formatted = number.toString();
  
  // Remove trailing zeros after decimal point
  return formatted.replace(/\.?0+$/, '');
}

// Format percentage
export function formatPercentage(value: number): string {
  if (Number.isNaN(value) || !Number.isFinite(value)) {
    return '0%';
  }
  
  const percentage = value * 100;
  
  // Round to avoid floating point precision issues
  const rounded = Math.round(percentage * 100) / 100;
  
  return `${rounded}%`;
}

// Calculate font size based on text length
export function calculateFontSize(text: string, maxLength: number = 8): number {
  const length = text.length;
  
  if (length <= 6) return 64;
  if (length <= 8) return 48;
  if (length <= 12) return 36;
  if (length <= 16) return 24;
  if (length <= 20) return 18;
  
  return 14;
}

// Format timestamp for history display
export function formatTimestamp(timestamp: number): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
  
  if (diffInMinutes < 1) {
    return 'Just now';
  }
  
  if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`;
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours}h ago`;
  }
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays}d ago`;
  }
  
  return date.toLocaleDateString();
}

// Truncate text with ellipsis
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
}

// Format expression for display (add spaces around operators)
export function formatExpression(expression: string): string {
  return expression
    .replace(/([+\-×÷%])/g, ' $1 ')
    .replace(/\s+/g, ' ')
    .trim();
}
