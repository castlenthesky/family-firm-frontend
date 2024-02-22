<template>
  <q-layout view="lHh LpR lff">
    <q-header>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title><strong>Family</strong>Firm</q-toolbar-title>

        <div v-if="authStore.isReady">
          <div class="col-md-3 q-gutter-md">
            <UserButton />
            <template v-if="!authStore.auth">
              <q-btn color="black" to="/register"> Register </q-btn>
              <q-btn color="black" to="/login"> Login </q-btn>
            </template>
          </div>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <NavigationDrawer> </NavigationDrawer>
    </q-drawer>

    <q-drawer v-model="rightDrawerOpen" side="right" bordered>
      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <q-page padding>
        <router-view></router-view>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<style lang="scss"></style>

<script setup lang="ts">
import { ref } from 'vue';
import UserButton from 'src/components/UserButton.vue';
import NavigationDrawer from 'src/components/navigation/NavigationDrawer.vue';
import { useAuthStore } from 'src/stores';

const authStore = useAuthStore();

const leftDrawerOpen = ref(true);
const rightDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
// function toggleRightDrawer() {
//   rightDrawerOpen.value = !rightDrawerOpen.value;
// }
</script>
