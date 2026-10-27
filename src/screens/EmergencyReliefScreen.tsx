import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import { useHabit } from '../context/HabitContext';
import { Theme } from '../config/theme';

export const EmergencyReliefScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { recordPanicUrge } = useHabit();
  // مؤقت 15 دقيقة (900 ثانية) موجة كسر الرغبة العصبية
  const [secondsLeft, setSecondsLeft] = useState(15 * 60);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    let interval: any = null;
    if (isActive && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((sec) => sec - 1);
      }, 1000);
    } else if (secondsLeft === 0) {
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, secondsLeft]);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleVictory = async () => {
    await recordPanicUrge();
    Alert.alert(
      'الله أكبر! هنيئاً لك النصر 🌿',
      'لقد قاومت نزغة شيطانية وكتبت لك مجاهدة عظيمة في سبيل الله. قال تعالى: {وَأَمَّا مَنْ خَافَ مَقَامَ رَبِّهِ وَنَهَى النَّفْسَ عَنِ الْهَوَىٰ فَإِنَّ الْجَنَّةَ هِيَ الْمَأْوَىٰ}.',
      [
        {
          text: 'الحمد لله، العودة للرئيسية',
          onPress: () => navigation.goBack(),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF5F5" />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* الترويسة الطارئة المهدئة */}
        <View style={styles.header}>
          <Text style={styles.emergencyBadge}>🛡️ وضع الثبات وحصن المسلم</Text>
          <Text style={styles.title}>اثبت! أنت في معركة عزة وشرف</Text>
          <Text style={styles.subtitle}>
            الرغبة كالموجة، تعلو لدقائق ثم تتلاشى. لا تستسلم للخمس ثوانٍ الأولى!
          </Text>
        </View>

        {/* مؤقت موجة الرغبة (15 دقيقة) */}
        <View style={styles.timerCard}>
          <Text style={styles.timerLabel}>الوقت المتبقي لكسر الدوبامين الزائف:</Text>
          <Text style={styles.timerText}>{formatTime(secondsLeft)}</Text>
          <Text style={styles.timerSub}>
            أثبت العلم أن الرغبة الملحة تفقد 80% من شدتها بعد 10 إلى 15 دقيقة من تشتيت الانتباه.
          </Text>
        </View>

        {/* بروتوكول الخطوات العملية الأربع */}
        <View style={styles.stepsCard}>
          <Text style={styles.stepsTitle}>⚡ خطواتك الآن في هذه اللحظة:</Text>

          <View style={styles.stepItem}>
            <View style={styles.stepNum}>
              <Text style={styles.stepNumText}>1</Text>
            </View>
            <View style={styles.stepTextBox}>
              <Text style={styles.stepHead}>غادر المكان فوراً</Text>
              <Text style={styles.stepBody}>اترك الغرفة المغلقة أو الفراش، واجلس مع أهلك أو في الصالة.</Text>
            </View>
          </View>

          <View style={styles.stepItem}>
            <View style={styles.stepNum}>
              <Text style={styles.stepNumText}>2</Text>
            </View>
            <View style={styles.stepTextBox}>
              <Text style={styles.stepHead}>الوضوء بالماء البارد</Text>
              <Text style={styles.stepBody}>الماء البارد يخمد حرارة الشهوة ويُفعّل الجهاز العصبي المهدئ.</Text>
            </View>
          </View>

          <View style={styles.stepItem}>
            <View style={styles.stepNum}>
              <Text style={styles.stepNumText}>3</Text>
            </View>
            <View style={styles.stepTextBox}>
              <Text style={styles.stepHead}>الاستعاذة بصوت مسموع</Text>
              <Text style={styles.stepBody}>قل: "أعوذ بالله السميع العليم من الشيطان الرجيم".</Text>
            </View>
          </View>

          <View style={styles.stepItem}>
            <View style={styles.stepNum}>
              <Text style={styles.stepNumText}>4</Text>
            </View>
            <View style={styles.stepTextBox}>
              <Text style={styles.stepHead}>صلاة ركعتين بنية العفة</Text>
              <Text style={styles.stepBody}>صلِّ ركعتين خاشعتين واطلب من الله في سجودك أن يصرف عنك السوء.</Text>
            </View>
          </View>
        </View>

        {/* دعاء الصرف والاستعاذة */}
        <View style={styles.duaCard}>
          <Text style={styles.duaTitle}>🤲 ردد هذا الدعاء بإلحاح:</Text>
          <Text style={styles.duaText}>
            {'"اللهم إني أعوذ بك من شر سمعي، ومن شر بصري، ومن شر لساني، ومن شر قلبي، ومن شر مَنِيِّي."'}
          </Text>
        </View>

        {/* زر إعلان الانتصار وتثبيت الإنجاز */}
        <TouchableOpacity
          style={styles.victoryButton}
          onPress={handleVictory}
          activeOpacity={0.85}
        >
          <Text style={styles.victoryButtonText}>الحمد لله! تغلبت على الرغبة ونجوت 🌿</Text>
        </TouchableOpacity>

        {/* زر التراجع */}
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Text style={styles.cancelButtonText}>إلغاء والعودة للرئيسية</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF8F5',
  },
  scrollContent: {
    paddingHorizontal: Theme.spacing.lg,
    paddingTop: Theme.spacing.lg,
    paddingBottom: Theme.spacing.xxl,
  },
  header: {
    alignItems: 'center',
    marginBottom: Theme.spacing.lg,
  },
  emergencyBadge: {
    backgroundColor: Theme.colors.dangerSoft,
    color: Theme.colors.danger,
    fontSize: Theme.typography.sizes.caption,
    fontWeight: 'bold',
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.xs,
    borderRadius: Theme.borderRadius.pill,
    marginBottom: Theme.spacing.sm,
  },
  title: {
    fontSize: Theme.typography.sizes.title,
    fontWeight: 'bold',
    color: Theme.colors.textPrimary,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: Theme.typography.sizes.bodySm,
    color: Theme.colors.textSecondary,
    textAlign: 'center',
    marginTop: Theme.spacing.xs,
    lineHeight: 20,
  },
  timerCard: {
    backgroundColor: Theme.colors.surface,
    padding: Theme.spacing.lg,
    borderRadius: Theme.borderRadius.lg,
    borderWidth: 2,
    borderColor: Theme.colors.danger,
    alignItems: 'center',
    marginBottom: Theme.spacing.lg,
    ...Theme.shadows.card,
  },
  timerLabel: {
    fontSize: Theme.typography.sizes.bodySm,
    color: Theme.colors.textSecondary,
    marginBottom: Theme.spacing.xs,
  },
  timerText: {
    fontSize: 54,
    fontWeight: 'bold',
    color: Theme.colors.danger,
    letterSpacing: 2,
  },
  timerSub: {
    fontSize: Theme.typography.sizes.caption,
    color: Theme.colors.textMuted,
    textAlign: 'center',
    marginTop: Theme.spacing.xs,
    lineHeight: 18,
  },
  stepsCard: {
    backgroundColor: Theme.colors.surface,
    padding: Theme.spacing.md,
    borderRadius: Theme.borderRadius.md,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    marginBottom: Theme.spacing.lg,
    ...Theme.shadows.card,
  },
  stepsTitle: {
    fontSize: Theme.typography.sizes.bodyLg,
    fontWeight: 'bold',
    color: Theme.colors.primaryDark,
    textAlign: 'right',
    marginBottom: Theme.spacing.md,
  },
  stepItem: {
    flexDirection: 'row-reverse',
    alignItems: 'flex-start',
    marginBottom: Theme.spacing.md,
    gap: Theme.spacing.sm,
  },
  stepNum: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: Theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepNumText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  stepTextBox: {
    flex: 1,
  },
  stepHead: {
    fontSize: Theme.typography.sizes.body,
    fontWeight: 'bold',
    color: Theme.colors.textPrimary,
    textAlign: 'right',
  },
  stepBody: {
    fontSize: Theme.typography.sizes.caption,
    color: Theme.colors.textSecondary,
    textAlign: 'right',
    marginTop: 2,
    lineHeight: 18,
  },
  duaCard: {
    backgroundColor: Theme.colors.primarySoft,
    padding: Theme.spacing.md,
    borderRadius: Theme.borderRadius.md,
    borderWidth: 1,
    borderColor: Theme.colors.primary,
    marginBottom: Theme.spacing.xl,
    alignItems: 'center',
  },
  duaTitle: {
    fontSize: Theme.typography.sizes.bodySm,
    fontWeight: 'bold',
    color: Theme.colors.primaryDark,
    marginBottom: Theme.spacing.xs,
  },
  duaText: {
    fontSize: Theme.typography.sizes.body,
    fontWeight: '600',
    color: Theme.colors.primaryDark,
    textAlign: 'center',
    lineHeight: 24,
  },
  victoryButton: {
    backgroundColor: Theme.colors.primary,
    paddingVertical: Theme.spacing.md,
    borderRadius: Theme.borderRadius.pill,
    alignItems: 'center',
    marginBottom: Theme.spacing.sm,
    ...Theme.shadows.button,
  },
  victoryButtonText: {
    color: '#FFFFFF',
    fontSize: Theme.typography.sizes.bodyLg,
    fontWeight: 'bold',
  },
  cancelButton: {
    paddingVertical: Theme.spacing.sm,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: Theme.typography.sizes.bodySm,
    color: Theme.colors.textSecondary,
  },
});
