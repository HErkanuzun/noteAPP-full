import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBPk_2tmSxDRTR4qIdpFcesRPQ4qtoC_nk",
  authDomain: "noteapp-ee00d.firebaseapp.com",
  projectId: "noteapp-ee00d",
  storageBucket: "noteapp-ee00d.appspot.com",
  messagingSenderId: "232815237415",
  appId: "1:232815237415:web:46766400229be02189f102",
  measurementId: "G-KF8EFEZMYN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };