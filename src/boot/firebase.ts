import config from 'src/config';

import { initializeApp } from 'firebase/app';
import { Auth, getAuth } from 'firebase/auth';
import {
  getFirestore,
  collection,
  doc,
  onSnapshot,
  setDoc,
  addDoc,
} from 'firebase/firestore';

const firebaseApp = initializeApp(config.firebase.options);
const firebaseAuth: Auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

// class Fire {
//   public static firebaseApp = initializeApp(config.firebase.options);
//   public static firebaseAuth = getAuth(this.firebaseApp);
//   public static db = getFirestore(this.firebaseApp);
// }

export {
  firebaseApp,
  firebaseAuth,
  db,
  collection,
  doc,
  onSnapshot,
  setDoc,
  addDoc,
};
