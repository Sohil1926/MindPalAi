import { initializeApp, getApp } from 'firebase/app';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


// Initialize Firebase
export const firebaseConfig = {
  apiKey: 'AIzaSyAtNFOR-YSTa_sGvcPaYgs63nQtApEtMYk',
  authDomain: 'mindpal-gpt.firebaseapp.com',
  projectId: 'mindpal-gpt',
  storageBucket: 'mindpal-gpt.appspot.com',
  messagingSenderId: '992261086965',
  appId: '1:992261086965:web:b6007d6a13c9baf55befbc',
  measurementId: 'G-2FQB0YQVWT',
};

if (!firebase.apps. length) {
  firebase.initializeApp(firebaseConfig);

}
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
