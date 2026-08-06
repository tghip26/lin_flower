import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut as firebaseSignOut } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyDummyKeyForLinFlowerBoutique2026",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "lin-flower-quevo.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "lin-flower-quevo",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "lin-flower-quevo.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "103982849102",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:103982849102:web:a894bc8192"
};

// Initialize Firebase App instance
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogleFirebase = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    return {
      name: user.displayName || user.email?.split('@')[0] || 'Khách Hàng Google',
      email: user.email || '',
      avatar: user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || 'User')}&background=ea4335&color=fff`,
      uid: user.uid
    };
  } catch (error: any) {
    console.error("Firebase Google Auth Error:", error);
    throw error;
  }
};

export const logoutFirebase = async () => {
  try {
    await firebaseSignOut(auth);
  } catch (e) {}
};
