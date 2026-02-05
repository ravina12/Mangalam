import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { StatusBar, StyleSheet } from 'react-native';
import { colors } from './src/components/theme/colors';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { TasksProvider } from './src/context/TasksContext';
import { KeyboardProvider } from "react-native-keyboard-controller";
import { WeddingProvider } from './src/context/WeddingContext';


export default function App() {
  return (
    <KeyboardProvider>
      <WeddingProvider>

        <TasksProvider>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={colors.background}
      />
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
    </TasksProvider>
    </WeddingProvider>
    </KeyboardProvider>
  );
}


const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
});