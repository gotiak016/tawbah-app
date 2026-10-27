import { QuestionOption } from '../data/assessmentQuestions';

export interface RecoveryPhase {
  phaseNumber: number;
  title: string;
  daysRange: string;
  focus: string;
  islamicAction: string;
  scientificInsight: string;
}

export interface DiagnosticReport {
  overallScore: number; // 0 - 100%
  severityLevel: 'خفيف (تعلق أولي)' | 'متوسط (إدمان سلوكي)' | 'عميق (إدمان مزمن مع استنزاف عصبي)';
  severityDescription: string;
  primaryTrigger: string;
  dangerWindow: string;
  spiritualStatus: string;
  dopamineResetDays: number;
  phases: RecoveryPhase[];
  immediateDirectives: string[];
  recommendedDua: string;
}

export const AssessmentEngine = {
  generateReport(selectedAnswers: Record<string, QuestionOption>): DiagnosticReport {
    let totalWeight = 0;
    const maxPossibleWeight = 24; // 6 أسئلة * 4 أقصى وزن

    Object.values(selectedAnswers).forEach((option) => {
      totalWeight += option.weight;
    });

    const overallScore = Math.min(100, Math.round((totalWeight / maxPossibleWeight) * 100));

    // تحديد درجة الشدة
    let severityLevel: DiagnosticReport['severityLevel'] = 'خفيف (تعلق أولي)';
    let severityDescription = '';
    let dopamineResetDays = 30;

    if (overallScore >= 75) {
      severityLevel = 'عميق (إدمان مزمن مع استنزاف عصبي)';
      severityDescription = 'الممارسة أصبحت آلية هروب تلقائية متجذرة في مسارات الدماغ العصبية، مع استنزاف لمستقبلات الدوبامين وفقدان للمتعة بالحياة اليومية، وضعف في التركيز وقسوة في القلب.';
      dopamineResetDays = 90;
    } else if (overallScore >= 45) {
      severityLevel = 'متوسط (إدمان سلوكي)';
      severityDescription = 'هناك رابط شرطي واضح بين مشاعر التوتر أو الفراغ وبين اللجوء إلى الهاتف والممارسة، ولكن الجهاز العصبي لا يزال يمتلك مرونة عالية للتعافي السريع بمجرد قطع المحفزات.';
      dopamineResetDays = 60;
    } else {
      severityLevel = 'خفيف (تعلق أولي)';
      severityDescription = 'الممارسة تحدث بشكل متفرق ومرتبطة بزلات وضعف لحظي. فرصتك هائلة في الحسم المبكر قبل أن تتحول إلى مسار عصبي معقد.';
      dopamineResetDays = 30;
    }

    // استخراج المحفز الأساسي
    const triggerOption = selectedAnswers['triggers'];
    let primaryTrigger = 'الملل والفراغ الذهني';
    if (triggerOption?.category === 'stress') primaryTrigger = 'الهروب من التوتر وضغوط الحياة';
    else if (triggerOption?.category === 'loneliness') primaryTrigger = 'الشعور بالوحدة والحاجة لملء فراغ عاطفي';
    else if (triggerOption?.category === 'visual') primaryTrigger = 'الإثارة البصرية المفاجئة من السوشيال ميديا';

    // توقيت الخطر الأكبر
    const timingOption = selectedAnswers['timing'];
    let dangerWindow = 'الليل المتأخر بمفردك في الفراش';
    if (timingOption?.category === 'free_time') dangerWindow = 'عطلات نهاية الأسبوع وساعات الفراغ غير المخططة';
    else if (timingOption?.category === 'social_media') dangerWindow = 'أثناء استخدام الهاتف دون هدف محدد';
    else if (timingOption?.category === 'morning') dangerWindow = 'الاستلقاء في السرير بعد الاستيقاظ مباشرة';

    // الحالة الروحية
    const spiritualOption = selectedAnswers['spiritual'];
    let spiritualStatus = 'تحتاج إلى إعادة إحياء صلة الوصل اليومية مع الله، فالصلاة في وقتها هي خط الدفاع الأول.';
    if (spiritualOption?.id === 's1') {
      spiritualStatus = 'لديك أساس إيماني صلب ومحافظة على الصلاة؛ وهذا أعظم سلاح سيعجل بنجاتك بمشيئة الله.';
    }

    // خارطة طريق التعافي المقترحة (4 مراحل)
    const phases: RecoveryPhase[] = [
      {
        phaseNumber: 1,
        title: 'كسر الدورة والانسحاب الحاد',
        daysRange: 'اليوم 1 إلى 7',
        focus: 'عزل الهاتف عن غرفة النوم، وقطع جميع الحسابات والمواقع المثيرة فوراً.',
        islamicAction: 'تجديد التوبة بركعتين، والمحافظة الصارمة على أذكار الصباح والمساء، والنوم على طهارة ووضوء.',
        scientificInsight: 'في هذه الأيام الأولى يصرخ الدماغ طلباً للدوبامين السريع. كل رغبة ملحة تقاومها تستمر من 10 إلى 15 دقيقة ثم تخبو.',
      },
      {
        phaseNumber: 2,
        title: 'الفتور وإعادة معايرة المستقبلات (Flatline)',
        daysRange: 'اليوم 8 إلى 21',
        focus: 'ملء الفراغ بالرياضة والحركة والأنشطة البدنية لمنع التفكير السلبي.',
        islamicAction: 'حضور مجالس خير أو الالتزام بورد قرآني ثابت يومياً لا يقل عن حزبين.',
        scientificInsight: 'تبدأ مستقبلات الدوبامين المنهكة بالترميم. قد تشعر ببعض الكسل أو تقلب المزاج المؤقت؛ هذا دليل على أن دماغك يتعافى!',
      },
      {
        phaseNumber: 3,
        title: 'بناء العادات واسترداد الحيوية',
        daysRange: 'اليوم 22 إلى 60',
        focus: 'ملاحظة صفاء الذهن، وعودة النشاط الجسدي، وتلاشي الضباب الفكري.',
        islamicAction: 'قيام الليل ولو بركعتين، والمحافظة على صلاة الفجر في المسجد جماعة.',
        scientificInsight: 'المسارات العصبية القديمة للإدمان تبدأ بالضمور التدريجي نتيجة عدم الاستخدام، ومسارات السيطرة على النفس تقوى.',
      },
      {
        phaseNumber: 4,
        title: 'الثبات، النقاء، والتحرر المستدام',
        daysRange: 'اليوم 61 إلى 90+',
        focus: 'التحول من مجرد "مقاومة المعصية" إلى التلذذ بالحياة النقية والعفة.',
        islamicAction: 'شكر الله تعالى على نعمة الهداية والستر، ومساعدة الآخرين وتثبيتهم.',
        scientificInsight: 'إعادة ضبط كاملة للدوبامين الحقيقي (Dopamine Baseline) والاستمتاع بالنعم البسيطة والمشاعر الصادقة.',
      },
    ];

    // توجيهات فورية ملزمة
    const immediateDirectives: string[] = [
      'قاعدة السرير المحرَّم: يمنع منعاً باتاً دخول الهاتف إلى غرفة النوم أو الشحن بجوار السرير.',
      'تطبيق قاعدة الـ 15 دقيقة: إذا هاجمتك الرغبة، غادر المكان فوراً، توضأ بالماء البارد، وتحدث مع شخص أو اخرج للمشي.',
      'تفعيل التذكير كل 5 ساعات في تطبيق توبة حتى يبقى قلبك متصلاً بالله طوال اليوم.',
      'الاستعاذة الفورية بصوت مسموع: "أعوذ بالله السميع العليم من الشيطان الرجيم".',
    ];

    const recommendedDua = 'اللهم طهر قلبي، وحصّن فرجي، واغفر ذنبي، واكفني بحلالك عن حرامك، وبطاعتك عن معصيتك، وبفضلك عمن سواك.';

    return {
      overallScore,
      severityLevel,
      severityDescription,
      primaryTrigger,
      dangerWindow,
      spiritualStatus,
      dopamineResetDays,
      phases,
      immediateDirectives,
      recommendedDua,
    };
  },
};
