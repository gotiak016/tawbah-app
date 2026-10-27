import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Theme } from '../config/theme';

const CONTENT_SECTIONS = [
  {
    id: 'verses',
    title: '📖 آيات الأمل والرجاء',
    items: [
      {
        text: 'قُلْ يَا عِبَادِيَ الَّذِينَ أَسْرَفُوا عَلَىٰ أَنفُسِهِمْ لَا تَقْنَطُوا مِن رَّحْمَةِ اللَّهِ ۚ إِنَّ اللَّهَ يَغْفِرُ الذُّنُوبَ جَمِيعًا ۚ إِنَّهُ هُوَ الْغَفُورُ الرَّحِيمُ',
        source: 'سورة الزمر - الآية 53',
        reflection: 'نداء محبة من الله لكل من أثقلته المعاصي، الله يناديك باسم "عبادي" ويحرم عليك اليأس من مغفرته.',
      },
      {
        text: 'وَالَّذِينَ جَاهَدُوا فِينَا لَنَهْدِيَنَّهُمْ سُبُلَنَا ۚ وَإِنَّ اللَّهَ لَمَعَ الْمُحْسِنِينَ',
        source: 'سورة العنكبوت - الآية 69',
        reflection: 'كل لحظة تدفع فيها عنك الرغبة الحرام هي مجاهدة يراها الله وسيجازيك عليها بالهداية والطمأنينة.',
      },
      {
        text: 'إِنَّ الصَّلَاةَ تَنْهَىٰ عَنِ الْفَحْشَاءِ وَالْمُنكَرِ',
        source: 'سورة العنكبوت - الآية 45',
        reflection: 'أصلح صلاتك واخشع فيها؛ فكلما قويت صلتك بالله في صلاتك، ضعفت سلطة الشهوة على قلبك.',
      },
    ],
  },
  {
    id: 'hadiths',
    title: '🕊️ من هدي الحبيب ﷺ',
    items: [
      {
        text: 'قال رسول الله ﷺ: "إنك لن تدع شيئاً لله عز وجل إلا أبدلك الله به ما هو خير لك منه."',
        source: 'مسند الإمام أحمد',
        reflection: 'العفة ليست حرماناً، بل هي مقايضة ربانية: تترك لذة رخيصة عابرة لتنال لذة العفة وقوة البصيرة ورضا الله.',
      },
      {
        text: 'قال ﷺ: "التائب من الذنب كمن لا ذنب له."',
        source: 'سنن ابن ماجه',
        reflection: 'التوبة تمحو الماضي وتبيض الصحيفة. لا تدع الشيطان يقنعك أنك منافق أو ميؤوس منك.',
      },
      {
        text: 'قال ﷺ: "يا معشر الشباب من استطاع منكم الباءة فليتزوج فإنه أغض للبصر وأحصن للفرج، ومن لم يستطع فعليه بالصوم فإنه له وجاء."',
        source: 'صحيح البخاري ومسلم',
        reflection: 'الصوم هو قاهر الشهوة الأول لأنه يكسر شبع الجسد ويعيد الروحانية.',
      },
    ],
  },
  {
    id: 'wisdom',
    title: '🧠 نصائح وحقائق الشفاء النفسي',
    items: [
      {
        text: 'قاعدة الـ 90 يوماً وإعادة برمجة الدماغ',
        source: 'طب الأعصاب والتعافي السلوكي',
        reflection: 'المسارات العصبية للإباحية تضعف تماماً عند التوقف لمدة 90 يوماً؛ الدماغ قادر على تجديد خلاياه واستعادة النشاط.',
      },
      {
        text: 'الهاتف ليس صديق سريرك',
        source: 'وقاية سلوكية',
        reflection: '95% من الانتكاسات تحدث في السرير مع الهاتف ليلاً. اجعل هاتفك يشحن في غرفة أخرى واستبدله بكتاب أو مسبحة.',
      },
    ],
  },
];

