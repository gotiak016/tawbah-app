import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import { useHabit } from '../context/HabitContext';
import { useAuth } from '../context/AuthContext';
import { ISLAMIC_REMINDERS } from '../data/islamicReminders';
import { Theme } from '../config/theme';

export const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { streak, longestStreak, panicCount, tasbeehCount, report, recordRelapse } = useHabit();
  const { userProfile } = useAuth();
  const [currentReminder] = useState(ISLAMIC_REMINDERS[0]); // تذكير الدورة الحالية

  const handlePanicPress = () => {
    navigation.navigate('EmergencyRelief');
  };

  const handleRelapsePress = () => {
    Alert.alert(
      'تجديد التوبة والعهد',
      'يا أخي لا تقنط من رحمة الله، فالذنب زلة والتوبة واجبة فوراً. قال ﷺ: "كل بني آدم خطاء وخير الخطائين التوابون". هل ترغب في تصفير العداد والبدء بنية أصدق؟',
      [
        { text: 'تراجع', style: 'cancel' },
        {
          text: 'أستغفر الله وأجدد التوبة',
          style: 'destructive',
          onPress: async () => {
            await recordRelapse();
            Alert.alert('تقبل الله توبتك', 'قم وتوضأ وصلِّ ركعتين، واعلم أن الله يفرح بتوبة عبده.');
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Theme.colors.background} />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* الترويسة العليا والترحيب */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>السلام عليكم ورحمة الله 🌿</Text>
            <Text style={styles.userName}>{userProfile?.displayName || 'تائب إلى الله'}</Text>
          </View>
          <TouchableOpacity
            style={styles.profileBadge}
            onPress={() => navigation.navigate('Settings')}
          >
            <Text style={styles.profileBadgeText}>⚙️</Text>
          </TouchableOpacity>
        </View>

        {/* العداد الدائري الكبير لأيام الثبات */}
        <View style={styles.counterCard}>
          <View style={styles.counterCircle}>
            <Text style={styles.counterNumber}>{streak}</Text>
            <Text style={styles.counterUnit}>يوماً نقياً</Text>
            <View style={styles.streakBadge}>
              <Text style={styles.streakBadgeText}>
                {streak === 0 ? 'اليوم الأول - بداية العهد' : `أنت ثابت منذ ${streak} يوم`}
              </Text>
            </View>
          </View>

          <Text style={styles.counterEncouragement}>
            {streak < 7
              ? 'أيامك الأولى هي أصعبها وأعظمها أجراً، ثبتك الله!'
              : streak < 21
              ? 'مرحلة الفتور وإعادة تنظيم الدماغ، استمر ولا تتراجع!'
              : streak < 90
              ? 'مساراتك العصبية تتعافى، وبصيرتك تستنير بنور العفة.'
              : 'ما شاء الله! أنت في مرحلة التحرر التام والنقاء.'}
          </Text>
        </View>

        {/* زر الطوارئ والاستغاثة السريع (أهم عنصر أمان) */}
        <TouchableOpacity
          style={styles.panicButton}
          onPress={handlePanicPress}
          activeOpacity={0.88}
        >
          <View style={styles.panicButtonInner}>
            <Text style={styles.panicIcon}>🚨</Text>
            <View style={styles.panicTextBox}>
              <Text style={styles.panicTitle}>أغثني يا الله! (زر الثبات الفوري)</Text>
              <Text style={styles.panicSubtitle}>
                اضغط هنا فوراً إذا هاجمتك الرغبة أو وسوسة الشيطان لكسرها
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* بطاقة التذكير الدوري الحالي (كل 5 ساعات) */}
        <View style={styles.reminderCard}>
          <View style={styles.reminderHeader}>
            <Text style={styles.reminderTag}>🕊️ تذكير الثبات (يتجدد كل 5 ساعات)</Text>
          </View>
          <Text style={styles.reminderTitle}>{currentReminder.title}</Text>
          <Text style={styles.reminderBody}>{currentReminder.body}</Text>
        </View>

        {/* شبكة الإحصائيات والأرقام */}
        <View style={styles.statsGrid}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{longestStreak}</Text>
            <Text style={styles.statLabel}>أطول سلسلة (يوم)</Text>
          </View>

          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{panicCount}</Text>
            <Text style={styles.statLabel}>لحظات نجاة وانتصار</Text>
          </View>

          <TouchableOpacity
            style={styles.statBox}
            onPress={() => navigation.navigate('Tasbeeh')}
          >
            <Text style={styles.statNumber}>{tasbeehCount}</Text>
            <Text style={styles.statLabel}>أذكار واستغفار 📿</Text>
          </TouchableOpacity>
        </View>

        {/* بطاقة تقرير التشخيص إذا كان متاحاً */}
        {report && (
          <TouchableOpacity
            style={styles.reportSummaryCard}
            onPress={() => navigation.navigate('DiagnosticReport', { report })}
            activeOpacity={0.8}
          >
            <View style={styles.reportRow}>
              <Text style={styles.reportArrow}>←</Text>
              <View style={styles.reportInfo}>
                <Text style={styles.reportTitle}>مراجعة خطة تعافيك الشخصية</Text>
                <Text style={styles.reportSub}>
                  المرحلة المقدرة لترميم الدوبامين: {report.dopamineResetDays} يوماً
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}

        {/* زر تسجيل الانتكاسة اللطيف */}
        <TouchableOpacity
          style={styles.relapseButton}
          onPress={handleRelapsePress}
          activeOpacity={0.7}
        >
          <Text style={styles.relapseButtonText}>حدثت زلّة؟ اضغط هنا لتجديد التوبة والعهد</Text>
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
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Theme.spacing.lg,
  },
  greeting: {
    fontSize: Theme.typography.sizes.bodySm,
    color: Theme.colors.textSecondary,
    textAlign: 'right',
  },
  userName: {
    fontSize: Theme.typography.sizes.titleSm,
    fontWeight: 'bold',
    color: Theme.colors.primaryDark,
    textAlign: 'right',
  },
  profileBadge: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: Theme.colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Theme.colors.border,
    ...Theme.shadows.card,
  },
  profileBadgeText: {
    fontSize: 20,
  },
  counterCard: {
    backgroundColor: Theme.colors.surface,
    borderRadius: Theme.borderRadius.lg,
    padding: Theme.spacing.xl,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Theme.colors.border,
    marginBottom: Theme.spacing.lg,
    ...Theme.shadows.card,
  },
  counterCircle: {
    width: 170,
    height: 170,
    borderRadius: 85,
    backgroundColor: Theme.colors.primarySoft,
    borderWidth: 4,
    borderColor: Theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Theme.spacing.md,
  },
  counterNumber: {
    fontSize: Theme.typography.sizes.counter,
    fontWeight: 'bold',
    color: Theme.colors.primaryDark,
    lineHeight: 68,
  },
  counterUnit: {
    fontSize: Theme.typography.sizes.body,
    fontWeight: '700',
    color: Theme.colors.textSecondary,
    marginTop: -4,
  },
  streakBadge: {
    backgroundColor: Theme.colors.primary,
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: 2,
    borderRadius: Theme.borderRadius.pill,
    marginTop: Theme.spacing.xs,
  },
  streakBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  counterEncouragement: {
    fontSize: Theme.typography.sizes.bodySm,
    color: Theme.colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: Theme.spacing.sm,
  },
  panicButton: {
    backgroundColor: Theme.colors.dangerSoft,
    borderRadius: Theme.borderRadius.md,
    borderWidth: 1.5,
    borderColor: Theme.colors.danger,
    padding: Theme.spacing.md,
    marginBottom: Theme.spacing.lg,
  },
  panicButtonInner: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: Theme.spacing.md,
  },
  panicIcon: {
    fontSize: 32,
  },
  panicTextBox: {
    flex: 1,
  },
  panicTitle: {
    fontSize: Theme.typography.sizes.bodyLg,
    fontWeight: 'bold',
    color: Theme.colors.danger,
    textAlign: 'right',
  },
  panicSubtitle: {
    fontSize: Theme.typography.sizes.caption,
    color: Theme.colors.textSecondary,
    textAlign: 'right',
    marginTop: 2,
    lineHeight: 18,
  },
  reminderCard: {
    backgroundColor: Theme.colors.surface,
    padding: Theme.spacing.md,
    borderRadius: Theme.borderRadius.md,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    marginBottom: Theme.spacing.lg,
    ...Theme.shadows.card,
  },
  reminderHeader: {
    marginBottom: Theme.spacing.xs,
  },
  reminderTag: {
    fontSize: Theme.typography.sizes.caption,
    color: Theme.colors.goldMuted,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  reminderTitle: {
    fontSize: Theme.typography.sizes.body,
    fontWeight: 'bold',
    color: Theme.colors.primaryDark,
    textAlign: 'right',
    marginBottom: 4,
  },
  reminderBody: {
    fontSize: Theme.typography.sizes.bodySm,
    color: Theme.colors.textPrimary,
    textAlign: 'right',
    lineHeight: 22,
  },
  statsGrid: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    gap: Theme.spacing.sm,
    marginBottom: Theme.spacing.lg,
  },
  statBox: {
    flex: 1,
    backgroundColor: Theme.colors.surface,
    paddingVertical: Theme.spacing.md,
    paddingHorizontal: Theme.spacing.xs,
    borderRadius: Theme.borderRadius.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Theme.colors.border,
    ...Theme.shadows.card,
  },
  statNumber: {
    fontSize: Theme.typography.sizes.titleSm,
    fontWeight: 'bold',
    color: Theme.colors.primaryDark,
  },
  statLabel: {
    fontSize: 10,
    color: Theme.colors.textSecondary,
    marginTop: 2,
    textAlign: 'center',
  },
  reportSummaryCard: {
    backgroundColor: Theme.colors.primarySoft,
    padding: Theme.spacing.md,
    borderRadius: Theme.borderRadius.md,
    borderWidth: 1,
    borderColor: Theme.colors.primary,
    marginBottom: Theme.spacing.lg,
  },
  reportRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reportArrow: {
    fontSize: 20,
    color: Theme.colors.primaryDark,
    fontWeight: 'bold',
  },
  reportInfo: {
    alignItems: 'flex-end',
  },
  reportTitle: {
    fontSize: Theme.typography.sizes.body,
    fontWeight: 'bold',
    color: Theme.colors.primaryDark,
  },
  reportSub: {
    fontSize: Theme.typography.sizes.caption,
    color: Theme.colors.textSecondary,
    marginTop: 2,
  },
  relapseButton: {
    paddingVertical: Theme.spacing.sm,
    alignItems: 'center',
  },
  relapseButtonText: {
    fontSize: Theme.typography.sizes.bodySm,
    color: Theme.colors.textMuted,
    textDecorationLine: 'underline',
  },
});
