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

export async function signIn(userData: { email: string; password: string }) {
  await signInWithEmailAndPassword(
    getAuth(),
    userData.email,
    userData.password
  );
  const databaseRecord = await getUserData(userData.email);
  if (databaseRecord && databaseRecord.email == userData.email) {
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
