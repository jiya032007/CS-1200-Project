// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC4R3wIdIAIbC5CbJS4nWfEtmZXooEeEmI",
    authDomain: "team-descision-helper.firebaseapp.com",
    projectId: "team-descision-helper",
    storageBucket: "team-descision-helper.firebasestorage.app",
    messagingSenderId: "1086550089226",
    appId: "1:1086550089226:android:c0391cd05b7aafcafe89f3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
