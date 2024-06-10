import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import 'firebase/firestore'
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_REACT_APP_API_KEY,
  authDomain: import.meta.env.VITE_REACT_APP_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_REACT_APP_PROJECT_ID,
  storageBucket: import.meta.env.VITE_REACT_APP_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_REACT_APP_MESSAGE_SENDER_ID,
  appId: import.meta.env.VITE_REACT_APP_APP_ID,
  measurementId: import.meta.env.VITE_REACT_APP_MEASUREMENT_ID

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const data = { auth: getAuth(app),db }
export default data