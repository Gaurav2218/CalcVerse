import React from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';
import { useThemeStore } from '@/store/useThemeStore';

interface CalcButtonProps {
  label: string;
  onPress: () => void;
  variant?: 'number' | 'operator' | 'action' | 'equals';
  size?: 'normal' | 'wide';
  disabled?: boolean;
}

export const CalcButton: React.FC<CalcButtonProps> = ({
  label,
  onPress,
  variant = 'number',
  size = 'normal',
  disabled = false,
}) => {
  const { theme } = useThemeStore();

  const getButtonStyle = () => {
    const baseStyle = {
      borderRadius: 24,
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
      width: size === 'wide' ? undefined : 72,
      height: 72,
      flex: size === 'wide' ? 1 : undefined,
    };

    switch (variant) {
      case 'number':
        return [baseStyle, { backgroundColor: theme.colors.surface }];
      case 'operator':
        return [baseStyle, { backgroundColor: theme.colors.primary }];
      case 'action':
        return [baseStyle, { backgroundColor: theme.colors.border }];
      case 'equals':
        return [baseStyle, { backgroundColor: theme.colors.primary }];
      default:
        return [baseStyle, { backgroundColor: theme.colors.surface }];
    }
  };

  const getTextStyle = () => {
    const baseStyle = {
      fontSize: label === 'mod' ? 18 : 24,
      fontWeight: '500' as const,
    };

    switch (variant) {
      case 'number':
        return [baseStyle, { color: theme.colors.text }];
      case 'operator':
        return [baseStyle, { color: '#FFFFFF' }];
      case 'action':
        return [baseStyle, { color: theme.colors.text }];
      case 'equals':
        return [baseStyle, { color: '#FFFFFF' }];
      default:
        return [baseStyle, { color: theme.colors.text }];
    }
  };

  const handlePress = () => {
    if (disabled) return;
    
    // Haptic feedback
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress();
  };

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      style={({ pressed }) => [
        getButtonStyle(),
        {
          elevation: 2,
          transform: [{ scale: pressed ? 0.95 : 1 }],
          opacity: pressed ? 0.8 : 1,
        },
      ]}
    >
      <Text style={getTextStyle()}>{label}</Text>
    </Pressable>
  );
};