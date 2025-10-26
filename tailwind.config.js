/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Light theme colors
        light: {
          primary: "#007AFF",
          secondary: "#5856D6",
          background: "#FFFFFF",
          surface: "#F2F2F7",
          text: "#000000",
          textSecondary: "#8E8E93",
          border: "#C6C6C8",
          success: "#34C759",
          warning: "#FF9500",
          error: "#FF3B30",
        },
        // Dark theme colors
        dark: {
          primary: "#0A84FF",
          secondary: "#5E5CE6",
          background: "#000000",
          surface: "#1C1C1E",
          text: "#FFFFFF",
          textSecondary: "#8E8E93",
          border: "#38383A",
          success: "#30D158",
          warning: "#FF9F0A",
          error: "#FF453A",
        },
      },
      fontFamily: {
        'sf-pro': ['SF Pro Display', 'system-ui', 'sans-serif'],
        'sf-pro-text': ['SF Pro Text', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display': ['64px', { lineHeight: '72px', fontWeight: '300' }],
        'display-sm': ['48px', { lineHeight: '56px', fontWeight: '300' }],
        'display-xs': ['36px', { lineHeight: '44px', fontWeight: '400' }],
        'title': ['24px', { lineHeight: '32px', fontWeight: '600' }],
        'body': ['16px', { lineHeight: '24px', fontWeight: '400' }],
        'caption': ['14px', { lineHeight: '20px', fontWeight: '400' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
        '3xl': '24px',
      },
      boxShadow: {
        'button': '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
        'button-pressed': '0 1px 2px rgba(0, 0, 0, 0.05)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
    },
  },
  plugins: [],
};