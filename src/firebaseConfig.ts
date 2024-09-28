// src/firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
    apiKey: 'AIzaSyClpcWSCO1R3U6qUbjZdUNs3FjWwU1gvq0',
    authDomain: 'dummy-project1-aa054.firebaseapp.com',
    projectId: 'dummy-project1-aa054',
    storageBucket: 'dummy-project1-aa054.appspot.com',
    messagingSenderId: '631907666460',
    appId: '1:631907666460:web:f5ee49507de78aab1bedd9',
    measurementId: 'G-PLL5K149GK',
  };

const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);
