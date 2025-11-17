// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC69VRoM0Y28tBCSgQN8fvUsaiTzFMF63I",
  authDomain: "team-descision-helper.firebaseapp.com",
  projectId: "team-descision-helper",
  storageBucket: "team-descision-helper.firebasestorage.app",
  messagingSenderId: "1086550089226",
  appId: "1:1086550089226:web:e9539d32e481db56fe89f3",
  measurementId: "G-GQBM3N8V84"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
