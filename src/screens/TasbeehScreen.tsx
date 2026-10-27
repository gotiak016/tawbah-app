import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Vibration,
} from 'react-native';
import { useHabit } from '../context/HabitContext';
import { Theme } from '../config/theme';

const DHIKR_LIST = [
  { id: '1', text: 'أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ', target: 100 },
  { id: '2', text: 'لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ', target: 100 },
  { id: '3', text: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ ، سُبْحَانَ اللَّهِ الْعَظِيمِ', target: 33 },
  { id: '4', text: 'اللَّهُمَّ صَلِّ وَسَلِّمْ عَلَى نَبِيِّنَا مُحَمَّدٍ', target: 100 },
  { id: '5', text: 'يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ', target: 33 },
];

export const TasbeehScreen = () => {
  const { tasbeehCount, incrementTasbeeh } = useHabit();
  const [selectedDhikrIndex, setSelectedDhikrIndex] = useState(0);
  const [sessionCount, setSessionCount] = useState(0);

  const currentDhikr = DHIKR_LIST[selectedDhikrIndex];

  const handleTap = async () => {
    Vibration.vibrate(25); // اهتزاز خفيف للمس
    setSessionCount((c) => c + 1);
    await incrementTasbeeh();
  };

  const handleResetSession = () => {
    setSessionCount(0);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Theme.colors.background} />

      <View style={styles.content}>
        {/* الترويسة */}
        <View style={styles.header}>
          <Text style={styles.title}>مِسْبَحَةُ الثَّبَاتِ وَالِاسْتِغْفَارِ 📿</Text>
          <Text style={styles.subtitle}>
            قال تعالى: {`{فَقُلْتُ اسْتَغْفِرُوا رَبَّكُمْ إِنَّهُ كَانَ غَفَّارًا}`}
          </Text>
        </View>

        {/* اختيار الذكر */}
        <View style={styles.dhikrSelector}>
          {DHIKR_LIST.map((item, idx) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.dhikrTab,
                idx === selectedDhikrIndex && styles.dhikrTabActive,
              ]}
              onPress={() => {
                setSelectedDhikrIndex(idx);
                setSessionCount(0);
              }}
            >
              <Text
                style={[
                  styles.dhikrTabText,
                  idx === selectedDhikrIndex && styles.dhikrTabTextActive,
                ]}
              >
                {item.text.slice(0, 22)}...
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* بطاقة الذكر المختار */}
        <View style={styles.dhikrCard}>
          <Text style={styles.dhikrFullText}>{currentDhikr.text}</Text>
          <Text style={styles.dhikrTarget}>الهدف الموصى به: {currentDhikr.target} مرة</Text>
        </View>

        {/* زر المسبحة اللمسي الكبير */}
        <View style={styles.tapAreaContainer}>
          <TouchableOpacity
            style={styles.bigCircleButton}
            onPress={handleTap}
            activeOpacity={0.8}
          >
            <Text style={styles.sessionCounter}>{sessionCount}</Text>
            <Text style={styles.tapPrompt}>اضغط للتسبيح</Text>
          </TouchableOpacity>
        </View>

        {/* الإحصائيات السفلية وأزرار التحكم */}
        <View style={styles.footer}>
          <View style={styles.totalBox}>
            <Text style={styles.totalNumber}>{tasbeehCount}</Text>
            <Text style={styles.totalLabel}>إجمالي الاستغفار بالتطبيق</Text>
          </View>

          <TouchableOpacity style={styles.resetButton} onPress={handleResetSession}>
            <Text style={styles.resetButtonText}>تصفير الجلسة</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: Theme.spacing.lg,
    paddingVertical: Theme.spacing.md,
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
  },
  title: {
    fontSize: Theme.typography.sizes.titleSm,
    fontWeight: 'bold',
    color: Theme.colors.primaryDark,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: Theme.typography.sizes.caption,
    color: Theme.colors.textSecondary,
    textAlign: 'center',
    marginTop: 2,
  },
  dhikrSelector: {
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    gap: Theme.spacing.xs,
    justifyContent: 'center',
    marginVertical: Theme.spacing.sm,
  },
  dhikrTab: {
    backgroundColor: Theme.colors.surface,
    paddingVertical: 6,
    paddingHorizontal: Theme.spacing.sm,
    borderRadius: Theme.borderRadius.pill,
    borderWidth: 1,
    borderColor: Theme.colors.border,
  },
  dhikrTabActive: {
    backgroundColor: Theme.colors.primary,
    borderColor: Theme.colors.primary,
  },
  dhikrTabText: {
    fontSize: Theme.typography.sizes.caption,
    color: Theme.colors.textSecondary,
    fontWeight: '500',
  },
  dhikrTabTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  dhikrCard: {
    backgroundColor: Theme.colors.surface,
    padding: Theme.spacing.md,
    borderRadius: Theme.borderRadius.md,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    alignItems: 'center',
    ...Theme.shadows.card,
  },
  dhikrFullText: {
    fontSize: Theme.typography.sizes.titleSm,
    fontWeight: 'bold',
    color: Theme.colors.primaryDark,
    textAlign: 'center',
    lineHeight: 28,
  },
  dhikrTarget: {
    fontSize: Theme.typography.sizes.caption,
    color: Theme.colors.goldMuted,
    marginTop: Theme.spacing.xs,
    fontWeight: '600',
  },
  tapAreaContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: Theme.spacing.lg,
  },
  bigCircleButton: {
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: Theme.colors.primarySoft,
    borderWidth: 6,
    borderColor: Theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...Theme.shadows.glowGold,
  },
  sessionCounter: {
    fontSize: 64,
    fontWeight: 'bold',
    color: Theme.colors.primaryDark,
  },
  tapPrompt: {
    fontSize: Theme.typography.sizes.bodySm,
    color: Theme.colors.textSecondary,
    marginTop: -4,
  },
  footer: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalBox: {
    alignItems: 'flex-end',
  },
  totalNumber: {
    fontSize: Theme.typography.sizes.titleSm,
    fontWeight: 'bold',
    color: Theme.colors.primaryDark,
  },
  totalLabel: {
    fontSize: 10,
    color: Theme.colors.textSecondary,
  },
  resetButton: {
    paddingVertical: Theme.spacing.xs,
    paddingHorizontal: Theme.spacing.sm,
    backgroundColor: Theme.colors.surfaceMuted,
    borderRadius: Theme.borderRadius.sm,
  },
  resetButtonText: {
    fontSize: Theme.typography.sizes.caption,
    color: Theme.colors.textSecondary,
    fontWeight: '600',
  },
});
