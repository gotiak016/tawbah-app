import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { ISLAMIC_REMINDERS } from '../data/islamicReminders';

// تهيئة معالج الإشعارات أثناء فتح التطبيق
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export const NotificationService = {
  /**
   * طلب الصلاحيات وإنشاء قنوات الإشعار لنظام أندرويد
   */
  async requestPermissions(): Promise<boolean> {
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('tawbah_5h_channel', {
        name: 'تذكيرات الثبات والتوبة (كل 5 ساعات)',
        importance: Notifications.AndroidImportance.HIGH,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#2E6B56',
        sound: 'default',
      });
    }

    const permissions = await Notifications.getPermissionsAsync();
    let isGranted = permissions.granted;

    if (!isGranted) {
      const requested = await Notifications.requestPermissionsAsync();
      isGranted = requested.granted;
    }

    return isGranted;
  },

  /**
   * جدولة إشعارات تشجيعية ودينية دورية كل 5 ساعات (18,000 ثانية)
   */
  async schedule5HourReminders(): Promise<void> {
    const hasPermission = await this.requestPermissions();
    if (!hasPermission) return;

    // إلغاء الإشعارات السابقة المجدولة لتجنب التكرار
    await Notifications.cancelAllScheduledNotificationsAsync();

    const FIVE_HOURS_SECONDS = 5 * 60 * 60; // 18000 ثانية

    // جدولة دورة من 5 إشعارات تغطي 25 ساعة بتتابع مدروس
    for (let i = 0; i < 5; i++) {
      const reminder = ISLAMIC_REMINDERS[i % ISLAMIC_REMINDERS.length];
      const triggerSeconds = (i + 1) * FIVE_HOURS_SECONDS;

      await Notifications.scheduleNotificationAsync({
        content: {
          title: reminder.title,
          body: reminder.body,
          data: { reminderId: reminder.id, type: reminder.type },
          sound: 'default',
        },
        trigger: {
          seconds: triggerSeconds,
          repeats: true,
          channelId: 'tawbah_5h_channel',
        },
      });
    }
  },

  /**
   * إرسال إشعار فوري للتجربة أو عند ضغط زر الاستغاثة
   */
  async sendInstantNotification(title: string, body: string): Promise<void> {
    const hasPermission = await this.requestPermissions();
    if (!hasPermission) return;

    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        sound: 'default',
      },
      trigger: null, // فوري
    });
  },
};
