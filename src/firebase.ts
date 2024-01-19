import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyALQt4fendCHHCQWyEUfQd9bWTrJvMobDE",
  authDomain: "learn-korean-well.firebaseapp.com",
  projectId: "learn-korean-well",
  storageBucket: "learn-korean-well.appspot.com",
  messagingSenderId: "160403506374",
  appId: "1:160403506374:web:a2834f26f8b0bfe298c3c7",
  measurementId: "G-K5PMKBQJ03",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
