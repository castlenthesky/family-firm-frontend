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
          icon: 'home',
          separator: true,
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

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/error/ErrorNotFound.vue'),
  },
];

export default routes;
