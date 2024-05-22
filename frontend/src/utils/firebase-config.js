import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyBkaGQuVnzKdqfL1WAtRXgTZlaU5ffCdmE",
  authDomain: "netflix-clone-2da2f.firebaseapp.com",
  projectId: "netflix-clone-2da2f",
  storageBucket: "netflix-clone-2da2f.appspot.com",
  messagingSenderId: "908101136487",
  appId: "1:908101136487:web:d0ee031484cdeb9df624c2",
  measurementId: "G-0VMYQN7HEF"
};

const app = initializeApp(firebaseConfig);

export const firebaseAuth=getAuth(app);