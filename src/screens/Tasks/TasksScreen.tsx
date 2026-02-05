import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../components/theme/colors';
import { useTasks } from '../../context/TasksContext';

type Task = {
  id: string;
  title: string;
  done: boolean;
};

const initialTasks: Task[] = [
  { id: '1', title: 'Finalize venue', done: false },
  { id: '2', title: 'Book photographer', done: true },
  { id: '3', title: 'Shortlist decor', done: false },
  { id: '4', title: 'Send invitations', done: false },
];

const TasksScreen: React.FC = () => {
const { tasks, addTask, toggleTask } = useTasks();
  const [modalVisible, setModalVisible] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const completed = tasks.filter(t => t.done).length;

  // const toggleTask = (id: string) => {
  //   setTasks(prev =>
  //     prev.map(task =>
  //       task.id === id ? { ...task, done: !task.done } : task
  //     )
  //   );
  // };

  // const addTask = () => {
  //   if (!newTaskTitle.trim()) return;

  //   const newTask: Task = {
  //     id: Date.now().toString(),
  //     title: newTaskTitle.trim(),
  //     done: false,
  //   };

  //   setTasks(prev => [newTask, ...prev]);
  //   setNewTaskTitle('');
  //   setModalVisible(false);
  // };

  const handleAddTask = () => {
  if (!newTaskTitle.trim()) return;
  addTask(newTaskTitle.trim());
  setNewTaskTitle('');
  setModalVisible(false);
};

  const renderItem = ({ item }: { item: Task }) => {
    return (
      <TouchableOpacity
        style={[
          styles.taskItem,
          item.done && styles.taskItemDone,
        ]}
        onPress={() => toggleTask(item.id)}
        activeOpacity={0.8}
      >
        <View
          style={[
            styles.checkbox,
            item.done && styles.checkboxDone,
          ]}
        >
          {item.done && <Text style={styles.checkMark}>✓</Text>}
        </View>

        <View style={{ flex: 1 }}>
          <Text style={[styles.taskText, item.done && styles.taskTextDone]}>
            {item.title}
          </Text>
          {!item.done && (
            <Text style={styles.taskHint}>Tap to mark as done</Text>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>Checklist 💍</Text>
        <Text style={styles.subtitle}>
          {completed}/{tasks.length} done — you’re doing great ✨
        </Text>

        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingTop: 16, paddingBottom: 120 }}
          showsVerticalScrollIndicator={false}
        />

        {/* Floating Add Button */}
        <TouchableOpacity style={styles.fab} onPress={() => setModalVisible(true)}>
          <Text style={styles.fabText}>＋</Text>
        </TouchableOpacity>

        {/* Add Task Modal */}
        <Modal
          visible={modalVisible}
          transparent
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={styles.modalOverlay}
          >
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Add new task</Text>

              <TextInput
                placeholder="e.g. Book makeup artist"
                placeholderTextColor={colors.textSecondary}
                style={styles.input}
                value={newTaskTitle}
                onChangeText={setNewTaskTitle}
                autoFocus
              />

              <View style={styles.modalActions}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.modalButton, styles.addButton]}
                  onPress={handleAddTask}
                >
                  <Text style={styles.addText}>Add</Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default TasksScreen;

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
    marginTop: 4,
  },

  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    padding: 16,
    borderRadius: 20,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },
  taskItemDone: {
    backgroundColor: colors.accentSoft,
    borderColor: colors.accent,
  },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  checkboxDone: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  checkMark: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 16,
  },
  taskText: {
    fontSize: 16,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  taskTextDone: {
    textDecorationLine: 'line-through',
    color: colors.textSecondary,
  },
  taskHint: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },

  fab: {
    position: 'absolute',
    right: 24,
    bottom: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
  },
  fabText: {
    color: '#fff',
    fontSize: 32,
    lineHeight: 32,
    fontWeight: '600',
  },

  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modalContent: {
    backgroundColor: colors.card,
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    color: colors.textPrimary,
    marginBottom: 16,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 10,
  },
  cancelButton: {
    backgroundColor: colors.secondarySoft,
  },
  addButton: {
    backgroundColor: colors.primary,
  },
  cancelText: {
    color: colors.textPrimary,
    fontWeight: '600',
  },
  addText: {
    color: '#fff',
    fontWeight: '700',
  },
});
