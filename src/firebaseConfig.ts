// src/firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

//old-config
// const firebaseConfig = {
//     apiKey: 'AIzaSyClpcWSCO1R3U6qUbjZdUNs3FjWwU1gvq0',
//     authDomain: 'dummy-project1-aa054.firebaseapp.com',
//     projectId: 'dummy-project1-aa054',
//     storageBucket: 'dummy-project1-aa054.appspot.com',
//     messagingSenderId: '631907666460',
//     appId: '1:631907666460:web:f5ee49507de78aab1bedd9',
//     measurementId: 'G-PLL5K149GK',
//   };

//new-config
const firebaseConfig = {
  apiKey: "AIzaSyBQtEGXAi1yG2emY0F_olvl7i1kU3CtnNw",
  authDomain: "task-manager-c383e.firebaseapp.com",
  projectId: "task-manager-c383e",
  storageBucket: "task-manager-c383e.appspot.com",
  messagingSenderId: "747529559307",
  appId: "1:747529559307:web:f7e18c40c4202f5f19d60e",
  measurementId: "G-M52T57Z9P0"
};

const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);
