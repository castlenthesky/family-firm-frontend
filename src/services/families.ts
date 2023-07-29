import { db } from 'src/boot/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

const familiesCollection = 'families';

export async function getAllFamilies() {
  return await getDocs(collection(db, familiesCollection));
}

export async function getUserFamilies(userEmail: string) {
  const userFamilies: string[] = [];

  const userFamiliesQuery = query(
    collection(db, 'families'),
    where('members', 'array-contains-any', [userEmail])
  );
  const userFamilySnapshot = await getDocs(userFamiliesQuery);
  userFamilySnapshot.forEach((familyDoc) => {
    userFamilies.push(familyDoc.data().name);
  });

  return userFamilies;
}

export async function getfamilyByName(familyName: string) {
  const familyQuery = query(
    collection(db, familiesCollection),
    where('name', '==', familyName)
  );
  return await getDocs(familyQuery);
}
