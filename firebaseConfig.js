import { initializeApp, getApp } from 'firebase/app';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


// Initialize Firebase
export const firebaseConfig = {
  apiKey: "AIzaSyBQM-6jrv9xZ8c_p46fjsWDWFOsOn5_ayw",
  authDomain: "mindpal-1534b.firebaseapp.com",
  projectId: "mindpal-1534b",
  storageBucket: "mindpal-1534b.appspot.com",
  messagingSenderId: "809704727891",
  appId: "1:809704727891:web:666a497d7447baceb4eda6",
  measurementId: "G-NE4WXFE10B"
};

if (!firebase.apps. length) {
  firebase.initializeApp(firebaseConfig);

}
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
