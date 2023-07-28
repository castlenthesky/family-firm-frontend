<template>
  <div></div>
</template>

<script setup lang="ts">
import { db } from 'src/boot/firebase';
import { onSnapshot, collection } from 'firebase/firestore';

onSnapshot(
  collection(db, 'families', 'henson', 'transactions'),
  (documentData) => {
    documentData.forEach((user) => {
      // console.log(user.data());
    });
  }
);
</script>

<style></style>
