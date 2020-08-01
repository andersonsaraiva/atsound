import { get } from '@/services/settings';
import { auth, changePassword, editPassword } from '@/services/authentication';

export default {
  getSettings: async ({ commit }) => {
    try {
      const { data } = await get();

      if (data) {
        commit('setSettings', data);
      }
    } catch (error) {
      throw Error("Ocorreu um erro de API.");
    }
  },

  login: async ({ commit }, params) => {
    try {
      const { data } = await auth(params);

      if (data) {
        commit('setToken', data.token);
        commit('setProfile', data.user);
      }
    } catch (error) {
      throw Error("Ocorreu um erro de API.");
    }
  },

  logoff: async ({ commit }) => {
    try {
      commit('clear');
    } catch (error) {
      throw Error("Ocorreu um erro de API.");
    }
  },

  changePassword: async ({ commit }, params) => {
    try {
      const { status } = await changePassword(params);

      if (status === 204) {
        commit('setChangePassword');
      }
    } catch (error) {
      throw Error('Ocorreu um erro de API');
    }
  },

  editPassword: async ({ commit }, params) => {
    try {
      const { status } = await editPassword(params);

      if (status === 204) {
        commit('setEditPassword');
      }
    } catch (error) {
      throw Error('Ocorreu um erro de API');
    }
  }
};
