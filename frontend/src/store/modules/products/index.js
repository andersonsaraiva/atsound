import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export const products = {
  namespaced: true,
  state: {
    products: []
  },
  getters,
  mutations,
  actions
};
