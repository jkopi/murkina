import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/auth';

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

firebase.initializeApp(config);
const firestore = firebase.firestore();
const timestamp = firebase.firestore.Timestamp;
const storage = firebase.storage().ref();
const ref = (path: string) => firebase.storage().ref(path);
const googleProvider = new firebase.auth.GoogleAuthProvider();
const auth = firebase.auth();

export { firestore, timestamp, storage, auth, googleProvider, ref };
