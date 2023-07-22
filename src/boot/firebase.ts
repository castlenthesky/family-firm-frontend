import { boot } from 'quasar/wrappers';
import config from 'src/config';

// Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// import * as admin from 'firebase-admin';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { Auth, getAuth } from 'firebase/auth';
import { Firestore, getFirestore } from 'firebase/firestore';
// import { getAnalytics } from 'firebase/analytics';

export class Firebase {
  static firebaseApp: FirebaseApp = initializeApp(config.firebase.options);
  static firebaseAuth: Auth = getAuth(this.firebaseApp);
  static db: Firestore = getFirestore(this.firebaseApp);

  static connect(): void {
    // Implement
    console.log('Firebase connecting...');
  }
}

const firebaseApp = initializeApp(config.firebase.options);
const firebaseAuth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export { firebaseApp, firebaseAuth, db };

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$firestore = 'hello';
  // ^ ^ ^ this will allow you to use this.$firestore so you won't
  //       necessarily have to import firebase in each vue file
});
