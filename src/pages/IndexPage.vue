<template>
  Home Page
  <!-- <q-btn v-for="family in familyList"></q-btn> -->
  <q-btn
    v-for="family in familyStore.availableFamilyList"
    v-model="familyStore.family"
    :key="family.id"
    :value="family"
    @click="familyStore.family = family"
  >
    {{ family.name }}
  </q-btn>
  <p>Active Family: {{ familyStore.family }}</p>
</template>

<script setup lang="ts">
import { useFamilyStore } from 'src/stores/familyStore';

const familyStore = useFamilyStore();
</script>
