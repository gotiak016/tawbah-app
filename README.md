# تطبيق "توبة" (Tawbah) 🌿
### رفيق التعافي، العفة، والثبات على التوبة النصوح
**اسم الحزمة (Package Name):** `com.tawbah.app`

---

## 🌟 مميزات التطبيق الأساسية
1. **تسجيل الدخول الحصري بواسطة Google (Google Sign-In Only)**: أمان، موثوقية، وحفظ دائم لبيانات وعدادات المستخدم السحابية دون تعقيد.
2. **التقرير التحليلي الشخصي الشامل للمستخدمين الجدد**: استبيان علمي إيماني مكون من 6 أبعاد لتشخيص شدة الإدمان، المحفزات الأساسية، نافذة الخطر الزمنية، وخارطة طريق مخصصة لترميم الدوبامين خلال 90 يوماً على 4 مراحل.
3. **تذكيرات الثبات الدورية كل 5 ساعات**: إشعارات قرآنية وأحاديث نبوية وأدعية تدفع للثبات وتصرف وسوسة الشيطان، مجدولة دورياً عبر قنوات أندرويد الرسمية.
4. **زر الاستغاثة والثبات الفوري (🚨 أغثني يا الله)**: وضع الطوارئ عند هجوم الرغبة الملحة أو الخلوة بالهاتف، يتضمن مؤقت 15 دقيقة لكسر موجة الدوبامين، بروتوكول الخطوات الأربع (مغادرة المكان، الوضوء البارد، الاستعاذة، صلاة ركعتين)، وأدعية مأثورة مع تسجيل نقاط النصر.
5. **المسبحة الإلكترونية ومحراب الاستغفار**: عداد تفاعلي بأذكار مخصصة لطرد وساوس النفس وقسوة القلب مع اهتزاز لمسي هادئ.
6. **واجهة إسلامية حديثة، مريحة، وفاتحة**: تصميم نقي يدمج درجات الأخضر المريمي الوقور (#2E6B56) مع البيج الكريمي الفاتح المريح للعين واللمسات الذهبية الرقيقة.

---

## 🔑 خطوات إعداد المفاتيح الحقيقية (Firebase & Google Sign-In)

حتى لا يكون أي شيء وهمياً ويعمل تسجيل الدخول على متجر Google Play مباشرة:

### الخطوة 1: إنشاء مشروع في Firebase Console
1. ادخل على [Firebase Console](https://console.firebase.google.com).
2. اضغط **Add Project** وسمّه `Tawbah App`.
3. اضغط على أيقونة **Android** لإضافة تطبيق جديد:
   - **Android package name:** `com.tawbah.app`
   - **App nickname:** توبة
   - **Debug signing certificate SHA-1:** أضف بصمة الـ SHA-1 الخاصة بحاسوبك أو مفتاح التوقيع.
4. حمّل ملف `google-services.json` وضعه مباشرة داخل مجلد المشروع:
   `c:\Users\GOTIAK\Desktop\rea\tawbah-app\google-services.json`

### الخطوة 2: تفعيل تسجيل الدخول بواسطة Google
1. في Firebase Console، اذهب إلى **Authentication** -> **Sign-in method**.
2. فعّل خيار **Google**.
3. تحت **Web SDK configuration**، انسخ الـ **Web Client ID**.
4. افتح الملف:
   `src/config/firebase.ts`
   وضع الـ Web Client ID في المتغير:
   ```typescript
   export const GOOGLE_WEB_CLIENT_ID = "YOUR_COPIED_CLIENT_ID.apps.googleusercontent.com";
   ```
5. الصق مفاتيح المشروع (apiKey, projectId, appId...) في نفس الملف داخل الكائن `FIREBASE_CONFIG`.

### الخطوة 3: تفعيل قاعدة بيانات Firestore
1. في Firebase Console، اذهب إلى **Firestore Database** واضغط **Create Database**.
2. اختر وضع الإنتاج أو الاختبار (Start in test mode).

---

## 🚀 تشغيل التطبيق وتوليد ملف APK

من داخل مجلد `tawbah-app`:

```bash
# تثبيت الحزم
npm install

# تشغيل بيئة التطوير
npm run start

# تشغيل على محاكي أو جهاز أندرويد متصل
npm run android

# بناء ملف APK أو AAB لمتجر Google Play عبر EAS Build
npx eas-cli build --platform android --profile production
```
