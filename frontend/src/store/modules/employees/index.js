import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export const employees = {
  namespaced: true,
  state: {
    employees: []
  },
  getters,
  mutations,
  actions
};
