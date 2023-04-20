// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth,GoogleAuthProvider } from 'firebase/auth'
import { getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB1uzPQbdLr43Bf3sdAtjOyRGDeiq1pIa8",
  authDomain: "socialite-6c863.firebaseapp.com",
  projectId: "socialite-6c863",
  storageBucket: "socialite-6c863.appspot.com",
  messagingSenderId: "447250218874",
  appId: "1:447250218874:web:004c4fa60091b60e8820c3",
  measurementId: "G-SE3LNPWY7K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider(); // provides authentication
export const db = getFirestore(app);