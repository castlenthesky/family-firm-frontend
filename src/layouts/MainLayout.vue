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
      <div class="subnav">
        <ul class="subnav-item-container">
          <li class="subnavlink">Overview</li>
          <!-- <li class="subnavlink">Calendar</li>
          <li class="subnavlink">Physical</li>
          <li class="subnavlink">Professional</li>
          <li class="subnavlink">Spiritual</li>
          <li class="subnavlink">Social</li>
          <li class="subnavlink">Mental</li> -->
        </ul>
      </div>
      <nav>
        <ul class="squircles">
          <router-link to="/">
            <li class="squircle green-boi">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                width="24"
                viewBox="0 -960 960 960"
                class="server-icon"
              >
                <path
                  fill="currentColor"
                  d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z"
                />
              </svg>
              <div class="popper-boi">
                <h4 class="popper-text">Home</h4>
              </div>
            </li>
          </router-link>
          <li class="divider"></li>
          <router-link to="/brian">
            <li class="squircle purple-boi">
              <img
                class="server-icon"
                src="https://firebasestorage.googleapis.com/v0/b/familyfirm-31b1b.appspot.com/o/brian.jpg?alt=media&token=1446a7ae-4232-40b5-8d81-83e05633ee59"
                alt=""
              />
              <div class="popper-boi">
                <h4 class="popper-text">Brian</h4>
              </div>
            </li>
          </router-link>
          <router-link to="/lin">
            <li class="squircle purple-boi">
              <div class="popper-boi">
                <h4 class="popper-text">Lin</h4>
              </div>
            </li>
          </router-link>
          <router-link to="/melody">
            <li class="squircle purple-boi">
              <div class="popper-boi">
                <h4 class="popper-text">Melody</h4>
              </div>
            </li>
          </router-link>
          <router-link to="/madylin">
            <li class="squircle purple-boi">
              <div class="popper-boi">
                <h4 class="popper-text">Madylin</h4>
              </div>
            </li>
          </router-link>
          <router-link to="/newPage">
            <li class="squircle green-boi">
              <div class="popper-boi">
                <h4 class="popper-text">Other</h4>
              </div>
            </li>
          </router-link>
        </ul>
      </nav>
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

<style>
/* :root {
  --color-blurple: #7289da;
  --color-fantastic-green: #00ae7a;
  --color-full-white: #ffffff;
  --color-lighter-dark: #45494e;
  --color-dark: #2c2f33;
  --color-not-quite-black: #23272a;
  --color-actually-black: #000000;
}

body {
  background: var(--color-dark);
}

nav {
  position: fixed;
  top: 0;
  bottom: 0;
}

.subnav {
  position: absolute;
  padding-left: 72px;
  width: 100%;
  background-color: var(--color-blurple);
  min-height: 100vh;
}
.subnav-item-container {
  list-style-type: none;
  margin: 0;
}
.subnavLink {
  background: var(--color-lighter-dark);
  width: 48px;
  height: 48px;
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.squircles {
  list-style-type: none;
  background: var(--color-not-quite-black);
  min-height: 100vh;
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 0;
}

.squircle {
  background: var(--color-lighter-dark);
  width: 48px;
  height: 48px;
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  transition: border-radius 128ms, background 128ms, color 128ms;
  display: flex;
  justify-content: center;
  align-items: center;
}
.squircle:hover {
  border-radius: 33%;
}
.squircle:hover::before {
  transform: translate(-102%, -50%) scale(0.5);
}
.squircle::before {
  content: '';
  background: var(--color-full-white);
  width: 100%;
  height: 150%;
  position: absolute;
  border-radius: 33%;
  top: 50%;
  transform: translate(-100%, -50%) scale(0);
  transition: transform 180ms;
}
.squircle:hover .popper-boi {
  opacity: 1;
  transform: translateY(-50%) scale(1);
}

.purple-boi:hover {
  background: var(--color-blurple);
}

.green-boi {
  color: var(--color-fantastic-green);
}
.green-boi:hover {
  background: var(--color-fantastic-green);
  color: var(--color-full-white);
}

.divider {
  background: var(--color-full-white);
  width: 100%;
  height: 2px;
  border-radius: 1px;
  opacity: 0.06;
  transform: scale(0.75);
}

.popper-boi {
  background: var(--color-actually-black);
  height: 70%;
  padding: 0.68rem 1rem;
  position: absolute;
  top: 50%;
  left: 125%;
  transform-origin: left;
  transform: translateY(-50%) scale(0.98);
  max-width: 256px;
  width: max-content;
  border-radius: 4px;
  opacity: 0;
  transition: opacity 200ms, transform 128ms;
  pointer-events: none;
  color: var(--color-full-white);
}

.popper-boi::before {
  content: '';
  background: var(--color-actually-black);
  position: absolute;
  left: -2px;
  top: 50%;
  transform: translateY(-50%) rotate(45deg);
  width: 24px;
  height: 24px;
  z-index: -1;
}

.popper-text {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  padding: 0;
  margin: 0;
  font-size: 1em;
}
.server-icon {
  width: inherit;
  border-radius: inherit;
} */
</style>

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
    icon: 'calendar_month',
    path: '/calendar',
    label: 'Calendar',
    separator: false,
  },
  {
    icon: 'flag_circle',
    path: '/goals',
    label: 'Goals & Development',
    separator: false,
  },
  {
    icon: 'price_change',
    path: '/finances',
    label: 'Finances',
    separator: true,
  },
  {
    icon: 'admin_panel_settings',
    path: '/admin',
    label: 'Admin',
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
