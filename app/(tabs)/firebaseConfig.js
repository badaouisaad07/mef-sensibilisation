// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAkFUng10eN1ShvuBiDktpdznDe9U6hK_o",
  authDomain: "mefsensib.firebaseapp.com",
  projectId: "mefsensib",
  storageBucket: "mefsensib.firebasestorage.app",
  messagingSenderId: "730944181332",
  appId: "1:730944181332:web:669ac02580611058a149c1",
  measurementId: "G-6GF8QK36KK"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
