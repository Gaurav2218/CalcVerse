import React, { useEffect } from 'react';
import { View, Text, FlatList, Pressable, Alert, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Link } from 'expo-router';
import { useThemeStore } from '@/store/useThemeStore';
import { useCalculatorStore } from '@/store/useCalculatorStore';
import { formatTimestamp, truncateText } from '@/utils/formatters';
import { CalculationHistory } from '@/utils/calculator';

export default function HistoryScreen() {
  const router = useRouter();
  const { theme } = useThemeStore();
  const { history, isLoading, clearHistory, useHistoryItem } = useCalculatorStore();

  useEffect(() => {
    // History is loaded in the root layout
  }, []);

  const handleHistoryItemPress = (item: CalculationHistory) => {
    useHistoryItem(item);
    router.back();
  };

  const handleClearHistory = () => {
    Alert.alert(
      'Clear History',
      'Are you sure you want to clear all calculation history?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: clearHistory,
        },
      ]
    );
  };

  const renderHistoryItem = ({ item, index }: { item: CalculationHistory; index: number }) => (
    <Pressable
      onPress={() => handleHistoryItemPress(item)}
      style={[
        styles.historyItem,
        { borderBottomColor: theme.colors.border },
        ({ pressed }) => ({
          backgroundColor: pressed ? theme.colors.surface : 'transparent',
        }),
      ]}
    >
      <View style={styles.historyItemContent}>
        <View style={styles.historyItemText}>
          <Text
            style={[styles.expression, { color: theme.colors.text }]}
            numberOfLines={1}
          >
            {truncateText(item.expression, 30)}
          </Text>
          <Text
            style={[styles.result, { color: theme.colors.primary }]}
            numberOfLines={1}
          >
            = {item.result}
          </Text>
        </View>
        <Text
          style={[styles.timestamp, { color: theme.colors.textSecondary }]}
        >
          {formatTimestamp(item.timestamp)}
        </Text>
      </View>
    </Pressable>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyIcon}>🧮</Text>
      <Text style={[styles.emptyTitle, { color: theme.colors.text }]}>
        No calculations yet
      </Text>
      <Text style={[styles.emptySubtitle, { color: theme.colors.textSecondary }]}>
        Start calculating to see your history here
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.content}>
        {history.length > 0 ? (
          <>
            <FlatList
              data={history}
              renderItem={renderHistoryItem}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.listContent}
            />
            
            {/* Clear History Button */}
            <View style={styles.clearButtonContainer}>
              <Pressable
                onPress={handleClearHistory}
                style={[
                  styles.clearButton,
                  { backgroundColor: theme.colors.error },
                  ({ pressed }) => ({
                    opacity: pressed ? 0.8 : 1,
                  }),
                ]}
              >
                <Text style={styles.clearButtonText}>
                  Clear History
                </Text>
              </Pressable>
            </View>
          </>
        ) : (
          renderEmptyState()
        )}
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
  listContent: {
    paddingBottom: 20,
  },
  historyItem: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  historyItemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  historyItemText: {
    flex: 1,
    marginRight: 16,
  },
  expression: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 4,
  },
  result: {
    fontSize: 24,
    fontWeight: '300',
  },
  timestamp: {
    fontSize: 14,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
  clearButtonContainer: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  clearButton: {
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  clearButtonText: {
    color: '#FFFFFF',
    fontWeight: '500',
    fontSize: 18,
  },
});