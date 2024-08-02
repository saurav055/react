// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAGylGq14h2WMfgI3xoqcFuhkyF4kcaJl8",
  authDomain: "glistenastrology-fe788.firebaseapp.com",
  projectId: "glistenastrology-fe788",
  storageBucket: "glistenastrology-fe788.appspot.com",
  messagingSenderId: "298339342060",
  appId: "1:298339342060:web:15f3fe8ac54bb4867cb7c9",
  measurementId: "G-8HLZV2FJQ8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db=getFirestore(app)