// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAugZ4anf8-wanYJZ-wAQo60TbPyT9q1pM",
  authDomain: "annie-generator.firebaseapp.com",
  projectId: "annie-generator",
  storageBucket: "annie-generator.appspot.com",
  messagingSenderId: "942709458175",
  appId: "1:942709458175:web:b47c7962494db19c9278ca",
  measurementId: "G-PKMX17HVS2"
};

const app = initializeApp(firebaseConfig);
export const analytics = isSupported().then((yes: any) => yes ? getAnalytics(app) : null);
export const storage = getStorage(app);
export const db = getFirestore(app);