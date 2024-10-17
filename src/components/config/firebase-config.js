// src/config/firebase-config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Import Firestore

const firebaseConfig = {
    apiKey: "AIzaSyClLQTYLPrleLd_t4NC4f0GCj-RYcOwbzw",
    authDomain: "e-voting-website.firebaseapp.com",
    projectId: "e-voting-website",
    storageBucket: "e-voting-website.appspot.com",
    messagingSenderId: "913680306459",
    appId: "YOUR_APP_ID", // Replace with your actual App ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Initialize Firebase Auth
const db = getFirestore(app); // Initialize Firestore

// Export auth and db to use in your components
export { auth, db };
