import { db } from 'src/boot/firebase';
import {
  collection,
  getDocs,
  getDoc,
  query,
  where,
  doc,
} from 'firebase/firestore';

const familiesCollection = 'families';

export async function getAllFamilies() {
  return await getDocs(collection(db, familiesCollection));
}

export async function getUserFamilies(userEmail: string) {
  const userFamilies: { id: string; name: string }[] = [];

  const userFamiliesQuery = query(
    collection(db, 'families'),
    where('members', 'array-contains-any', [userEmail])
  );
  const userFamilySnapshot = await getDocs(userFamiliesQuery);
  userFamilySnapshot.forEach((familyDoc) => {
    userFamilies.push({
      id: familyDoc.id,
      name: familyDoc.data().name,
    });
  });

  return userFamilies;
}

export async function getfamilyById(familyId: string) {
  return (await getDoc(doc(collection(db, 'families'), familyId))).data();
}
