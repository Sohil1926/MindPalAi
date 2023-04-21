import { initializeApp, getApp } from 'firebase/app';

// Optionally import the services that you want to use
// import { getAuth } from 'firebase/auth';
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

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

export { app, firebaseConfig };

// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
