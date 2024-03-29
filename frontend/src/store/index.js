import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersist from 'vuex-persist';

import { authentication } from '@/store/modules/authentication';
import { background } from '@/store/modules/background';
import { budgets } from '@/store/modules/budgets';
import { customers } from '@/store/modules/customers';
import { employees } from '@/store/modules/employees';
import { loading } from '@/store/modules/loading';
import { products } from '@/store/modules/products';
import { providers } from '@/store/modules/providers';
import { sidebar } from '@/store/modules/sidebar';
import { users } from '@/store/modules/users';

const vuexPersist = new VuexPersist({
  key: 'application',
  storage: sessionStorage,
  reducer: state => ({
    authentication: state.authentication
  })
});

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [vuexPersist.plugin],
  modules: {
    authentication,
    background,
    budgets,
    customers,
    employees,
    loading,
    products,
    providers,
    sidebar,
    users
  }
});
