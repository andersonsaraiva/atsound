import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export const authentication = {
  namespaced: true,
  state: {
    profile: null,
    token: null,
    settings: {
      API: null,
      APP_NAME: null,
      APP_THEME_COLOR: null,
      APP_THEME_DARK: null
    }
  },
  getters,
  mutations,
  actions
};
