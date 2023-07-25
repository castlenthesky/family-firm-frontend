import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/IndexPage.vue'),
        meta: {
          is_nav: true,
          caption: 'Home',
          icon: 'home',
          separator: true,
        },
      },
      {
        path: '/families',
        component: () => import('pages/families/FamiliesHome.vue'),
        meta: {
          is_nav: true,
          requiresAuth: true,
          caption: 'Families',
          icon: 'family',
          separator: false,
        },
      },
      // Members Area
      {
        path: '/members',
        component: () => import('pages/family_members/MembersMain.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/finances',
        component: () => import('pages/finances/FamilyBudget.vue'),
        meta: { requiresAuth: true },
      },

      // Auth Routes
      { path: '/login', component: () => import('pages/auth/AuthLogin.vue') },
      {
        path: '/register',
        component: () => import('pages/auth/AuthRegister.vue'),
      },
    ],
  },
  // ######### Admin Routes #########
  {
    path: '/admin',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/admin/AdminUsers.vue'),
        meta: {
          icon: 'home',
          separator: true,
          requiresAuth: true,
        },
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/error/ErrorNotFound.vue'),
  },
];

export default routes;
