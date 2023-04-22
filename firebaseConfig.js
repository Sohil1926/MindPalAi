import { initializeApp, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyAtNFOR-YSTa_sGvcPaYgs63nQtApEtMYk',
  authDomain: 'mindpal-gpt.firebaseapp.com',
  projectId: 'mindpal-gpt',
  storageBucket: 'mindpal-gpt.appspot.com',
  messagingSenderId: '992261086965',
  appId: '1:992261086965:web:b6007d6a13c9baf55befbc',
  measurementId: 'G-2FQB0YQVWT',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const fbdb = getFirestore(app);

export { auth, fbdb, firebaseConfig };

// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
