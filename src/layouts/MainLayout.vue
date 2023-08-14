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
      <q-list>
        <template v-for="(menuItem, index) in menuList" :key="index">
          <q-item
            clickable
            :to="menuItem.path"
            :active="menuItem.label === activeLink"
            @click="activeLink = menuItem.label"
            v-ripple
          >
            <q-item-section avatar>
              <q-icon :name="menuItem.icon" />
            </q-item-section>
            <q-item-section>
              {{ menuItem.label }}
            </q-item-section>
          </q-item>
          <q-separator :key="'sep' + index" v-if="menuItem.separator" />
        </template>
      </q-list>
    </q-drawer>

    <q-drawer v-model="rightDrawerOpen" side="right" bordered>
      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <q-page padding>
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import UserButton from 'src/components/UserButton.vue';
import { useAuthStore } from 'src/stores';

const authStore = useAuthStore();

const activeLink = ref('Home');

const menuList = [
  {
    icon: 'home',
    path: '/',
    label: 'Home',
    separator: true,
  },
  {
    icon: 'family_restroom',
    path: '/families',
    label: 'Family Members',
    separator: false,
  },
  {
    icon: 'price_change',
    path: '/finances',
    label: 'Budget',
    separator: true,
  },
  {
    icon: 'admin_panel_settings',
    path: '/admin',
    label: 'Admin',
    separator: false,
  },
  {
    icon: 'help',
    path: '/',
    label: 'Help',
    separator: false,
  },
];

const leftDrawerOpen = ref(false);
const rightDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
// function toggleRightDrawer() {
//   rightDrawerOpen.value = !rightDrawerOpen.value;
// }
</script>
