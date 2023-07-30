<template>
  <q-btn style="width: 280px" v-if="authStore.auth" color="black">
    {{ authStore.auth?.email }}
    <q-menu fit>
      <q-list style="min-width: 100px">
        <q-item clickable>
          <q-item-section>Profile</q-item-section>
        </q-item>
        <q-separator />
        <q-item
          clickable
          v-for="family in familyStore.availableFamilyList"
          :key="family.id"
          @click="console.log(family)"
        >
          <q-item-section>{{ family.name }} Family</q-item-section>
        </q-item>
        <q-separator />
        <q-item clickable>
          <q-item-section>Settings</q-item-section>
        </q-item>
        <q-separator />
        <q-item clickable @click="authStore.userLogout()">
          <q-item-section>Logout</q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>

<script setup lang="ts">
import { useAuthStore, useFamilyStore, useUserStore } from 'src/stores';

const authStore = useAuthStore();
const userStore = useUserStore();
const familyStore = useFamilyStore();
</script>
