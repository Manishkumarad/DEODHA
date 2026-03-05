// src/services/firebase.ts - Expo compatible version
import { auth, db } from '../config/firebase';
import { 
  signInWithPhoneNumber,
  RecaptchaVerifier,
  PhoneAuthProvider,
  signInWithCredential
} from 'firebase/auth';
import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  addDoc,
  serverTimestamp,
  onSnapshot,
  query,
  where,
  getDocs
} from 'firebase/firestore';

// ── OTP: Send ────────────────────────────────────────────────
export async function sendOTP(phoneNumber: string): Promise<any> {
  try {
    // For Expo, we'll use a mock confirmation for demo
    // In production, you'd implement proper phone auth
    console.log('Sending OTP to:', phoneNumber);
    return { 
      success: true, 
      confirmation: { 
        verificationId: 'demo-verification-id',
        verify: () => Promise.resolve({ user: { uid: 'demo-uid' } })
      } 
    };
  } catch (error: any) {
    console.error('OTP Send Error:', error);
    return { success: false, error: error.message };
  }
}

// ── OTP: Verify ──────────────────────────────────────────────
export async function verifyOTP(
  confirmation: any,
  code: string
): Promise<any> {
  try {
    // For demo purposes, accept any 6-digit code
    if (code.length === 6) {
      return { 
        success: true, 
        user: { 
          uid: 'demo-user-' + Date.now(),
          phoneNumber: '+919876543210'
        } 
      };
    }
    return { success: false, error: 'Invalid OTP. Please try again.' };
  } catch (error: any) {
    return { success: false, error: 'Invalid OTP. Please try again.' };
  }
}

// ── Auth State ───────────────────────────────────────────────
export function onAuthStateChanged(callback: (user: any) => void) {
  return auth.onAuthStateChanged(callback);
}

export function getCurrentUser() {
  return auth.currentUser;
}

export async function signOut() {
  await auth.signOut();
}

// ── Firestore Helpers ─────────────────────────────────────────
export async function saveUserProfile(uid: string, data: object) {
  await setDoc(doc(db, 'users', uid), data, { merge: true });
}

export async function getUserProfile(uid: string) {
  const docSnap = await getDoc(doc(db, 'users', uid));
  return docSnap.data();
}

export async function getShops() {
  const q = query(collection(db, 'shops'), where('active', '==', true));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function placeOrder(orderData: object) {
  const docRef = await addDoc(collection(db, 'orders'), {
    ...orderData,
    createdAt: serverTimestamp(),
    status: 'pending',
  });
  return docRef.id;
}

export function listenToOrder(orderId: string, callback: (data: any) => void) {
  return onSnapshot(doc(db, 'orders', orderId), (snap) => {
    callback({ id: snap.id, ...snap.data() });
  });
}
