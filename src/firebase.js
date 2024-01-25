import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA_ZYW-UvM_t2epitPvSiKt2Ttctd6OON4",
  authDomain: "aventura-digital-67cca.firebaseapp.com",
  projectId: "aventura-digital-67cca",
  storageBucket: "aventura-digital-67cca.appspot.com",
  messagingSenderId: "1007766065087",
  appId: "1:1007766065087:web:2f1a7d44b371fb53d5db0a",
  measurementId: "G-3WGBGX0LB0"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
