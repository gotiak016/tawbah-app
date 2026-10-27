import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { Theme } from '../config/theme';

export const AuthScreen = () => {
  const { signInWithGoogle, isLoading } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Theme.colors.background} />

      <View style={styles.content}>
        {/* الشعار والرمزية الإسلامية الفاتحة */}
        <View style={styles.header}>
          <View style={styles.iconCircle}>
            <Text style={styles.arabicLogo}>توبة</Text>
          </View>
          <Text style={styles.title}>تَوْبَة</Text>
          <Text style={styles.subtitle}>رفيقك نحو العفة، الطهارة، والسكينة القلبية</Text>
        </View>

        {/* بطاقة الرسالة الإيمانية المريحة */}
        <View style={styles.verseCard}>
          <Text style={styles.verseText}>
            {'"إِنَّ اللَّهَ يُحِبُّ التَّوَّابِينَ وَيُحِبُّ الْمُتَطَهِّرِينَ"'}
          </Text>
          <Text style={styles.verseRef}>سورة البقرة - الآية 222</Text>
        </View>

        {/* ميزات التطبيق باختصار */}
        <View style={styles.featuresList}>
          <View style={styles.featureItem}>
            <Text style={styles.featureBullet}>🌱</Text>
            <Text style={styles.featureText}>تقرير تحليلي شخصي علمي وإيماني لحالتك</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureBullet}>🛡️</Text>
            <Text style={styles.featureText}>زر إغاثة فوري لكسر الرغبة الملحة عند الخلوة</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureBullet}>🕊️</Text>
            <Text style={styles.featureText}>تذكيرات قرآنية ونبوية مشجعة كل 5 ساعات</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureBullet}>🔒</Text>
            <Text style={styles.featureText}>خصوصية مطلقة ومشفرة بالكامل لا يطلع عليها أحد</Text>
          </View>
        </View>

        {/* قسم تسجيل الدخول بواسطة غوغل فقط */}
        <View style={styles.actionContainer}>
          <TouchableOpacity
            style={styles.googleButton}
            onPress={signInWithGoogle}
            disabled={isLoading}
            activeOpacity={0.85}
          >
            {isLoading ? (
              <ActivityIndicator color={Theme.colors.textPrimary} />
            ) : (
              <View style={styles.googleButtonContent}>
                <View style={styles.googleIconPlaceholder}>
                  <Text style={styles.googleG}>G</Text>
                </View>
                <Text style={styles.googleButtonText}>تسجيل الدخول بواسطة Google</Text>
              </View>
            )}
          </TouchableOpacity>

          <Text style={styles.disclaimerText}>
            بالتسجيل، أنت تبدأ عهداً صادقاً مع الله. بياناتك وتقدمك في أمان تام.
          </Text>
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
    justifyContent: 'space-between',
    paddingVertical: Theme.spacing.xl,
  },
  header: {
    alignItems: 'center',
    marginTop: Theme.spacing.md,
  },
  iconCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: Theme.colors.primarySoft,
    borderWidth: 2,
    borderColor: Theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Theme.spacing.md,
    ...Theme.shadows.card,
  },
  arabicLogo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: Theme.colors.primaryDark,
  },
  title: {
    fontSize: Theme.typography.sizes.display,
    fontWeight: 'bold',
    color: Theme.colors.primaryDark,
    letterSpacing: 1.5,
  },
  subtitle: {
    fontSize: Theme.typography.sizes.body,
    color: Theme.colors.textSecondary,
    textAlign: 'center',
    marginTop: Theme.spacing.xs,
    paddingHorizontal: Theme.spacing.md,
  },
  verseCard: {
    backgroundColor: Theme.colors.surface,
    padding: Theme.spacing.md,
    borderRadius: Theme.borderRadius.md,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    alignItems: 'center',
    ...Theme.shadows.card,
  },
  verseText: {
    fontSize: Theme.typography.sizes.bodyLg,
    fontWeight: '600',
    color: Theme.colors.primaryDark,
    textAlign: 'center',
    lineHeight: 26,
  },
  verseRef: {
    fontSize: Theme.typography.sizes.caption,
    color: Theme.colors.goldMuted,
    marginTop: Theme.spacing.xs,
  },
  featuresList: {
    backgroundColor: Theme.colors.surfaceSecondary,
    padding: Theme.spacing.md,
    borderRadius: Theme.borderRadius.md,
    gap: Theme.spacing.sm,
  },
  featureItem: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: Theme.spacing.sm,
  },
  featureBullet: {
    fontSize: 18,
  },
  featureText: {
    fontSize: Theme.typography.sizes.bodySm,
    color: Theme.colors.textPrimary,
    flex: 1,
    textAlign: 'right',
  },
  actionContainer: {
    alignItems: 'center',
    marginBottom: Theme.spacing.md,
  },
  googleButton: {
    width: '100%',
    backgroundColor: Theme.colors.surface,
    paddingVertical: Theme.spacing.md,
    borderRadius: Theme.borderRadius.pill,
    borderWidth: 1.5,
    borderColor: Theme.colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    ...Theme.shadows.button,
  },
  googleButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.sm,
  },
  googleIconPlaceholder: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#EA4335',
    justifyContent: 'center',
    alignItems: 'center',
  },
  googleG: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  googleButtonText: {
    fontSize: Theme.typography.sizes.bodyLg,
    fontWeight: '700',
    color: Theme.colors.textPrimary,
  },
  disclaimerText: {
    fontSize: Theme.typography.sizes.caption,
    color: Theme.colors.textMuted,
    textAlign: 'center',
    marginTop: Theme.spacing.sm,
    paddingHorizontal: Theme.spacing.sm,
  },
});
