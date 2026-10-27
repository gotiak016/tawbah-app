import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './src/context/AuthContext';
import { HabitProvider } from './src/context/HabitContext';
import { AppNavigator } from './src/navigation/AppNavigator';
import { NotificationService } from './src/services/notificationService';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  useEffect(() => {
    // جدولة إشعارات الثبات والقرآن كل 5 ساعات عند تشغيل التطبيق
    NotificationService.schedule5HourReminders().catch((err) => {
      console.warn('Notification schedule notice:', err);
    });
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <AuthProvider>
        <HabitProvider>
          <AppNavigator />
        </HabitProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
