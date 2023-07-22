<template>
  <q-layout view="lHh LpR lff">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title><strong>Family</strong>Firm </q-toolbar-title>

        <div>
          <q-btn color="black" @click="handleSignOut">{{ currentUser }}</q-btn>
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
      <!-- <q-list>
        <q-item-label header> Essential Links </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list> -->
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
import { ref, onMounted } from 'vue';
import { getAuth, onAuthStateChanged, signOut, Auth } from '@firebase/auth';
import { useRouter } from 'vue-router';

const router = useRouter();
const activeLink = ref('Home');

const isLoggedIn = ref(false);
const currentUser = ref('');
let auth: Auth;

onMounted(() => {
  auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedIn.value = true;
      currentUser.value = user.email || '';
      console.log(`Currently logged in as ${currentUser.value}`);
    } else {
      isLoggedIn.value = false;
      router.push('/login');
    }
  });
});

const handleSignOut = () => {
  signOut(auth).then(() => {
    console.log('logged out.');
    router.push('/login');
  });
  return;
};
const menuList = [
  {
    icon: 'home',
    path: '/',
    label: 'Home',
    separator: true,
  },
  {
    icon: 'family_restroom',
    path: '/members',
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
    icon: 'person',
    path: '/register',
    label: 'Register',
    separator: false,
  },
  {
    icon: 'login',
    path: '/login',
    label: 'Login',
    separator: false,
  },
  {
    icon: 'logout',
    path: '/login',
    label: 'Logout',
    separator: true,
  },
  {
    icon: 'feedback',
    path: '/',
    label: 'Send Feedback',
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
