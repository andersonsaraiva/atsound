import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export const users = {
  namespaced: true,
  state: {
    users: []
  },
  getters,
  mutations,
  actions
};
