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
      const { status } = await updateUser(params);

      if (status === 200) {
        commit('update');
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
      const { status } = await deleteUser(params);

      if (status === 200) {
        commit('delete', params);
      }
    } catch (error) {
      throw Error("Ocorreu um erro de API.");
    }
  }
};
