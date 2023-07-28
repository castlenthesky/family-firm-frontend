<template>
  Home Page
  <!-- <q-btn v-for="family in familyList"></q-btn> -->
  <q-btn
    v-model="activeFamily"
    v-for="family in familyList"
    :key="family.id"
    :value="family.name"
  >
    {{ family.name }}
  </q-btn>
  <p>Active Family: {{ activeFamily }}</p>

  <p>{{ familyList }}</p>
</template>

<script setup lang="ts">
import { db, firebaseAuth } from 'src/boot/firebase';
import { collection, getDoc, getDocs, query, where } from 'firebase/firestore';
import { ref } from 'vue';

const familyList = ref<any>([]);
const activeFamily = ref();

const q = query(
  collection(db, 'families'),
  where('members', 'array-contains-any', [
    firebaseAuth.currentUser?.email || 'nobody',
  ])
);

getDocs(q).then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    const familyData = doc.data();
    familyList.value.push(familyData);
  });
});

// getDoc(doc(collection(db, 'families'),)
</script>
