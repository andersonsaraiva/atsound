import Vue from 'vue';
import VueRouter from 'vue-router';
import paths from './paths';
import store from '@/store';

Vue.use(VueRouter);

const router = new VueRouter({
  base: '/',
  mode: 'hash',
  routes: paths,
  suppressTransitionError: true
});

router.beforeEach(function (to, from, next) {
  const isPublicRoute = to.matched.some(route => route.meta.public);

  // const token = store.getters['authentication/getToken'];

  // if (!isPublicRoute && !token) {
  //   return next({ path: '/login' });
  // }

  // if (to.path === '/login' && token) {
  //   return next({ path: from.path });
  // }

  if (to.meta.title) {
    document.title = `Atsound - ${to.meta.title}`;
  }

  next();
});

export default router;