export const IslamicContentScreen = () => {
  const [activeTab, setActiveTab] = useState<'verses' | 'hadiths' | 'wisdom'>('verses');

  const currentSection = CONTENT_SECTIONS.find((s) => s.id === activeTab) || CONTENT_SECTIONS[0];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Theme.colors.background} />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* الترويسة */}
        <View style={styles.header}>
          <Text style={styles.title}>واحة الإيمان والعفة 🌿</Text>
          <Text style={styles.subtitle}>زادك الروحي والعلمي لتثبيت قلبك في طريق النجاة</Text>
        </View>

        {/* أزرار التبويب */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'verses' && styles.tabButtonActive]}
            onPress={() => setActiveTab('verses')}
          >
            <Text style={[styles.tabButtonText, activeTab === 'verses' && styles.tabButtonTextActive]}>
              آيات الرجاء
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'hadiths' && styles.tabButtonActive]}
            onPress={() => setActiveTab('hadiths')}
          >
            <Text style={[styles.tabButtonText, activeTab === 'hadiths' && styles.tabButtonTextActive]}>
              أحاديث نبوية
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'wisdom' && styles.tabButtonActive]}
            onPress={() => setActiveTab('wisdom')}
          >
            <Text style={[styles.tabButtonText, activeTab === 'wisdom' && styles.tabButtonTextActive]}>
              حقائق التعافي
            </Text>
          </TouchableOpacity>
        </View>

        {/* قائمة البطاقات الإيمانية */}
        <View style={styles.cardsList}>
          {currentSection.items.map((item, idx) => (
            <View key={idx} style={styles.card}>
              <Text style={styles.cardMainText}>{item.text}</Text>
              <Text style={styles.cardSource}>{item.source}</Text>
              <View style={styles.reflectionBox}>
                <Text style={styles.reflectionTag}>💡 بصيرة وتأمل:</Text>
                <Text style={styles.reflectionText}>{item.reflection}</Text>
              </View>
            </View>
          ))}
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
  scrollContent: {
    paddingHorizontal: Theme.spacing.lg,
    paddingTop: Theme.spacing.md,
    paddingBottom: Theme.spacing.xxl,
  },
  header: {
    alignItems: 'center',
    marginBottom: Theme.spacing.md,
  },
  title: {
    fontSize: Theme.typography.sizes.title,
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
  tabsContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    gap: Theme.spacing.xs,
    marginBottom: Theme.spacing.lg,
  },
  tabButton: {
    backgroundColor: Theme.colors.surface,
    paddingVertical: Theme.spacing.xs,
    paddingHorizontal: Theme.spacing.md,
    borderRadius: Theme.borderRadius.pill,
    borderWidth: 1,
    borderColor: Theme.colors.border,
  },
  tabButtonActive: {
    backgroundColor: Theme.colors.primary,
    borderColor: Theme.colors.primary,
  },
  tabButtonText: {
    fontSize: Theme.typography.sizes.bodySm,
    color: Theme.colors.textSecondary,
    fontWeight: '600',
  },
  tabButtonTextActive: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  cardsList: {
    gap: Theme.spacing.md,
  },
  card: {
    backgroundColor: Theme.colors.surface,
    padding: Theme.spacing.md,
    borderRadius: Theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    ...Theme.shadows.card,
  },
  cardMainText: {
    fontSize: Theme.typography.sizes.bodyLg,
    fontWeight: 'bold',
    color: Theme.colors.primaryDark,
    textAlign: 'right',
    lineHeight: 28,
  },
  cardSource: {
    fontSize: Theme.typography.sizes.caption,
    color: Theme.colors.goldMuted,
    fontWeight: '600',
    textAlign: 'right',
    marginTop: Theme.spacing.xs,
    marginBottom: Theme.spacing.sm,
  },
  reflectionBox: {
    backgroundColor: Theme.colors.surfaceSecondary,
    padding: Theme.spacing.sm,
    borderRadius: Theme.borderRadius.sm,
    borderRightWidth: 3,
    borderRightColor: Theme.colors.primary,
  },
  reflectionTag: {
    fontSize: Theme.typography.sizes.caption,
    fontWeight: '700',
    color: Theme.colors.primaryDark,
    textAlign: 'right',
    marginBottom: 2,
  },
  reflectionText: {
    fontSize: Theme.typography.sizes.bodySm,
    color: Theme.colors.textSecondary,
    textAlign: 'right',
    lineHeight: 20,
  },
});
