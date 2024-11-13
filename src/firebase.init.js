// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD3Of5Ep0WTzTVCfQhtH0iMAt3WlbqsxHI",
  authDomain: "email-password-auth-2fd69.firebaseapp.com",
  projectId: "email-password-auth-2fd69",
  storageBucket: "email-password-auth-2fd69.firebasestorage.app",
  messagingSenderId: "376926149625",
  appId: "1:376926149625:web:750a3b85ffa94145333b28"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);