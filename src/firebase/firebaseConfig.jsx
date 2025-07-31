// Import Firebase modules
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// ✅ Replace these with your actual Firebase config values
const firebaseConfig = {
  apiKey: "AIzaSyA3TMt5fPMlZpffYiAPRCb_PlIx3cFiKzk",
  authDomain: "taskify-3a7da.firebaseapp.com",
  projectId: "taskify-3a7da",
  storageBucket: "taskify-3a7da.firebasestorage.app",
  messagingSenderId: "8322090567",
  appId: "1:8322090567:web:13a134891c6ab0b1335362"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// ✅ Initialize Firebase services
const auth = getAuth(app)
const db = getFirestore(app)

// ✅ Export both services
export { auth, db }
