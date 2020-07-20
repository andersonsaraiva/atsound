import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export const authentication = {
  namespaced: true,
  state: {
    profile: null,
    token: null
  },
  getters,
  mutations,
  actions
};
