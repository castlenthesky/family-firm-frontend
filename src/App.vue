<template>
  <router-view />
</template>

<script setup lang="ts">
import { firebaseAuth } from 'src/boot/firebase';
import { useUserStore } from 'src/stores';

const user = useUserStore();

firebaseAuth.onAuthStateChanged((authUser) => {
  if (authUser && authUser.email) {
    console.log('Logged in as:', authUser.email);
    user.getUserData(authUser.email);
  } else {
    console.log('User logged out');
    user.resetState();
  }
});
</script>
