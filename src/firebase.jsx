// src/firebase.jsx
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD3Ioy6qWyYbn7uu4WOrnc2Vgh2BfeMCls",
  authDomain: "carritos-1a125.firebaseapp.com",
  projectId: "carritos-1a125",
  storageBucket: "carritos-1a125.appspot.com",
  messagingSenderId: "497847565520",
  appId: "1:497847565520:web:3b4b3e2b53df786d0bb2d5",
  measurementId: "G-DE6FE9EWFM"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Firestore
const db = getFirestore(app);

export { db };
