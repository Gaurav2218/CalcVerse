import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useThemeStore } from '@/store/useThemeStore';
import { useCalculatorStore } from '@/store/useCalculatorStore';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import '@/utils/errorHandler';

export default function RootLayout() {
  const { initializeTheme, theme } = useThemeStore();
  const { loadHistory } = useCalculatorStore();

  useEffect(() => {
    // Initialize theme and load data
    const initializeApp = async () => {
      await initializeTheme();
      await loadHistory();
    };

    initializeApp();
  }, [initializeTheme, loadHistory]);

  return (
    <ErrorBoundary>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <StatusBar style={theme.isDark ? 'light' : 'dark'} />
          <Stack
            screenOptions={{
              headerStyle: {
                backgroundColor: theme.colors.background,
              },
              headerTintColor: theme.colors.text,
              headerTitleStyle: {
                fontFamily: 'SF Pro Text',
                fontWeight: '600',
              },
              headerShadowVisible: false,
            }}
          >
            <Stack.Screen
              name="index"
              options={{
                title: 'Calculator',
                headerShown: true,
              }}
            />
            <Stack.Screen
              name="history"
              options={{
                title: 'History',
                headerShown: true,
              }}
            />
          </Stack>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </ErrorBoundary>
  );
}
