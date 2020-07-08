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
  },
  {
    path: '/calendar',
    meta: {
      public: false,
      title: 'Agenda'
    },
    name: 'calendar',
    component: () => import('@/views/Calendar.vue')
  },
  {
    path: '/budgets',
    meta: {
      public: false,
      title: 'Orçamentos'
    },
    name: 'budgets',
    component: () => import('@/views/Budgets.vue')
  },
  {
    path: '/stock',
    meta: {
      public: false,
      title: 'Estoque'
    },
    name: 'stock',
    component: () => import('@/views/Stock.vue')
  },
  {
    path: '/customer',
    meta: {
      public: false,
      title: 'Cadastro de Clientes'
    },
    name: 'customer',
    component: () => import('@/views/Customer.vue')
  },
  {
    path: '/collaborators',
    meta: {
      public: false,
      title: 'Cadastro de Funcionários'
    },
    name: 'collaborators',
    component: () => import('@/views/Collaborators.vue')
  }
];
