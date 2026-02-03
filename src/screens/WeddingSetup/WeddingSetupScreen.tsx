import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Platform } from 'react-native';
import { colors } from '../../components/theme/colors';
import PrimaryButton from '../../components/PrimaryButton';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useNavigation} from '@react-navigation/native';
const WeddingSetupScreen: React.FC = () => {
const [weddingDate, setWeddingDate] = useState<Date | null>(null);
const [showDatePicker, setShowDatePicker] = useState(false);  const [city, setCity] = useState('');
  const [guests, setGuests] = useState('');
  const [budget, setBudget] = useState('');

  const navigation = useNavigation<any>();
  const onChangeDate = (_event: any, selectedDate?: Date) => {
  setShowDatePicker(false);
  if (selectedDate) {
    setWeddingDate(selectedDate);
  }
};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Let’s set up your wedding</Text>
      <Text style={styles.subtitle}>
        Just a few details to create your calm plan
      </Text>
<TouchableOpacity onPress={() => setShowDatePicker(true)}>
  <View pointerEvents="none">
    <TextInput
      placeholder="Select wedding date"
      placeholderTextColor={colors.textSecondary}
      style={styles.input}
      value={weddingDate ? weddingDate.toDateString() : ''}
      editable={false}
    />
  </View>
</TouchableOpacity>

{showDatePicker && (
  <DateTimePicker
    value={weddingDate || new Date()}
    mode="date"
    onChange={onChangeDate}
    minimumDate={new Date()}
  />
)}


      <TextInput
        placeholder="City"
        placeholderTextColor={colors.textSecondary}
        style={styles.input}
        value={city}
        onChangeText={setCity}
      />

      <TextInput
        placeholder="Approx guests (e.g. 300)"
        placeholderTextColor={colors.textSecondary}
        style={styles.input}
        keyboardType="number-pad"
        value={guests}
        onChangeText={setGuests}
      />

      <TextInput
        placeholder="Total budget (e.g. 1000000)"
        placeholderTextColor={colors.textSecondary}
        style={styles.input}
        keyboardType="number-pad"
        value={budget}
        onChangeText={setBudget}
      />

<PrimaryButton
  title="Create My Plan"
  onPress={() => {
    // Later: validate + API call
    navigation.navigate('Dashboard');
  }}
/>    </View>
  );
};

export default WeddingSetupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 24,
  },
  input: {
    backgroundColor: colors.card,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: colors.textPrimary,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 12,
  },
});
