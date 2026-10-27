import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { ASSESSMENT_QUESTIONS, QuestionOption } from '../data/assessmentQuestions';
import { AssessmentEngine } from '../services/assessmentEngine';
import { useHabit } from '../context/HabitContext';
import { Theme } from '../config/theme';

export const OnboardingAssessmentScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, QuestionOption>>({});
  const { saveAssessmentReport } = useHabit();

  const currentQuestion = ASSESSMENT_QUESTIONS[currentIndex];
  const progressPercent = Math.round(((currentIndex + 1) / ASSESSMENT_QUESTIONS.length) * 100);

  const handleSelectOption = (option: QuestionOption) => {
    const updatedAnswers = {
      ...answers,
      [currentQuestion.id]: option,
    };
    setAnswers(updatedAnswers);

    // الانتقال للسؤال التالي أو استخراج التقرير
    if (currentIndex < ASSESSMENT_QUESTIONS.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // اكتمال الاستبيان، توليد التقرير التشخيصي
      const report = AssessmentEngine.generateReport(updatedAnswers);
      saveAssessmentReport(report);
      navigation.navigate('DiagnosticReport', { report });
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Theme.colors.background} />

      {/* شريط التقدم والترويسة */}
      <View style={styles.header}>
        <View style={styles.topRow}>
          {currentIndex > 0 ? (
            <TouchableOpacity onPress={handleBack} style={styles.backButton}>
              <Text style={styles.backButtonText}>السابق</Text>
            </TouchableOpacity>
          ) : (
            <View style={{ width: 60 }} />
          )}

          <Text style={styles.stepText}>
            السؤال {currentIndex + 1} من {ASSESSMENT_QUESTIONS.length}
          </Text>

          <View style={{ width: 60 }} />
        </View>

        <View style={styles.progressBarBackground}>
          <View style={[styles.progressBarFill, { width: `${progressPercent}%` }]} />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* بطاقة السؤال */}
        <View style={styles.questionContainer}>
          <Text style={styles.questionTitle}>{currentQuestion.title}</Text>
          {currentQuestion.subtitle ? (
            <Text style={styles.questionSubtitle}>{currentQuestion.subtitle}</Text>
          ) : null}
        </View>

        {/* قائمة الخيارات */}
        <View style={styles.optionsContainer}>
          {currentQuestion.options.map((option) => {
            const isSelected = answers[currentQuestion.id]?.id === option.id;
            return (
              <TouchableOpacity
                key={option.id}
                style={[styles.optionCard, isSelected && styles.optionCardSelected]}
                onPress={() => handleSelectOption(option)}
                activeOpacity={0.7}
              >
                <Text style={[styles.optionText, isSelected && styles.optionTextSelected]}>
                  {option.text}
                </Text>
                <View style={[styles.radioCircle, isSelected && styles.radioCircleSelected]}>
                  {isSelected && <View style={styles.radioInner} />}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  header: {
    paddingHorizontal: Theme.spacing.lg,
    paddingTop: Theme.spacing.md,
    paddingBottom: Theme.spacing.sm,
  },
  topRow: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Theme.spacing.sm,
  },
  backButton: {
    paddingVertical: Theme.spacing.xs,
    paddingHorizontal: Theme.spacing.sm,
  },
  backButtonText: {
    color: Theme.colors.primary,
    fontSize: Theme.typography.sizes.body,
    fontWeight: '600',
  },
  stepText: {
    fontSize: Theme.typography.sizes.bodySm,
    fontWeight: '700',
    color: Theme.colors.textSecondary,
  },
  progressBarBackground: {
    height: 6,
    backgroundColor: Theme.colors.surfaceMuted,
    borderRadius: Theme.borderRadius.pill,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: Theme.colors.primary,
    borderRadius: Theme.borderRadius.pill,
  },
  scrollContent: {
    paddingHorizontal: Theme.spacing.lg,
    paddingTop: Theme.spacing.lg,
    paddingBottom: Theme.spacing.xl,
  },
  questionContainer: {
    marginBottom: Theme.spacing.xl,
  },
  questionTitle: {
    fontSize: Theme.typography.sizes.title,
    fontWeight: 'bold',
    color: Theme.colors.textPrimary,
    textAlign: 'right',
    lineHeight: 32,
    marginBottom: Theme.spacing.xs,
  },
  questionSubtitle: {
    fontSize: Theme.typography.sizes.body,
    color: Theme.colors.textSecondary,
    textAlign: 'right',
    lineHeight: 22,
  },
  optionsContainer: {
    gap: Theme.spacing.md,
  },
  optionCard: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Theme.colors.surface,
    padding: Theme.spacing.md,
    borderRadius: Theme.borderRadius.md,
    borderWidth: 1.5,
    borderColor: Theme.colors.border,
    ...Theme.shadows.card,
  },
  optionCardSelected: {
    borderColor: Theme.colors.primary,
    backgroundColor: Theme.colors.primarySoft,
  },
  optionText: {
    flex: 1,
    fontSize: Theme.typography.sizes.body,
    color: Theme.colors.textPrimary,
    textAlign: 'right',
    fontWeight: '500',
    lineHeight: 22,
    paddingLeft: Theme.spacing.sm,
  },
  optionTextSelected: {
    color: Theme.colors.primaryDark,
    fontWeight: '700',
  },
  radioCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: Theme.colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioCircleSelected: {
    borderColor: Theme.colors.primary,
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Theme.colors.primary,
  },
});
