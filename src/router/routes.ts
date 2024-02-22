import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/',
        components: {
          default: () => import('pages/auth/AuthLogin.vue'),
          navContent: () => import('pages/auth/AuthRegister.vue'),
        },
      },
      {
        path: '/brian',
        components: {
          default: () => import('pages/users/UserpageBrian.vue'),
          navContent: () => import('pages/users/UserNavBrian.vue'),
        },
        children: [
          {
            path: 'home',
            component: () => import('pages/users/UserpageBrian.vue'),
          },
          {
            path: 'physical',
            component: () => import('pages/users/UserpageBrian.vue'),
          },
          {
            path: 'social',
            component: () => import('pages/users/UserpageBrian.vue'),
          },
          {
            path: 'spiritual',
            component: () => import('pages/users/UserpageBrian.vue'),
          },
          {
            path: 'professional',
            component: () => import('pages/users/UserpageBrian.vue'),
          },
        ],
        // meta: { requiresAuth: true },
      },
      // Members Area
      {
        path: '/lin',
        components: {
          default: () => import('pages/users/UserpageLin.vue'),
          navContent: () => import('pages/users/UserNavLin.vue'),
        },
        // meta: { requiresAuth: true },
      },
      // {
      //   path: '/finances',
      //   component: () => import('pages/finances/FamilyBudget.vue'),
      //   meta: { requiresAuth: true },
      // },

      // Auth Routes
      {
        path: '/profile',
        component: () => import('pages/user/UserProfile.vue'),
      },
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
