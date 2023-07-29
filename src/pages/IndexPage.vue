<template>
  Home Page
  <!-- <q-btn v-for="family in familyList"></q-btn> -->
  <q-btn
    v-model="activeFamily"
    v-for="family in familyList"
    :key="family"
    :value="family"
    @click="setActiveFamily(family)"
  >
    {{ family }}
  </q-btn>
  <p>Active Family: {{ activeFamily }}</p>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { getUserFamilies } from 'src/services/families';
import { getAuth } from 'firebase/auth';

const familyList = ref<string[]>();
const activeFamily = ref();

function setActiveFamily(familyName: string) {
  activeFamily.value = familyName;
}

onBeforeMount(async () => {
  getAuth().onAuthStateChanged(async (user) => {
    if (user && user.email) {
      familyList.value = await getUserFamilies(user.email);
    }
  });
});
</script>
