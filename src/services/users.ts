import { db, firebaseAuth } from 'src/boot/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useRouter } from 'vue-router';

const usersDatabase = 'users';
const router = useRouter();

export async function getUserData(userEmail: string) {
  return (await getDoc(doc(db, usersDatabase, userEmail))).data();
}

export async function addUser(userEmail: string) {
  setDoc(doc(db, usersDatabase, userEmail), { email: userEmail });
}

export async function signOut() {
  router.push('/login');
  await firebaseAuth.signOut();
}
