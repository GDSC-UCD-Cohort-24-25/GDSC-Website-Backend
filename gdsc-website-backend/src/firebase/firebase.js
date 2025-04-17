// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
require('dotenv').config({ path: '../../.env' })
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "",
  authDomain: "gdsc-ucdavis.firebaseapp.com",
  projectId: "gdsc-ucdavis",
  storageBucket: "gdsc-ucdavis.firebasestorage.app",
  messagingSenderId: "150844625370",
  appId: "1:150844625370:web:dee601a69fd617107730e3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export default db