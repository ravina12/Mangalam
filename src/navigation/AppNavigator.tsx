import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import OnboardingScreen from '../screens/Onboarding/OnboardingScreen';
import AuthNavigator from './AuthNavigator';
import WeddingSetupScreen from '../screens/WeddingSetup/WeddingSetupScreen';
import DashboardScreen from '../screens/Dashboard/DashboardScreen';
import TasksScreen from '../screens/Tasks/TasksScreen';
import MainTabs from './Maintabs';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Auth" component={AuthNavigator} />
      <Stack.Screen name="Main" component={MainTabs} />
      <Stack.Screen name="WeddingSetup" component={WeddingSetupScreen} />
      </Stack.Navigator>
  );
}
