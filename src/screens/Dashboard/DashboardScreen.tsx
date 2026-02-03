import React from 'react';
import { View, Text, StyleSheet, ScrollView ,StatusBar, Platform, TouchableOpacity} from 'react-native';
import { colors } from '../../components/theme/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';


const DashboardScreen: React.FC = () => {
  // Mock data for now
  const daysLeft = 120;
  const progress = 45; // %
  const budgetStatus = 'On track';
  const navigation = useNavigation<any>();
  const focusTasks = [
    'Finalize venue',
    'Book photographer',
    'Shortlist decor',
  ];

  return (
    <SafeAreaView style={styles.safe}>
        <StatusBar
        barStyle={ 'light-content'}
        backgroundColor={colors.background}
      />
        <View>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Your Wedding Plan</Text>
        <Text style={styles.subtitle}>Everything is under control 🌿</Text>

        {/* Days + Progress Row */}
        <View style={styles.row}>
          <View style={[styles.card, styles.halfCard, { backgroundColor: colors.primarySoft }]}>
            <Text style={styles.cardTitle}>Days to go</Text>
            <Text style={[styles.bigNumber, { color: colors.primary }]}>{daysLeft}</Text>
            <Text style={styles.cardHint}>Plenty of time</Text>
          </View>

          <View style={[styles.card, styles.halfCard, { backgroundColor: colors.secondarySoft }]}>
            <Text style={styles.cardTitle}>Progress</Text>
            <Text style={[styles.bigNumber, { color: colors.secondary }]}>{progress}%</Text>
            <Text style={styles.cardHint}>You’re doing great</Text>
          </View>
        </View>

        {/* Focus Tasks */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>This week’s focus</Text>
          {focusTasks.map((task, index) => (
            <Text key={index} style={styles.taskItem}>
              • {task}
            </Text>
          ))}
        </View>

        {/* Budget Status */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Budget</Text>
          <Text style={styles.budgetStatus}>{budgetStatus}</Text>
          <Text style={styles.cardHint}>No action needed right now</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Tasks')}>
          <Text style={styles.buttonText}>View Tasks</Text>
        </TouchableOpacity>
      </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
   button: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
   },
   buttonText: {
    color: '#fff',
   },
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    padding: 24,
    paddingTop: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  halfCard: {
    flex: 1,
    borderWidth: 0, // since we use soft background colors here
  },
  cardTitle: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  bigNumber: {
    fontSize: 34,
    fontWeight: '700',
    marginBottom: 4,
  },
  cardHint: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  taskItem: {
    fontSize: 16,
    color: colors.textPrimary,
    marginBottom: 6,
  },
  budgetStatus: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.success,
  },
});
