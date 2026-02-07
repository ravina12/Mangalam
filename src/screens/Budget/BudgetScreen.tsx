import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../components/theme/colors';
import { useBudget } from '../../context/BudgetContext';

const BudgetScreen: React.FC = () => {
  const { items, addItem, removeItem, budgetLimit, setBudgetLimit } =
    useBudget();
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [limitInput, setLimitInput] = useState('');

  // const totalSpent = items.reduce((sum, item) => sum + item.amount, 0);

  const handleAdd = () => {
    if (!title.trim() || !amount.trim()) return;

    const value = Number(amount);
    if (isNaN(value) || value <= 0) return;

    addItem(title.trim(), value);
    setTitle('');
    setAmount('');
  };

  const totalSpent = items.reduce((sum, item) => sum + item.amount, 0);
  const remaining = budgetLimit - totalSpent;
  const isOverBudget = budgetLimit > 0 && remaining < 0;

  const handleSetBudget = () => {
    const value = Number(limitInput);
    if (!isNaN(value) && value > 0) {
      setBudgetLimit(value);
      setLimitInput('');
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <Text style={styles.title}>Budget 💰</Text>
        <Text style={styles.subtitle}>Track your wedding expenses</Text>

        {/* Summary */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Total Spent</Text>
          <Text style={styles.summaryValue}>
            ₹ {totalSpent.toLocaleString()}
          </Text>
        </View>

        {/* Budget Limit Card */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Total Budget</Text>

          <View style={styles.budgetRow}>
            <TextInput
              placeholder="Enter total budget"
              placeholderTextColor={colors.textSecondary}
              style={[styles.input, { flex: 1 }]}
              value={limitInput}
              onChangeText={setLimitInput}
              keyboardType="numeric"
            />

            <TouchableOpacity
              style={styles.setButton}
              onPress={handleSetBudget}
            >
              <Text style={styles.setButtonText}>Set</Text>
            </TouchableOpacity>
          </View>

          {budgetLimit > 0 && (
            <>
              <Text style={styles.summaryValue}>
                Spent: ₹ {totalSpent.toLocaleString()}
              </Text>

              <Text
                style={[
                  styles.summaryValue,
                  { color: isOverBudget ? colors.error : colors.success },
                ]}
              >
                Remaining: ₹ {remaining.toLocaleString()}
              </Text>

              {isOverBudget && (
                <Text style={{ color: colors.error, marginTop: 4 }}>
                  ⚠️ You are over budget!
                </Text>
              )}
            </>
          )}
        </View>

        {/* Add Item */}
        <View style={styles.addRow}>
          <TextInput
            placeholder="e.g. Venue"
            placeholderTextColor={colors.textSecondary}
            style={styles.input}
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            placeholder="Amount"
            placeholderTextColor={colors.textSecondary}
            style={styles.input}
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
          />
          <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        </View>

        {/* List */}
        <FlatList
          data={items}
          keyExtractor={item => item.id}
          contentContainerStyle={{ paddingTop: 16, paddingBottom: 40 }}
          renderItem={({ item }) => (
            <View style={styles.itemRow}>
              <View>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemAmount}>
                  ₹ {item.amount.toLocaleString()}
                </Text>
              </View>
              <TouchableOpacity onPress={() => removeItem(item.id)}>
                <Text style={styles.deleteText}>✕</Text>
              </TouchableOpacity>
            </View>
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>
              No expenses yet. Add your first one ✨
            </Text>
          }
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default BudgetScreen;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 16,
  },
  summaryCard: {
    backgroundColor: colors.primarySoft,
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
  },
  summaryLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  summaryValue: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.primary,
    marginTop: 4,
  },
  addRow: {
    gap: 8,
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    color: colors.textPrimary,
    backgroundColor: colors.card,
  },
  addButton: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.card,
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  itemAmount: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 2,
  },
  deleteText: {
    fontSize: 20,
    color: colors.error,
    fontWeight: '700',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    color: colors.textSecondary,
  },
  success: {
    color: colors.success,
  },
  errorText: {
    color: colors.error,
  },
  budgetRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  setButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  setButtonText: {
    color: '#fff',
    fontWeight: '700',
  },
});
