import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKa7ea_vnNqTuThAD_SEWNs3vsXk0cEx4",
  authDomain: "lab-report-app-8ccf8.firebaseapp.com",
  projectId: "lab-report-app-8ccf8",
  storageBucket: "lab-report-app-8ccf8.appspot.com",
  messagingSenderId: "1094019951531",
  appId: "1:1094019951531:web:43abf378f5b9f4c1af00ee",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
