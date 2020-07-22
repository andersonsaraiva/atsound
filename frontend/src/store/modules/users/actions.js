import { getUsers, createUser, updateUser, deleteUser } from '@/services/users';

export default {
  get: async ({ commit }) => {
    try {
      const { data } = await getUsers();

      if (data) {
        commit('set', data);
      }
    } catch (error) {
      throw Error("Ocorreu um erro de API.");
    }
  },

  update: async ({ commit }, params) => {
    try {
      const { data } = await updateUser(params);

      if (data) {
        commit('update', data);
      }
    } catch (error) {
      throw Error("Ocorreu um erro de API.");
    }
  },

  create: async ({ commit }, params) => {
    try {
      const { data } = await createUser(params);

      if (data) {
        commit('create', data);
      }
    } catch (error) {
      throw Error("Ocorreu um erro de API.");
    }
  },

  delete: async ({ commit }, params) => {
    try {
      const { data } = await deleteUser(params);

      if (data) {
        commit('delete', data);
      }
    } catch (error) {
      throw Error("Ocorreu um erro de API.");
    }
  }
};
