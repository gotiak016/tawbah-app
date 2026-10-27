import AsyncStorage from '@react-native-async-storage/async-storage';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { DiagnosticReport } from './assessmentEngine';

export interface UserHabitProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  streakDays: number;
  longestStreak: number;
  startDate: string;
  lastRelapseDate: string | null;
  lastCheckInDate: string | null;
  panicAttacksCount: number;
  relapsesCount: number;
  assessmentReport: DiagnosticReport | null;
  savedMoneyEst: number; // تقدير للوقت والطاقة المسترجعة
  tasbeehCount: number;
}

const STORAGE_KEYS = {
  PROFILE: '@tawbah_user_profile',
  STREAK: '@tawbah_current_streak',
  LONGEST_STREAK: '@tawbah_longest_streak',
  ASSESSMENT: '@tawbah_diagnostic_report',
  LAST_CHECKIN: '@tawbah_last_checkin',
  TASBEEH: '@tawbah_tasbeeh_count',
};

export const StorageService = {
  /**
   * حفظ الملف الشخصي محلياً
   */
  async saveLocalProfile(profile: UserHabitProfile): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
    } catch (e) {
      console.error('Error saving local profile:', e);
    }
  },

  /**
   * جلب الملف الشخصي المحلي
   */
  async getLocalProfile(): Promise<UserHabitProfile | null> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.PROFILE);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.error('Error reading local profile:', e);
      return null;
    }
  },

  /**
   * حفظ التقرير التشخيصي
   */
  async saveDiagnosticReport(report: DiagnosticReport): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.ASSESSMENT, JSON.stringify(report));
    } catch (e) {
      console.error('Error saving assessment report:', e);
    }
  },

  /**
   * جلب التقرير التشخيصي
   */
  async getDiagnosticReport(): Promise<DiagnosticReport | null> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.ASSESSMENT);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.error('Error loading assessment report:', e);
      return null;
    }
  },

  /**
   * مزامنة البيانات مع Firestore
   */
  async syncToFirestore(profile: UserHabitProfile): Promise<void> {
    if (!profile.uid) return;
    try {
      const userRef = doc(db, 'users', profile.uid);
      await setDoc(userRef, {
        ...profile,
        updatedAt: new Date().toISOString(),
      }, { merge: true });
    } catch (e) {
      console.warn('Firestore sync skipped or offline, local data preserved:', e);
    }
  },

  /**
   * استرجاع البيانات من Firestore عند تسجيل الدخول
   */
  async fetchFromFirestore(uid: string): Promise<UserHabitProfile | null> {
    try {
      const userRef = doc(db, 'users', uid);
      const snapshot = await getDoc(userRef);
      if (snapshot.exists()) {
        const data = snapshot.data() as UserHabitProfile;
        await this.saveLocalProfile(data);
        return data;
      }
    } catch (e) {
      console.warn('Firestore fetch failed, relying on local storage:', e);
    }
    return null;
  },

  /**
   * زيادة عداد التسبيح والاستغفار
   */
  async incrementTasbeeh(): Promise<number> {
    try {
      const current = await AsyncStorage.getItem(STORAGE_KEYS.TASBEEH);
      const newCount = (current ? parseInt(current, 10) : 0) + 1;
      await AsyncStorage.setItem(STORAGE_KEYS.TASBEEH, newCount.toString());
      return newCount;
    } catch (e) {
      return 0;
    }
  },

  async getTasbeehCount(): Promise<number> {
    try {
      const current = await AsyncStorage.getItem(STORAGE_KEYS.TASBEEH);
      return current ? parseInt(current, 10) : 0;
    } catch (e) {
      return 0;
    }
  },
};
