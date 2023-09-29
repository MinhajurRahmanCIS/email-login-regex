// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAAi8RKOtM-HNYjlauKqTid1x59m4jRr9U",
  authDomain: "email-login-9d206.firebaseapp.com",
  projectId: "email-login-9d206",
  storageBucket: "email-login-9d206.appspot.com",
  messagingSenderId: "685154230700",
  appId: "1:685154230700:web:08939e43ad3fdf4cc75a09"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Exporting firebase configure (app) to use in AuthContext.
export default app;