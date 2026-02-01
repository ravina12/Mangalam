import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { colors } from '../../components/theme/colors';
import PrimaryButton from '../../components/PrimaryButton';
import { useNavigation } from '@react-navigation/native';

const SignupScreen: React.FC = () => {
    const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create account</Text>
      <Text style={styles.subtitle}>Start planning your wedding calmly</Text>

      <TextInput
        placeholder="Name"
        placeholderTextColor={colors.textSecondary}
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        placeholderTextColor={colors.textSecondary}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor={colors.textSecondary}
        style={styles.input}
        secureTextEntry
      />

      <PrimaryButton title="Sign Up"  onPress={() => navigation.navigate('WeddingSetup')} />

      <Text style={styles.footerText}>
  Already have an account?{' '}
  <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
    Login
  </Text>
</Text>
    </View>
  );
};

export default SignupScreen;

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
  footerText: {
    marginTop: 24,
    textAlign: 'center',
    color: colors.textSecondary,
  },
  link: {
    color: colors.primary,
    fontWeight: '600',
  },
});
