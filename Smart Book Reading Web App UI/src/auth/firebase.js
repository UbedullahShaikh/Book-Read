// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAaSJh47Oiikeluxdm-ppgW3hsy0dHyEmw",
  authDomain: "smart-book-reading-web-app.firebaseapp.com",
  projectId: "smart-book-reading-web-app",
  storageBucket: "smart-book-reading-web-app.firebasestorage.app",
  messagingSenderId: "232215639814",
  appId: "1:232215639814:web:0de69af875678bc7f7d087",
  measurementId: "G-X7XHZ89P19"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };