// Government of India - NLAMS Production Firebase Authentication Service
import { initializeApp, getApps } from 'firebase/app';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut as firebaseSignOut, 
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';

// Standard Firebase Project configuration (customizable via Vite ENV variables)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyA_NLAMS_GOV_IN_FIREBASE_KEY_2026',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'nlams-gov-in.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'nlams-gov-in',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'nlams-gov-in.appspot.com',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '104829104820',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:104829104820:web:91048f029a1b',
};

// Initialize Firebase App once
let app = null;
let auth = null;

try {
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApps()[0];
  }
  auth = getAuth(app);
} catch (err) {
  console.warn('[FIREBASE_INIT] Firebase Auth initialized in standalone offline-tolerant mode:', err.message);
}

export { auth };

/**
 * Execute real Firebase sign-in with email & password
 */
export async function firebaseLogin(email, password) {
  if (!auth) {
    throw new Error('Firebase Auth is not initialized');
  }

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const token = await userCredential.user.getIdToken();
    return {
      success: true,
      user: userCredential.user,
      token,
    };
  } catch (err) {
    console.warn('[FIREBASE_AUTH] Firebase sign-in fallback check:', err.code, err.message);
    // If Firebase returns an error code due to demo sandbox or offline network,
    // we return the error or handle it smoothly
    return {
      success: false,
      error: err.code || 'AUTH_ERROR',
      message: err.message,
    };
  }
}

/**
 * Register a new Officer or Citizen in Firebase Auth
 */
export async function firebaseRegister(email, password, displayName) {
  if (!auth) {
    throw new Error('Firebase Auth is not initialized');
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    if (displayName) {
      await updateProfile(userCredential.user, { displayName });
    }
    const token = await userCredential.user.getIdToken();
    return {
      success: true,
      user: userCredential.user,
      token,
    };
  } catch (err) {
    return {
      success: false,
      error: err.code || 'REGISTER_ERROR',
      message: err.message,
    };
  }
}

/**
 * Firebase Sign Out
 */
export async function firebaseLogout() {
  if (auth) {
    try {
      await firebaseSignOut(auth);
    } catch (e) {
      // Ignore
    }
  }
}
