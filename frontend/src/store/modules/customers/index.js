import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export const customers = {
  namespaced: true,
  state: {
    customers: [],
    cars: []
  },
  getters,
  mutations,
  actions
};
