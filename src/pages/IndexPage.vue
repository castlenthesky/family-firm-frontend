<template>
  Home Page
  <!-- <q-btn v-for="family in familyList"></q-btn> -->
  <q-btn
    v-model="userStore.activeFamily"
    v-for="family in familyStore.availableFamilyList"
    :key="family.id"
    :value="family"
    @click="setActiveFamily({ id: family.id, name: family.name })"
  >
    {{ family.name }}
  </q-btn>
  <p>Active Family: {{ familyStore.activeFamily }}</p>
</template>

<script setup lang="ts">
import { useUserStore } from 'src/stores';
import { useFamilyStore } from 'src/stores/familyStore';

const userStore = useUserStore();
const familyStore = useFamilyStore();

function setActiveFamily(family: { id: string; name: string }) {
  userStore.activeFamily = family;
  familyStore.getActiveFamilyData(family.id);
}
</script>
