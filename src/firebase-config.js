// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from '@firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyB9sYKPfiveIGl8WunsYLIyQvexQ_WpAm0',
  authDomain: 'crud-37f98.firebaseapp.com',
  projectId: 'crud-37f98',
  storageBucket: 'crud-37f98.appspot.com',
  messagingSenderId: '262202299285',
  appId: '1:262202299285:web:cb0daaefd05a0e3e481c9c',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
