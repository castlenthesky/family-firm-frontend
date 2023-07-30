import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { route } from 'quasar/wrappers';
import { firebaseAuth } from 'src/boot/firebase';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';

import routes from './routes';

const getCurrentUser = async () => {
  return firebaseAuth.currentUser?.email;
};

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
    ? createWebHistory
    : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  Router.beforeEach(async (to, from, next) => {
    if (
      to.matched.some((record) => record.meta.requiresAuth) &&
      (await getCurrentUser())
    ) {
      next();
    } else if (
      to.matched.some((record) => record.meta.requiresAuth) &&
      !(await getCurrentUser())
    ) {
      Router.push('/login');
      next();
    } else {
      next();
    }
  });

  return Router;
});
