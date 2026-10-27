import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { StorageService, UserHabitProfile } from '../services/storageService';
import { DiagnosticReport } from '../services/assessmentEngine';

interface HabitContextType {
  streak: number;
  longestStreak: number;
  report: DiagnosticReport | null;
  panicCount: number;
  tasbeehCount: number;
  recordRelapse: (notes?: string) => Promise<void>;
  recordPanicUrge: () => Promise<void>;
  saveAssessmentReport: (rep: DiagnosticReport) => Promise<void>;
  incrementTasbeeh: () => Promise<void>;
}

const HabitContext = createContext<HabitContextType>({} as HabitContextType);

export const HabitProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, userProfile, refreshProfile } = useAuth();
  const [streak, setStreak] = useState<number>(userProfile?.streakDays || 0);
  const [longestStreak, setLongestStreak] = useState<number>(userProfile?.longestStreak || 0);
  const [report, setReport] = useState<DiagnosticReport | null>(userProfile?.assessmentReport || null);
  const [panicCount, setPanicCount] = useState<number>(userProfile?.panicAttacksCount || 0);
  const [tasbeehCount, setTasbeehCount] = useState<number>(0);

  // تحديث القيم عند تغير الملف الشخصي
  useEffect(() => {
    if (userProfile) {
      setStreak(userProfile.streakDays);
      setLongestStreak(userProfile.longestStreak);
      setReport(userProfile.assessmentReport);
      setPanicCount(userProfile.panicAttacksCount);
    }
    StorageService.getTasbeehCount().then(setTasbeehCount);
  }, [userProfile]);

  /**
   * تسجيل انتكاسة وزلة - إعادة ضبط العداد مع التوبة النصوح
   */
  const recordRelapse = async (notes?: string) => {
    if (!userProfile) return;

    const updatedProfile: UserHabitProfile = {
      ...userProfile,
      streakDays: 0,
      lastRelapseDate: new Date().toISOString(),
      relapsesCount: userProfile.relapsesCount + 1,
    };

    setStreak(0);
    await StorageService.saveLocalProfile(updatedProfile);
    await StorageService.syncToFirestore(updatedProfile);
    await refreshProfile();
  };

  /**
   * تسجيل نوبة رغبة ملحة تم التغلب عليها (انتصار!)
   */
  const recordPanicUrge = async () => {
    if (!userProfile) return;

    const newPanic = panicCount + 1;
    setPanicCount(newPanic);

    const updatedProfile: UserHabitProfile = {
      ...userProfile,
      panicAttacksCount: newPanic,
    };

    await StorageService.saveLocalProfile(updatedProfile);
    await StorageService.syncToFirestore(updatedProfile);
    await refreshProfile();
  };

  /**
   * حفظ التقرير التشخيصي الأولي
   */
  const saveAssessmentReport = async (rep: DiagnosticReport) => {
    setReport(rep);
    await StorageService.saveDiagnosticReport(rep);

    if (userProfile) {
      const updatedProfile: UserHabitProfile = {
        ...userProfile,
        assessmentReport: rep,
      };
      await StorageService.saveLocalProfile(updatedProfile);
      await StorageService.syncToFirestore(updatedProfile);
      await refreshProfile();
    }
  };

  /**
   * التسبيح
   */
  const incrementTasbeeh = async () => {
    const count = await StorageService.incrementTasbeeh();
    setTasbeehCount(count);
  };

  return (
    <HabitContext.Provider
      value={{
        streak,
        longestStreak,
        report,
        panicCount,
        tasbeehCount,
        recordRelapse,
        recordPanicUrge,
        saveAssessmentReport,
        incrementTasbeeh,
      }}
    >
      {children}
    </HabitContext.Provider>
  );
};

export const useHabit = () => useContext(HabitContext);
