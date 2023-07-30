<template>
  <q-btn style="width: 280px" v-if="authStore.user" color="black">
    {{ authStore.user?.email }}
    <q-menu fit>
      <q-list style="min-width: 100px">
        <q-item clickable>
          <q-item-section>New tab</q-item-section>
        </q-item>
        <q-item clickable>
          <q-item-section>New incognito tab</q-item-section>
        </q-item>
        <q-separator />
        <q-item clickable>
          <q-item-section>Recent tabs</q-item-section>
        </q-item>
        <q-item clickable>
          <q-item-section>History</q-item-section>
        </q-item>
        <q-item clickable>
          <q-item-section>Downloads</q-item-section>
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
import { useAuthStore } from 'src/stores';

const authStore = useAuthStore();
</script>
