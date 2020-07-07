export default [
  {
    path: '*',
    meta: {
      public: true
    },
    redirect: {
      path: '/404'
    }
  },
  {
    path: '/',
    name: 'Root',
    redirect: {
      path: '/login'
    }
  },
  {
    path: '/404',
    meta: {
      public: true,
      title: '404'
    },
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue')
  },
  {
    path: '/login',
    meta: {
      public: true,
      title: 'Login'
    },
    name: 'Login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/dashboard',
    meta: {
      public: false,
      title: 'Início'
    },
    name: 'dashboard',
    component: () => import('@/views/Dashboard.vue')
  }
];
