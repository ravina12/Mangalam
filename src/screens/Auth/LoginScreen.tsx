import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { colors } from '../../components/theme/colors';
import PrimaryButton from '../../components/PrimaryButton';
import { useNavigation } from '@react-navigation/native';

const LoginScreen: React.FC = () => {
    const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome back</Text>
      <Text style={styles.subtitle}>Let’s continue planning calmly</Text>

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

      <PrimaryButton title="Login"  onPress={() => navigation.navigate('WeddingSetup')} />

      <Text style={styles.footerText}>
  Don’t have an account?{' '}
  <Text style={styles.link} onPress={() => navigation.navigate('Signup')}>
    Sign up
  </Text>
</Text>
    </View>
  );
};

export default LoginScreen;

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
