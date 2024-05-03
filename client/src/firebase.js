// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "home-link-c0948.firebaseapp.com",
  projectId: "home-link-c0948",
  storageBucket: "home-link-c0948.appspot.com",
  messagingSenderId: "96167906072",
  appId: "1:96167906072:web:7151b70a6e36a773346c6d",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
