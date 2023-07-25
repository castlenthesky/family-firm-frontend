import { db, firebaseAuth } from 'src/boot/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const usersDatabase = 'users';

export async function getUserData(userEmail: string) {
  return (await getDoc(doc(db, usersDatabase, userEmail))).data();
}

export async function addUser(userEmail: string) {
  setDoc(doc(db, usersDatabase, userEmail), { email: userEmail });
}

export async function signIn(user: { email: string; password: string }) {
  await signInWithEmailAndPassword(getAuth(), user.email, user.password);
  const databaseRecord = await getUserData(user.email);
  if (databaseRecord && databaseRecord.email == user.email) {
    console.log(databaseRecord.email, user.email);
    window.location.href = '/';
  } else {
    window.location.href = '/login';
  }
}

export async function signOut() {
  await firebaseAuth.signOut().then(() => {
    window.location.href = '/login';
  });
}
