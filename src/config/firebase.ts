import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

/**
 * إعدادات Firebase الحقيقية لمشروع "توبة" المستخرجة مباشرة من google-services.json
 */
export const FIREBASE_CONFIG = {
  apiKey: "AIzaSyBbBRDh_vC4h04YkKTjPZv245hTaEibJkE",
  authDomain: "tawbah-7e9b7.firebaseapp.com",
  projectId: "tawbah-7e9b7",
  storageBucket: "tawbah-7e9b7.firebasestorage.app",
  messagingSenderId: "679536317602",
  appId: "1:679536317602:android:6dc2b616b9d9fb26a0f3fb",
};

/**
 * Web Client ID الخاص بـ Google Sign-In لمشروع tawbah-7e9b7:
 * (الرقم التعريفي يبدأ بـ 679536317602)
 */
export const GOOGLE_WEB_CLIENT_ID = process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID || "679536317602-sh6gta3ca6mit7tskkr6ciatk4cge5r9.apps.googleusercontent.com";

// تهيئة تطبيق Firebase بشكل موحد يمنع التكرار
export const app = getApps().length === 0 ? initializeApp(FIREBASE_CONFIG) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);
export { GoogleAuthProvider, signInWithCredential };
