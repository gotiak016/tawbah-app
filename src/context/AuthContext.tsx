import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged, signOut as fbSignOut } from 'firebase/auth';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { auth, GoogleAuthProvider, signInWithCredential, GOOGLE_WEB_CLIENT_ID } from '../config/firebase';
import { StorageService, UserHabitProfile } from '../services/storageService';
import { Alert } from 'react-native';

interface AuthContextType {
  user: User | null;
  userProfile: UserHabitProfile | null;
  isLoading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserHabitProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // إعداد حزمة Google Sign-In بمفتاح الويب الحقيقي
  useEffect(() => {
    try {
      GoogleSignin.configure({
        webClientId: GOOGLE_WEB_CLIENT_ID,
        offlineAccess: true,
        scopes: ['profile', 'email'],
      });
    } catch (e) {
      console.warn('GoogleSignin configure notice:', e);
    }
  }, []);

  // الاستماع لحالة المصادقة من Firebase
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser: any) => {
      setUser(currentUser);
      if (currentUser) {
        // جلب البيانات من Firestore أولاً ثم التخزين المحلي
        let profile = await StorageService.fetchFromFirestore(currentUser.uid);
        if (!profile) {
          profile = await StorageService.getLocalProfile();
        }

        // إذا كان مستخدماً جديداً، إنشاء ملف أولي
        if (!profile) {
          profile = {
            uid: currentUser.uid,
            email: currentUser.email,
            displayName: currentUser.displayName || 'تائب إلى الله',
            photoURL: currentUser.photoURL,
            streakDays: 0,
            longestStreak: 0,
            startDate: new Date().toISOString(),
            lastRelapseDate: null,
            lastCheckInDate: null,
            panicAttacksCount: 0,
            relapsesCount: 0,
            assessmentReport: null,
            savedMoneyEst: 0,
            tasbeehCount: 0,
          };
          await StorageService.saveLocalProfile(profile);
          await StorageService.syncToFirestore(profile);
        }
        setUserProfile(profile);
      } else {
        setUserProfile(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  /**
   * تسجيل الدخول الحقيقي بواسطة حساب Google
   */
  const signInWithGoogle = async () => {
    try {
      setIsLoading(true);

      // التحقق من أن المطور وضع الـ Web Client ID الحقيقي
      if (GOOGLE_WEB_CLIENT_ID.includes('YOUR_GOOGLE_WEB_CLIENT_ID')) {
        Alert.alert(
          'تنبيه إعدادات Google',
          'يرجى وضع Web Client ID الحقيقي الخاص بك في ملف src/config/firebase.ts للمتابعة مع Google Console.',
          [{ text: 'حسناً' }]
        );
        setIsLoading(false);
        return;
      }

      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const signInResult = await GoogleSignin.signIn();

      // استخراج الـ ID Token من تسجيل الدخول
      const idToken = signInResult.data?.idToken;
      if (!idToken) {
        throw new Error('لم يتم استلام ID Token من Google');
      }

      // بناء اعتماد Firebase وتسجيل الدخول
      const credential = GoogleAuthProvider.credential(idToken);
      await signInWithCredential(auth, credential);
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // قام المستخدم بإلغاء العملية
      } else if (error.code === statusCodes.IN_PROGRESS) {
        Alert.alert('تنبيه', 'عملية تسجيل الدخول جارية بالفعل');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('خطأ', 'خدمات Google Play غير متوفرة أو تحتاج لتحديث');
      } else {
        Alert.alert('فشل تسجيل الدخول', error.message || 'حدث خطأ أثناء الاتصال بحساب Google');
      }
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * تسجيل الخروج
   */
  const signOut = async () => {
    try {
      setIsLoading(true);
      await GoogleSignin.signOut().catch(() => {});
      await fbSignOut(auth);
      setUser(null);
      setUserProfile(null);
    } catch (e: any) {
      Alert.alert('خطأ', e.message);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshProfile = async () => {
    if (user) {
      const p = await StorageService.getLocalProfile();
      setUserProfile(p);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userProfile,
        isLoading,
        signInWithGoogle,
        signOut,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
