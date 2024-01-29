// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBq7fA4ESojw5fyGVigJCeUzYV5VH6NgOA",
  authDomain: "note-react-graphql.firebaseapp.com",
  projectId: "note-react-graphql",
  storageBucket: "note-react-graphql.appspot.com",
  messagingSenderId: "972744084194",
  appId: "1:972744084194:web:9c1444c1a39a6f17fa2cbb",
  measurementId: "G-QW2JRDTVHL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 getAnalytics(app);