import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBBnZXp-HhPD6vfPqXrWrmP0KYE8pv_o54",
  authDomain: "todoapp-1f42b.firebaseapp.com",
  projectId: "todoapp-1f42b",
  storageBucket: "todoapp-1f42b.appspot.com",
  messagingSenderId: "620880149325",
  appId: "1:620880149325:web:376596e256ce362931d504",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const provider = new GoogleAuthProvider();

export { auth, db, provider, signInWithPopup };
