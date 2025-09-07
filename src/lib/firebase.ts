'use client';

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  projectId: "unified-booker",
  appId: "1:165319197503:web:8ddbd48540c8d5ba88098a",
  storageBucket: "unified-booker.firebasestorage.app",
  apiKey: "AIzaSyAYpg2bjtkjGSCmfO0u030CYl220TAAg-I",
  authDomain: "unified-booker.firebaseapp.com",
  messagingSenderId: "165319197503",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
