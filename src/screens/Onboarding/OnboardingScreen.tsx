import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {colors} from '../../components/theme/colors';
import  PrimaryButton from '../../components/PrimaryButton';
import { useNavigation } from '@react-navigation/native';


const OnboardingScreen: React.FC = () => {
    const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
    <Text style={[styles.title, { color: colors.primary }]}>
    Plan your wedding, calmly 💍
    </Text>
      <Text style={styles.subtitle}>
        We’ll guide you step by step. No stress. No chaos.
      </Text>
            <PrimaryButton title="Get Started"   onPress={() => navigation.navigate('Auth')}
 />

    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 28,
    color: colors.textPrimary,
    fontWeight: '700',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
});

