import { db } from 'src/boot/firebase';
import {
  collection,
  getDocs,
  getDoc,
  query,
  where,
  doc,
  DocumentData,
  addDoc,
  setDoc,
} from 'firebase/firestore';

export async function getTransactions(familyID: string) {
  // const transactionsQuery = query(
  //   collection(db, 'families', familyID, 'transactions'),
  //   where('date', 'array-contains-any', [userEmail])
  // );

  // getDocs(categoriesQuery).then((querySnapshot) => {
  //   categoryOptions.value = [];
  //   querySnapshot.forEach((doc) => {
  //     categoryOptions.value.push(doc.id);
  //   });
  // });
  return console.log(familyID);
}

export async function getTransactionsSince(familyID: string, startDate: Date) {
  return console.log(
    `Getting transactions since ${startDate} for ${familyID} family.`
  );
}

export async function getTransactionsBetween(
  familyID: string,
  startDate: Date,
  endDate: Date
) {
  return console.log(
    `Getting transactions between ${startDate} and ${endDate} for ${familyID} family.`
  );
}
