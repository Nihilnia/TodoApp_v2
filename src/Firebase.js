// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC3dWStlUFeqe86XhtTAQGTPS1l_Vw8U8k",
  authDomain: "todoappprojectv2emp.firebaseapp.com",
  projectId: "todoappprojectv2emp",
  storageBucket: "todoappprojectv2emp.appspot.com",
  messagingSenderId: "644920914852",
  appId: "1:644920914852:web:2439714daa118ee7e0c731",
  measurementId: "G-Z6P9PYD9YZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const userzCollection = collection(db, "userz");
export const todozCollection = collection(db, "todoz");
