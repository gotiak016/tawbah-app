import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { DiagnosticReport } from '../services/assessmentEngine';
import { Theme } from '../config/theme';

export const DiagnosticReportScreen: React.FC<{ route: any; navigation: any }> = ({
  route,
  navigation,
}) => {
  const report: DiagnosticReport = route.params?.report;

  const handleStartRecovery = () => {
    navigation.replace('MainTabs');
  };

  if (!report) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContainer}>
          <Text style={styles.loadingText}>جاري إعداد تقريرك الشخصي...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Theme.colors.background} />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* الترويسة الرئيسية */}
        <View style={styles.header}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>تقرير التشخيص والتعافي المخصص</Text>
          </View>
          <Text style={styles.title}>خارطة طريق نجاتك وطهارتك</Text>
          <Text style={styles.subtitle}>
            تم بناء هذا التقرير خصيصاً لحالتك وفق أحدث العلوم السلوكية والدلائل الإيمانية
          </Text>
        </View>

        {/* بطاقة مؤشر الشدة والدرجة الإجمالية */}
        <View style={styles.scoreCard}>
          <View style={styles.scoreRow}>
            <View style={styles.scoreCircle}>
              <Text style={styles.scoreNumber}>{report.overallScore}%</Text>
              <Text style={styles.scoreLabel}>درجة التعلق</Text>
            </View>
            <View style={styles.scoreDetails}>
              <Text style={styles.severityLevelTitle}>{report.severityLevel}</Text>
              <Text style={styles.dopamineReset}>
                ⏳ المدة المقدرة لترميم الدوبامين: {report.dopamineResetDays} يوماً
              </Text>
            </View>
          </View>
          <Text style={styles.severityDescription}>{report.severityDescription}</Text>
        </View>

        {/* بطاقة المحفزات ونافذة الخطر */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>🎯 تحليل نقاط الضعف والمحفزات</Text>
          <View style={styles.insightRow}>
            <Text style={styles.insightKey}>المحفز النفسي الأبرز:</Text>
            <Text style={styles.insightVal}>{report.primaryTrigger}</Text>
          </View>
          <View style={styles.insightRow}>
            <Text style={styles.insightKey}>نافذة الخطر القصوى:</Text>
            <Text style={styles.insightVal}>{report.dangerWindow}</Text>
          </View>
          <View style={styles.insightRow}>
            <Text style={styles.insightKey}>التشخيص الإيماني:</Text>
            <Text style={styles.insightVal}>{report.spiritualStatus}</Text>
          </View>
        </View>

        {/* مراحل خطة التعافي (90 يوماً) */}
        <View style={styles.sectionHeaderContainer}>
          <Text style={styles.sectionHeaderTitle}>خطة التعافي المتدرجة (90 يوماً)</Text>
          <Text style={styles.sectionHeaderSubtitle}>خطوات عملية مدروسة تنقلك من الضعف إلى تمام العفة</Text>
        </View>

        <View style={styles.phasesContainer}>
          {report.phases.map((phase) => (
            <View key={phase.phaseNumber} style={styles.phaseCard}>
              <View style={styles.phaseHeader}>
                <View style={styles.phaseNumberBadge}>
                  <Text style={styles.phaseNumberText}>{phase.phaseNumber}</Text>
                </View>
                <View style={styles.phaseTitleBox}>
                  <Text style={styles.phaseTitle}>{phase.title}</Text>
                  <Text style={styles.phaseDays}>{phase.daysRange}</Text>
                </View>
              </View>

              <View style={styles.phaseBody}>
                <View style={styles.phaseItem}>
                  <Text style={styles.phaseItemTag}>🎯 التركيز السلوكي:</Text>
                  <Text style={styles.phaseItemText}>{phase.focus}</Text>
                </View>
                <View style={styles.phaseItem}>
                  <Text style={styles.phaseItemTag}>🕌 الواجب الإيماني:</Text>
                  <Text style={styles.phaseItemText}>{phase.islamicAction}</Text>
                </View>
                <View style={styles.phaseItem}>
                  <Text style={styles.phaseItemTag}>🧠 الحقيقة العلمية:</Text>
                  <Text style={styles.phaseItemText}>{phase.scientificInsight}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* التوجيهات الفورية الملزمة */}
        <View style={styles.directivesCard}>
          <Text style={styles.directivesTitle}>⚡ بروتوكول الحماية الفوري (ابدأ اليوم)</Text>
          {report.immediateDirectives.map((directive, idx) => (
            <View key={idx} style={styles.directiveRow}>
              <Text style={styles.directiveBullet}>•</Text>
              <Text style={styles.directiveText}>{directive}</Text>
            </View>
          ))}
        </View>

        {/* بطاقة الدعاء الموصى به */}
        <View style={styles.duaCard}>
          <Text style={styles.duaTitle}>🤲 دعاؤك اليومي للثبات والنجاة</Text>
          <Text style={styles.duaText}>{report.recommendedDua}</Text>
        </View>

        {/* زر العهد والانطلاق */}
        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleStartRecovery}
          activeOpacity={0.85}
        >
          <Text style={styles.actionButtonText}>أعاهد الله وأبدأ رحلة التوبة الآن 🌿</Text>
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
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: Theme.typography.sizes.body,
    color: Theme.colors.textSecondary,
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
  badge: {
    backgroundColor: Theme.colors.primarySoft,
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.xs,
    borderRadius: Theme.borderRadius.pill,
    marginBottom: Theme.spacing.sm,
  },
  badgeText: {
    color: Theme.colors.primaryDark,
    fontSize: Theme.typography.sizes.caption,
    fontWeight: '700',
  },
  title: {
    fontSize: Theme.typography.sizes.title,
    fontWeight: 'bold',
    color: Theme.colors.primaryDark,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: Theme.typography.sizes.bodySm,
    color: Theme.colors.textSecondary,
    textAlign: 'center',
    marginTop: Theme.spacing.xs,
    lineHeight: 20,
  },
  scoreCard: {
    backgroundColor: Theme.colors.surface,
    padding: Theme.spacing.md,
    borderRadius: Theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    marginBottom: Theme.spacing.md,
    ...Theme.shadows.card,
  },
  scoreRow: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: Theme.spacing.md,
    marginBottom: Theme.spacing.md,
  },
  scoreCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Theme.colors.primarySoft,
    borderWidth: 3,
    borderColor: Theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreNumber: {
    fontSize: Theme.typography.sizes.title,
    fontWeight: 'bold',
    color: Theme.colors.primaryDark,
  },
  scoreLabel: {
    fontSize: 10,
    color: Theme.colors.textSecondary,
  },
  scoreDetails: {
    flex: 1,
  },
  severityLevelTitle: {
    fontSize: Theme.typography.sizes.bodyLg,
    fontWeight: 'bold',
    color: Theme.colors.textPrimary,
    textAlign: 'right',
  },
  dopamineReset: {
    fontSize: Theme.typography.sizes.bodySm,
    color: Theme.colors.goldMuted,
    fontWeight: '600',
    marginTop: Theme.spacing.xs,
    textAlign: 'right',
  },
  severityDescription: {
    fontSize: Theme.typography.sizes.bodySm,
    color: Theme.colors.textSecondary,
    textAlign: 'right',
    lineHeight: 22,
    borderTopWidth: 1,
    borderTopColor: Theme.colors.surfaceMuted,
    paddingTop: Theme.spacing.sm,
  },
  sectionCard: {
    backgroundColor: Theme.colors.surface,
    padding: Theme.spacing.md,
    borderRadius: Theme.borderRadius.md,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    marginBottom: Theme.spacing.lg,
    ...Theme.shadows.card,
  },
  sectionTitle: {
    fontSize: Theme.typography.sizes.bodyLg,
    fontWeight: '700',
    color: Theme.colors.primaryDark,
    textAlign: 'right',
    marginBottom: Theme.spacing.sm,
  },
  insightRow: {
    marginBottom: Theme.spacing.sm,
  },
  insightKey: {
    fontSize: Theme.typography.sizes.bodySm,
    fontWeight: '700',
    color: Theme.colors.textSecondary,
    textAlign: 'right',
  },
  insightVal: {
    fontSize: Theme.typography.sizes.bodySm,
    color: Theme.colors.textPrimary,
    textAlign: 'right',
    marginTop: 2,
    lineHeight: 20,
  },
  sectionHeaderContainer: {
    marginBottom: Theme.spacing.md,
  },
  sectionHeaderTitle: {
    fontSize: Theme.typography.sizes.titleSm,
    fontWeight: 'bold',
    color: Theme.colors.textPrimary,
    textAlign: 'right',
  },
  sectionHeaderSubtitle: {
    fontSize: Theme.typography.sizes.caption,
    color: Theme.colors.textSecondary,
    textAlign: 'right',
    marginTop: 2,
  },
  phasesContainer: {
    gap: Theme.spacing.md,
    marginBottom: Theme.spacing.lg,
  },
  phaseCard: {
    backgroundColor: Theme.colors.surface,
    borderRadius: Theme.borderRadius.md,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    padding: Theme.spacing.md,
    ...Theme.shadows.card,
  },
  phaseHeader: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: Theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.surfaceMuted,
    paddingBottom: Theme.spacing.xs,
    marginBottom: Theme.spacing.sm,
  },
  phaseNumberBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  phaseNumberText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  phaseTitleBox: {
    flex: 1,
  },
  phaseTitle: {
    fontSize: Theme.typography.sizes.body,
    fontWeight: 'bold',
    color: Theme.colors.textPrimary,
    textAlign: 'right',
  },
  phaseDays: {
    fontSize: Theme.typography.sizes.caption,
    color: Theme.colors.goldMuted,
    fontWeight: '600',
    textAlign: 'right',
  },
  phaseBody: {
    gap: Theme.spacing.xs,
  },
  phaseItem: {
    marginBottom: Theme.spacing.xs,
  },
  phaseItemTag: {
    fontSize: Theme.typography.sizes.caption,
    fontWeight: '700',
    color: Theme.colors.primaryDark,
    textAlign: 'right',
  },
  phaseItemText: {
    fontSize: Theme.typography.sizes.bodySm,
    color: Theme.colors.textSecondary,
    textAlign: 'right',
    lineHeight: 20,
    marginTop: 2,
  },
  directivesCard: {
    backgroundColor: Theme.colors.warningSoft,
    padding: Theme.spacing.md,
    borderRadius: Theme.borderRadius.md,
    borderWidth: 1,
    borderColor: '#FDE68A',
    marginBottom: Theme.spacing.md,
  },
  directivesTitle: {
    fontSize: Theme.typography.sizes.body,
    fontWeight: 'bold',
    color: '#92400E',
    textAlign: 'right',
    marginBottom: Theme.spacing.sm,
  },
  directiveRow: {
    flexDirection: 'row-reverse',
    alignItems: 'flex-start',
    marginBottom: Theme.spacing.xs,
    gap: Theme.spacing.xs,
  },
  directiveBullet: {
    fontSize: 16,
    color: '#92400E',
    fontWeight: 'bold',
  },
  directiveText: {
    flex: 1,
    fontSize: Theme.typography.sizes.bodySm,
    color: '#78350F',
    textAlign: 'right',
    lineHeight: 20,
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
  actionButton: {
    backgroundColor: Theme.colors.primary,
    paddingVertical: Theme.spacing.md,
    borderRadius: Theme.borderRadius.pill,
    alignItems: 'center',
    ...Theme.shadows.button,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: Theme.typography.sizes.bodyLg,
    fontWeight: 'bold',
  },
});
