import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export const budgets = {
  namespaced: true,
  state: {
    budgets: []
  },
  getters,
  mutations,
  actions
};
