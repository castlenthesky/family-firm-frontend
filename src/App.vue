<template>
  <router-view />
</template>

<script setup lang="ts">
import { firebaseAuth } from 'src/boot/firebase';
import { useUserStore } from 'src/stores';
import { onBeforeMount } from 'vue';

const user = useUserStore();

onBeforeMount(async () => {
  firebaseAuth.onAuthStateChanged((authUser) => {
    if (authUser && authUser.email) {
      console.log('authState', authUser.email);
      if (user.userAuth == '') {
        user.userAuth = authUser.email;
        user.setUserData(authUser.email);
      }
      return;
    } else {
      user.signOut();
    }
  });
});
</script>
