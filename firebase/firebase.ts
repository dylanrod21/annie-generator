import { getAnalytics, isSupported } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";

let apiKey = process.env.FIREBASE_API_KEY;
let authDomain = process.env.FIREBASE_AUTH_DOMAIN;
let projectId = process.env.FIREBASE_PROJECT_ID;
let storageBucket = process.env.FIREBASE_STORAGE_BUCKET;
let messagingSenderId = process.env.FIREBASE_MESSAGING_SENDER_ID;
let appId = process.env.FIREBASE_APP_ID;
let measurementId = process.env.FIREBASE_MEASURMENT_ID;

const firebaseConfig = {
  apiKey: apiKey,
  authDomain: authDomain,
  projectId: projectId,
  storageBucket: storageBucket,
  messagingSenderId: messagingSenderId,
  appId: appId,
  measurementId: measurementId
};

const app = initializeApp(firebaseConfig);
export const analytics = isSupported().then((yes: any) => yes ? getAnalytics(app) : null);
export const storage = getStorage(app);