import config from 'src/config';

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {
  getFirestore,
  collection,
  doc,
  onSnapshot,
  setDoc,
  addDoc,
} from 'firebase/firestore';

const firebaseApp = initializeApp(config.firebase.options);
const firebaseAuth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

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
