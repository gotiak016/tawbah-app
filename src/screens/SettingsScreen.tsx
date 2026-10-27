import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Alert,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { NotificationService } from '../services/notificationService';
import { Theme } from '../config/theme';

export const SettingsScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { user, userProfile, signOut } = useAuth();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleToggleNotifications = async (val: boolean) => {
    setNotificationsEnabled(val);
    if (val) {
      await NotificationService.schedule5HourReminders();
      Alert.alert('تم التفعيل', 'تمت جدولة تذكيرات التوبة والثبات كل 5 ساعات بنجاح.');
    }
  };

  const handleTestNotification = async () => {
    await NotificationService.sendInstantNotification(
      '🌿 تذكير فوري - تطبيق توبة',
      'قال تعالى: {أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ}. اثبت يا بطل فالله معك!'
    );
    Alert.alert('تم الإرسال', 'تحقق من شريط الإشعارات أعلى هاتفك.');
  };

  const handleRetakeAssessment = () => {
    Alert.alert(
      'إعادة التشخيص',
      'هل ترغب في إعادة الإجابة على الاستبيان وتوليد تقرير تشخيصي جديد؟',
      [
        { text: 'إلغاء', style: 'cancel' },
        {
          text: 'نعم، ابدأ',
          onPress: () => navigation.navigate('OnboardingAssessment'),
        },
      ]
    );
  };

  const handleSignOut = () => {
    Alert.alert('تسجيل الخروج', 'هل أنت متأكد من رغبتك في تسجيل الخروج؟', [
      { text: 'إلغاء', style: 'cancel' },
      { text: 'خروج', style: 'destructive', onPress: signOut },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Theme.colors.background} />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* الترويسة */}
        <View style={styles.header}>
          <Text style={styles.title}>الإعدادات والملف الشخصي ⚙️</Text>
        </View>

        {/* بطاقة الحساب المسجل */}
        <View style={styles.accountCard}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarInitial}>
              {userProfile?.displayName ? userProfile.displayName.charAt(0) : 'ت'}
            </Text>
          </View>
          <View style={styles.accountDetails}>
            <Text style={styles.accountName}>{userProfile?.displayName || 'تائب إلى الله'}</Text>
            <Text style={styles.accountEmail}>{user?.email || 'حساب Google متصل'}</Text>
            <View style={styles.googleBadge}>
              <Text style={styles.googleBadgeText}>✓ مسجل عبر Google</Text>
            </View>
          </View>
        </View>

        {/* قسم التنبيهات والإشعارات كل 5 ساعات */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionHeader}>🔔 إشعارات الثبات والقرآن</Text>

          <View style={styles.settingRow}>
            <Switch
              value={notificationsEnabled}
              onValueChange={handleToggleNotifications}
              trackColor={{ false: Theme.colors.surfaceMuted, true: Theme.colors.primary }}
              thumbColor="#FFFFFF"
            />
            <View style={styles.settingLabelBox}>
              <Text style={styles.settingTitle}>تذكير الثبات كل 5 ساعات</Text>
              <Text style={styles.settingSub}>
                يرسل آيات قرآنية وأذكاراً تشجيعية دورياً لإبقاء قلبك متيقظاً
              </Text>
            </View>
          </View>

          <TouchableOpacity style={styles.testNotifButton} onPress={handleTestNotification}>
            <Text style={styles.testNotifButtonText}>📲 إرسال إشعار تجريبي الآن</Text>
          </TouchableOpacity>
        </View>

        {/* قسم خطة التعافي */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionHeader}>📋 التقرير والتشخيص</Text>

          <TouchableOpacity style={styles.actionRow} onPress={handleRetakeAssessment}>
            <Text style={styles.actionArrow}>←</Text>
            <Text style={styles.actionTitle}>إعادة إجراء الاستبيان التشخيصي</Text>
          </TouchableOpacity>
        </View>

        {/* قسم معلومات التطبيق والخصوصية */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionHeader}>ℹ️ عن التطبيق</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoVal}>1.0.0</Text>
            <Text style={styles.infoKey}>الإصدار:</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoVal}>com.tawbah.app</Text>
            <Text style={styles.infoKey}>اسم الحزمة:</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoVal}>مشفرة بالكامل على خادمك</Text>
            <Text style={styles.infoKey}>حماية البيانات:</Text>
          </View>
        </View>

        {/* زر تسجيل الخروج */}
        <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut} activeOpacity={0.8}>
          <Text style={styles.signOutButtonText}>تسجيل الخروج من الحساب</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  scrollContent: {
    paddingHorizontal: Theme.spacing.lg,
    paddingTop: Theme.spacing.md,
    paddingBottom: Theme.spacing.xxl,
  },
  header: {
    alignItems: 'center',
    marginBottom: Theme.spacing.lg,
  },
  title: {
    fontSize: Theme.typography.sizes.titleSm,
    fontWeight: 'bold',
    color: Theme.colors.primaryDark,
  },
  accountCard: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    backgroundColor: Theme.colors.surface,
    padding: Theme.spacing.md,
    borderRadius: Theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    marginBottom: Theme.spacing.lg,
    gap: Theme.spacing.md,
    ...Theme.shadows.card,
  },
  avatarCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Theme.colors.primarySoft,
    borderWidth: 2,
    borderColor: Theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarInitial: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Theme.colors.primaryDark,
  },
  accountDetails: {
    flex: 1,
    alignItems: 'flex-end',
  },
  accountName: {
    fontSize: Theme.typography.sizes.bodyLg,
    fontWeight: 'bold',
    color: Theme.colors.textPrimary,
  },
  accountEmail: {
    fontSize: Theme.typography.sizes.caption,
    color: Theme.colors.textSecondary,
    marginTop: 2,
  },
  googleBadge: {
    backgroundColor: Theme.colors.primarySoft,
    paddingHorizontal: Theme.spacing.xs,
    paddingVertical: 2,
    borderRadius: Theme.borderRadius.sm,
    marginTop: Theme.spacing.xs,
  },
  googleBadgeText: {
    fontSize: 10,
    color: Theme.colors.primaryDark,
    fontWeight: 'bold',
  },
  sectionCard: {
    backgroundColor: Theme.colors.surface,
    padding: Theme.spacing.md,
    borderRadius: Theme.borderRadius.md,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    marginBottom: Theme.spacing.md,
    ...Theme.shadows.card,
  },
  sectionHeader: {
    fontSize: Theme.typography.sizes.body,
    fontWeight: 'bold',
    color: Theme.colors.primaryDark,
    textAlign: 'right',
    marginBottom: Theme.spacing.md,
  },
  settingRow: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Theme.spacing.sm,
  },
  settingLabelBox: {
    flex: 1,
    alignItems: 'flex-end',
    paddingLeft: Theme.spacing.md,
  },
  settingTitle: {
    fontSize: Theme.typography.sizes.body,
    fontWeight: 'bold',
    color: Theme.colors.textPrimary,
    textAlign: 'right',
  },
  settingSub: {
    fontSize: Theme.typography.sizes.caption,
    color: Theme.colors.textSecondary,
    textAlign: 'right',
    marginTop: 2,
    lineHeight: 18,
  },
  testNotifButton: {
    backgroundColor: Theme.colors.surfaceSecondary,
    paddingVertical: Theme.spacing.sm,
    borderRadius: Theme.borderRadius.sm,
    alignItems: 'center',
    marginTop: Theme.spacing.xs,
  },
  testNotifButtonText: {
    color: Theme.colors.primaryDark,
    fontSize: Theme.typography.sizes.bodySm,
    fontWeight: '600',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Theme.spacing.xs,
  },
  actionTitle: {
    fontSize: Theme.typography.sizes.body,
    color: Theme.colors.textPrimary,
  },
  actionArrow: {
    fontSize: 18,
    color: Theme.colors.textSecondary,
  },
  infoRow: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  infoKey: {
    fontSize: Theme.typography.sizes.bodySm,
    color: Theme.colors.textSecondary,
  },
  infoVal: {
    fontSize: Theme.typography.sizes.bodySm,
    color: Theme.colors.textPrimary,
    fontWeight: '600',
  },
  signOutButton: {
    backgroundColor: Theme.colors.dangerSoft,
    paddingVertical: Theme.spacing.md,
    borderRadius: Theme.borderRadius.pill,
    alignItems: 'center',
    marginTop: Theme.spacing.md,
    borderWidth: 1,
    borderColor: Theme.colors.danger,
  },
  signOutButtonText: {
    color: Theme.colors.danger,
    fontSize: Theme.typography.sizes.body,
    fontWeight: 'bold',
  },
});
