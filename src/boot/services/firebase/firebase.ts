import { boot } from 'quasar/wrappers';
import config from 'src/config';

import { FirebaseApp, initializeApp } from 'firebase/app';
import { Auth, getAuth } from 'firebase/auth';
import { Firestore, getFirestore } from 'firebase/firestore/lite';

const firebaseApp: FirebaseApp = initializeApp(config.firebase.options);
const firebaseAuth: Auth = getAuth(firebaseApp);
const db: Firestore = getFirestore(firebaseApp);

export { firebaseApp, firebaseAuth, db };
