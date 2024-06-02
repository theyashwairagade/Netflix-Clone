import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { FIREBASE_CONFIG } from "./secrets";

const firebaseConfig = FIREBASE_CONFIG;
const app = initializeApp(firebaseConfig);

export const firebaseAuth=getAuth(app);