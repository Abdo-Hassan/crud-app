// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from '@firebase/firestore';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth';

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

// firebase database
export const db = getFirestore(app);
const provider = new GoogleAuthProvider();

// firebase auth
export const auth = getAuth();

// sign in with google
export const signInWithGoogle = () => {
  //Call this function to get the user data
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log('result signInWithPopup', result);
    })
    .catch((error) => {
      console.log('error signInWithPopup', error);
    });
};

// sign out
export const handleSignOut = () => {
  signOut(auth)
    .then((result) => {
      console.log('result signOut', result);
    })
    .catch((error) => {
      console.log('error signOut', error);
    });
};
