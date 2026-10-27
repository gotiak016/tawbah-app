import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAuth } from '../context/AuthContext';
import { useHabit } from '../context/HabitContext';

import { AuthScreen } from '../screens/AuthScreen';
import { OnboardingAssessmentScreen } from '../screens/OnboardingAssessmentScreen';
import { DiagnosticReportScreen } from '../screens/DiagnosticReportScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { EmergencyReliefScreen } from '../screens/EmergencyReliefScreen';
import { TasbeehScreen } from '../screens/TasbeehScreen';
import { IslamicContentScreen } from '../screens/IslamicContentScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { Theme } from '../config/theme';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// شريط التبويب السفلي المريح
const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Theme.colors.surface,
          borderTopColor: Theme.colors.border,
          height: 64,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: Theme.colors.primary,
        tabBarInactiveTintColor: Theme.colors.textMuted,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '700',
        },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          tabBarLabel: 'الرئيسية',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 20, color }}>🌱</Text>,
        }}
      />
      <Tab.Screen
        name="TasbeehTab"
        component={TasbeehScreen}
        options={{
          tabBarLabel: 'المسبحة',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 20, color }}>📿</Text>,
        }}
      />
      <Tab.Screen
        name="ContentTab"
        component={IslamicContentScreen}
        options={{
          tabBarLabel: 'واحة الإيمان',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 20, color }}>📖</Text>,
        }}
      />
      <Tab.Screen
        name="SettingsTab"
        component={SettingsScreen}
        options={{
          tabBarLabel: 'الإعدادات',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 20, color }}>⚙️</Text>,
        }}
      />
    </Tab.Navigator>
  );
};

export const AppNavigator = () => {
  const { user, isLoading } = useAuth();
  const { report } = useHabit();

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Theme.colors.primary} />
        <Text style={styles.loadingText}>تَوْبَة... رفيقك نحو النقاء</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!user ? (
          // المستخدم غير مسجل دخول
          <Stack.Screen name="Auth" component={AuthScreen} />
        ) : !report ? (
          // مستخدم مسجل جديد لم يجرِ التقييم الشخصي بعد
          <>
            <Stack.Screen name="OnboardingAssessment" component={OnboardingAssessmentScreen} />
            <Stack.Screen name="DiagnosticReport" component={DiagnosticReportScreen} />
            <Stack.Screen name="MainTabs" component={MainTabs} />
          </>
        ) : (
          // مستخدم مكتمل التقييم
          <>
            <Stack.Screen name="MainTabs" component={MainTabs} />
            <Stack.Screen
              name="EmergencyRelief"
              component={EmergencyReliefScreen}
              options={{ presentation: 'fullScreenModal' }}
            />
            <Stack.Screen name="DiagnosticReport" component={DiagnosticReportScreen} />
            <Stack.Screen name="OnboardingAssessment" component={OnboardingAssessmentScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Theme.colors.background,
    gap: Theme.spacing.md,
  },
  loadingText: {
    fontSize: Theme.typography.sizes.bodyLg,
    fontWeight: 'bold',
    color: Theme.colors.primaryDark,
  },
});
