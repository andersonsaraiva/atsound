import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export const providers = {
  namespaced: true,
  state: {
    providers: []
  },
  getters,
  mutations,
  actions
};
