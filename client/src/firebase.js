// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-f9937.firebaseapp.com",
  projectId: "mern-blog-f9937",
  storageBucket: "mern-blog-f9937.appspot.com",
  messagingSenderId: "89033150401",
  appId: "1:89033150401:web:4c035a479929494415e940"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);