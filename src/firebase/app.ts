import { initializeApp } from "firebase/app";
import { getAuth, getRedirectResult } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const app = initializeApp({
  apiKey: "AIzaSyC5_gE3yXN12n_R-VNY9XkSWqYTuV2EFAI",
  authDomain: "kitchen3-f2e3d.firebaseapp.com",
  projectId: "kitchen3-f2e3d",
  storageBucket: "kitchen3-f2e3d.appspot.com",
  messagingSenderId: "497385755131",
  appId: "1:497385755131:web:f86e4379f494baad5abb5e",
  measurementId: "G-V257HBNFVZ",
});

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
