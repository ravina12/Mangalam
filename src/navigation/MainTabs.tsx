import React from "react";;
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text } from "react-native";
import { colors } from "../components/theme/colors";
import DashboardScreen from "../screens/Dashboard/DashboardScreen";
import TasksScreen from "../screens/Tasks/TasksScreen";
import BudgetScreen from "../screens/Budget/BudgetScreen";
import GuestsScreen from "../screens/Guests/GuestsScreen";
import VendorsScreen from "../screens/Vendors/VendorsScreen";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator();

const MainTabs = () => {
      const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator screenOptions={{ headerShown: false,tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary, tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.border,
          height: 100 + insets.bottom,  // 👈 adds space for system buttons
          paddingBottom: 100,
        }, }}>
      <Tab.Screen name="Dashboard" component={DashboardScreen}  options={{
          tabBarLabel: ({ color }) => <Text style={{ color }}>Home</Text>,
        }}/>
      <Tab.Screen name="Tasks" component={TasksScreen} options={{
          tabBarLabel: ({ color }) => <Text style={{ color }}>Tasks</Text>,
        }}/>
      <Tab.Screen name="Budget" component={BudgetScreen} options={{
          tabBarLabel: ({ color }) => <Text style={{ color }}>Budget</Text>,
        }}/>
      <Tab.Screen name="Guests" component={GuestsScreen}  options={{
          tabBarLabel: ({ color }) => <Text style={{ color }}>Guests</Text>,
        }}/>
      <Tab.Screen name="Vendors" component={VendorsScreen}  options={{
          tabBarLabel: ({ color }) => <Text style={{ color }}>Vendors</Text>,
        }} />
    </Tab.Navigator>
  );
};

export default MainTabs;