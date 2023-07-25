import { db } from 'src/boot/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const usersDatabase = 'users';

export async function getUserData(userEmail: string) {
  return (await getDoc(doc(db, usersDatabase, userEmail))).data();
}

export async function addUser(userEmail: string) {
  setDoc(doc(db, usersDatabase, userEmail), { email: userEmail });
}
