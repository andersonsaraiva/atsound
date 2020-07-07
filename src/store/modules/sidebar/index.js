import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export const sidebar = {
  namespaced: true,
  state: {
    openOrClosed: true
  },
  getters,
  mutations,
  actions
};
