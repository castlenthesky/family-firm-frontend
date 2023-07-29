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
      user.getUserData(authUser.email);
    } else {
      user.resetStore();
    }
  });
});
</script>
