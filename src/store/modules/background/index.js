import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export const background = {
  namespaced: true,
  state: {
    background: null
  },
  getters,
  mutations,
  actions
};
