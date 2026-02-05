import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { colors } from '../../components/theme/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useTasks } from '../../context/TasksContext';
import { useWedding } from '../../context/WeddingContext';
import DateTimePicker from '@react-native-community/datetimepicker';

const DashboardScreen: React.FC = () => {
  // Mock data for now
  // const daysLeft = 120;
  // const progress = 45; // %
  const budgetStatus = 'On track';
  const navigation = useNavigation<any>();
  // const focusTasks = [
  //   'Finalize venue',
  //   'Book photographer',
  //   'Shortlist decor',
  // ];

  const { tasks } = useTasks();

  const total = tasks.length;
  const completed = tasks.filter(t => t.done).length;
  const progress = total === 0 ? 0 : Math.round((completed / total) * 100);
  const pendingTasks = tasks.filter(t => !t.done).slice(0, 3);
  const { weddingDate, setWeddingDate } = useWedding();
  const [showPicker, setShowPicker] = React.useState(false);

  const daysLeft = weddingDate
    ? Math.max(
        0,
        Math.ceil(
          (weddingDate.getTime() - new Date().getTime()) /
            (1000 * 60 * 60 * 24),
        ),
      )
    : null;

  const monthsLeft = weddingDate ? Math.ceil(daysLeft! / 30) : null;

  let phase = 'Not set';
  let phaseHint = 'Set your wedding date to get a plan';

  if (monthsLeft !== null) {
    if (monthsLeft > 6) {
      phase = 'Early Planning';
      phaseHint = 'Focus on venue, budget, and guest list';
    } else if (monthsLeft > 3) {
      phase = 'Mid Planning';
      phaseHint = 'Focus on vendors, outfits, and decor';
    } else {
      phase = 'Final Stretch';
      phaseHint = 'Focus on invites, details, and confirmations';
    }
  }

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={colors.background}
      />
      <View>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>Your Wedding Plan</Text>
          <Text style={styles.subtitle}>Everything is under control 🌿</Text>

          {/* Days + Progress Row */}
          <View style={styles.row}>
            <View
              style={[
                styles.card,
                styles.halfCard,
                { backgroundColor: colors.primarySoft },
              ]}
            >
              <TouchableOpacity
                style={[
                  styles.card,
                  styles.halfCard,
                  { backgroundColor: colors.primarySoft },
                ]}
                onPress={() => setShowPicker(true)}
              >
                <Text style={styles.cardTitle}>Days to go</Text>
                <Text style={[styles.bigNumber, { color: colors.primary }]}>
                  {' '}
                  {daysLeft !== null ? daysLeft : '--'}
                </Text>
                <Text style={styles.cardHint}>
                  {' '}
                  {weddingDate
                    ? 'Until your big day 💍'
                    : 'Set your wedding date'}
                </Text>
              </TouchableOpacity>
            </View>
            {showPicker && (
              <DateTimePicker
                value={weddingDate || new Date()}
                mode="date"
                display="default"
                onChange={(event, date) => {
                  setShowPicker(false);
                  if (date) setWeddingDate(date);
                }}
              />
            )}

            <View
              style={[
                styles.card,
                styles.halfCard,
                { backgroundColor: colors.secondarySoft },
              ]}
            >
              <Text style={styles.cardTitle}>Progress</Text>
              <Text style={[styles.bigNumber, { color: colors.secondary }]}>
                {progress}%
              </Text>
              <View style={styles.progressBarBg}>
                <View
                  style={[styles.progressBarFill, { width: `${progress}%` }]}
                />
              </View>
              <Text style={styles.cardHint}>You’re doing great</Text>
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Your Planning Phase</Text>
            <Text style={styles.phaseTitle}>{phase}</Text>
            <Text style={styles.cardHint}>{phaseHint}</Text>
          </View>

          {/* Focus Tasks */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>This week’s focus</Text>
            {pendingTasks.length === 0 ? (
              <Text style={styles.cardHint}>All tasks completed 🎉</Text>
            ) : (
              pendingTasks.map(task => (
                <Text key={task.id} style={styles.taskItem}>
                  • {task.title}
                </Text>
              ))
            )}
          </View>

          {/* Budget Status */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Budget</Text>
            <Text style={styles.budgetStatus}>{budgetStatus}</Text>
            <Text style={styles.cardHint}>No action needed right now</Text>
          </View>
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
  progressBarBg: {
    height: 8,
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 6,
    marginTop: 8,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: colors.secondary,
    borderRadius: 6,
  },
  phaseTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 4,
  },
});
