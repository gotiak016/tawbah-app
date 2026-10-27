export interface QuestionOption {
  id: string;
  text: string;
  weight: number; // وزن الدرجة لتحديد شدة التعلق
  category?: string;
}

export interface AssessmentQuestion {
  id: string;
  title: string;
  subtitle?: string;
  category: 'frequency' | 'duration' | 'triggers' | 'timing' | 'habits' | 'spiritual';
  options: QuestionOption[];
}

export const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  {
    id: 'duration',
    title: 'منذ متى وأنت تعاني من هذه الممارسة؟',
    subtitle: 'الصدق مع نفسك هو أول عتبة نحو الشفاء الكامل.',
    category: 'duration',
    options: [
      { id: 'd1', text: 'أقل من سنة واحدة', weight: 1 },
      { id: 'd2', text: 'من 1 إلى 3 سنوات', weight: 2 },
      { id: 'd3', text: 'من 3 إلى 7 سنوات', weight: 3 },
      { id: 'd4', text: 'أكثر من 7 سنوات (عادة مزمنة)', weight: 4 },
    ],
  },
  {
    id: 'frequency',
    title: 'كم مرة تحدث الانتكاسة أسبوعياً تقريباً؟',
    subtitle: 'سنحدد مسار العلاج السلوكي بناءً على هذا المعدل.',
    category: 'frequency',
    options: [
      { id: 'f1', text: 'مرة كل أسبوعين أو شهر (أنتكاسات متباعدة)', weight: 1 },
      { id: 'f2', text: 'مرة إلى مرتين أسبوعياً', weight: 2 },
      { id: 'f3', text: '3 إلى 5 مرات أسبوعياً', weight: 3 },
      { id: 'f4', text: 'يومياً أو عدة مرات في اليوم الواحد', weight: 4 },
    ],
  },
  {
    id: 'timing',
    title: 'ما هي الأوقات التي تشعر فيها بأعلى درجات الضعف؟',
    subtitle: 'سنقوم بجدولة إشعارات وقائية مكثفة في هذه النافذة.',
    category: 'timing',
    options: [
      { id: 't1', text: 'الليل المتأخر وقبل النوم في الفراش بمفردي', weight: 4, category: 'night_bed' },
      { id: 't2', text: 'أوقات الفراغ الطويلة خلال النهار أو العطلة', weight: 3, category: 'free_time' },
      { id: 't3', text: 'أثناء التصفح العشوائي لوسائل التواصل', weight: 3, category: 'social_media' },
      { id: 't4', text: 'عند الاستيقاظ صباحاً في الفراش', weight: 2, category: 'morning' },
    ],
  },
  {
    id: 'triggers',
    title: 'ما هو الشعور النفسي الأبرز الذي يدفعك إليها؟',
    subtitle: 'الإباحية والعادة هي في الغالب محاولة للهروب من مشاعر سلبية.',
    category: 'triggers',
    options: [
      { id: 'tr1', text: 'الملل والفراغ وعدم وجود أهداف تشغلني', weight: 2, category: 'boredom' },
      { id: 'tr2', text: 'التوتر، ضغوط العمل أو الدراسة، والقلق', weight: 3, category: 'stress' },
      { id: 'tr3', text: 'الشعور بالوحدة، الحزن، أو الرفض العاطفي', weight: 3, category: 'loneliness' },
      { id: 'tr4', text: 'الإثارة البصرية المفاجئة على الإنترنت والمواقع', weight: 4, category: 'visual' },
    ],
  },
  {
    id: 'habits',
    title: 'هل تصطحب هاتفك إلى السرير أو الحمام؟',
    subtitle: 'بيئة الخلوة بالهاتف هي الحاضنة الكبرى للمحفزات.',
    category: 'habits',
    options: [
      { id: 'h1', text: 'أبداً، أترك الهاتف خارج غرفة النوم', weight: 1 },
      { id: 'h2', text: 'أحياناً في السرير فقط لتصفح الأخبار', weight: 2 },
      { id: 'h3', text: 'غالباً أصطحبه إلى الفراش ولا أنام بدونه', weight: 3 },
      { id: 'h4', text: 'دائماً في الفراش وأصطحبه أيضاً للحمام', weight: 4 },
    ],
  },
  {
    id: 'spiritual',
    title: 'كيف تصف حال صلاتك ووردك اليومي حالياً؟',
    subtitle: 'الصلاة هي أعظم درع واقٍ {إِنَّ الصَّلَاةَ تَنْهَىٰ عَنِ الْفَحْشَاءِ وَالْمُنكَرِ}.',
    category: 'spiritual',
    options: [
      { id: 's1', text: 'محافظ على الصلوات الخمس في أوقاتها مع الأذكار', weight: 1 },
      { id: 's2', text: 'أصلي ولكن أؤخر بعض الصلوات عن وقتها أحياناً', weight: 2 },
      { id: 's3', text: 'متذبذب، أنقطع أياماً وأعود أياماً', weight: 3 },
      { id: 's4', text: 'منقطع تماماً وأشعر ببعد شديد وقسوة في القلب', weight: 4 },
    ],
  },
];
