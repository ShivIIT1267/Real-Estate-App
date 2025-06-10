// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "trimurthy-real-estate.firebaseapp.com",
  projectId: "trimurthy-real-estate",
  storageBucket: "trimurthy-real-estate.firebasestorage.app",
  messagingSenderId: "91458395913",
  appId: "1:91458395913:web:a9fe50305e061e5e303dd8",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
