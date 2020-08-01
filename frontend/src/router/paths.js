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
    path: '/products',
    meta: {
      public: false,
      title: 'Estoque'
    },
    name: 'products',
    component: () => import('@/views/Products.vue')
  },
  {
    path: '/provider',
    meta: {
      public: false,
      title: 'Fornecedores'
    },
    name: 'provider',
    component: () => import('@/views/Providers.vue')
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
    path: '/employees',
    meta: {
      public: false,
      title: 'Cadastro de Funcionários'
    },
    name: 'employees',
    component: () => import('@/views/Employees.vue')
  },
  {
    path: '/users',
    meta: {
      public: false,
      title: 'Usuários'
    },
    name: 'users',
    component: () => import('@/views/Account/Users.vue')
  },
  {
    path: '/newPassword',
    meta: {
      public: true,
      title: 'Redefinição de Senha'
    },
    name: 'newPassword',
    component: () => import('@/views/Account/NewPassword.vue')
  }
];
