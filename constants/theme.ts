export interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  success: string;
  warning: string;
  error: string;
}

export interface Theme {
  colors: ThemeColors;
  isDark: boolean;
}

export const lightTheme: Theme = {
  isDark: false,
  colors: {
    primary: '#007AFF',
    secondary: '#5856D6',
    background: '#FFFFFF',
    surface: '#F2F2F7',
    text: '#000000',
    textSecondary: '#8E8E93',
    border: '#C6C6C8',
    success: '#34C759',
    warning: '#FF9500',
    error: '#FF3B30',
  },
};

export const darkTheme: Theme = {
  isDark: true,
  colors: {
    primary: '#0A84FF',
    secondary: '#5E5CE6',
    background: '#000000',
    surface: '#1C1C1E',
    text: '#FFFFFF',
    textSecondary: '#8E8E93',
    border: '#38383A',
    success: '#30D158',
    warning: '#FF9F0A',
    error: '#FF453A',
  },
};

export const typography = {
  display: {
    fontSize: 64,
    lineHeight: 72,
    fontWeight: '300' as const,
  },
  displaySm: {
    fontSize: 48,
    lineHeight: 56,
    fontWeight: '300' as const,
  },
  displayXs: {
    fontSize: 36,
    lineHeight: 44,
    fontWeight: '400' as const,
  },
  title: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '600' as const,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400' as const,
  },
  caption: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400' as const,
  },
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
} as const;

export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;

export const shadows = {
  button: {
    elevation: 2,
  },
  buttonPressed: {
    elevation: 1,
  },
  card: {
    elevation: 4,
  },
} as const;
