export const Theme = {
  colors: {
    // الخلفيات الفاتحة المريحة
    background: '#FAF8F5',       // بيج كريمي هادئ ومريح للعين
    surface: '#FFFFFF',          // أبيض ناصع للبطاقات
    surfaceSecondary: '#F4EFEA', // خلفيات العناصر الداخلية
    surfaceMuted: '#ECE5DC',     // فواصل وتحديدات ناعمة

    // الألوان الإسلامية الأساسية
    primary: '#2E6B56',          // أخضر مريمي وقور يبعث الطمأنينة
    primaryDark: '#1B4536',      // أخضر داكن للعناوين الرئيسية
    primaryLight: '#438A71',     // أخضر فاتح للحالات النشطة
    primarySoft: '#E8F2ED',      // خلفية خفيفة للأيقونات والوسوم

    // لمسات الوقار والتميز (ذهبي ورملي)
    gold: '#C59B27',             // ذهبي دافئ للأوسمة والإنجازات
    goldLight: '#FBF4DE',        // خلفية ذهبية ناعمة
    goldMuted: '#997415',

    // ألوان الحالة والإنذار (بشكل هادئ غير منفّر)
    danger: '#B94A48',           // أحمر هادئ لزر الطوارئ والانتكاسة
    dangerSoft: '#FDF0EF',       // خلفية ناعمة للتنبيه
    warning: '#D97706',          // برتقالي تحذيري للمحفزات
    warningSoft: '#FEF3C7',
    info: '#2563EB',             // أزرق للتذكيرات
    infoSoft: '#EFF6FF',

    // ألوان النصوص (عالية الوضوح ومريحة)
    textPrimary: '#1D2A22',      // كحلي زيتي داكن مريح جداً للقراءة
    textSecondary: '#57675D',    // رمادي زيتي للنصوص الفرعية
    textMuted: '#8C9B92',        // نصوص خافتة وملاحظات
    textOnPrimary: '#FFFFFF',    // نص أبيض فوق الأزرار
    border: '#E8E2D8',           // حدود ناعمة وأنيقة
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    xs: 6,
    sm: 10,
    md: 16,
    lg: 24,
    pill: 9999,
  },
  typography: {
    fontFamily: {
      regular: 'System',
      medium: 'System',
      bold: 'System',
    },
    sizes: {
      caption: 12,
      bodySm: 13,
      body: 15,
      bodyLg: 17,
      titleSm: 19,
      title: 22,
      headline: 28,
      display: 38,
      counter: 64,
    },
  },
  shadows: {
    card: {
      shadowColor: '#2E6B56',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.06,
      shadowRadius: 12,
      elevation: 3,
    },
    button: {
      shadowColor: '#2E6B56',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.18,
      shadowRadius: 10,
      elevation: 5,
    },
    glowGold: {
      shadowColor: '#C59B27',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.25,
      shadowRadius: 12,
      elevation: 6,
    },
  },
};
