import { getProviders, createProvider, updateProvider, deleteProvider } from '@/services/providers';

export default {
  get: async ({ commit }) => {
    try {
      const { data } = await getProviders();

      if (data) {
        commit('set', data);
      }
    } catch (error) {
      throw Error("Ocorreu um erro de API.");
    }
  },

  update: async ({ commit }, params) => {
    try {
      const { status } = await updateProvider(params);

      if (status === 200) {
        commit('update');
      }
    } catch (error) {
      throw Error("Ocorreu um erro de API.");
    }
  },

  create: async ({ commit }, params) => {
    try {
      const { status } = await createProvider(params);

      if (status === 201) {
        commit('create');
      }
    } catch (error) {
      throw Error("Ocorreu um erro de API.");
    }
  },

  delete: async ({ commit }, params) => {
    try {
      const { status } = await deleteProvider(params);

      if (status === 200) {
        commit('delete', params);
      }
    } catch (error) {
      throw Error("Ocorreu um erro de API.");
    }
  }
};
