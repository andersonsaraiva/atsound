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
      //const { data } = await updateProvider(params);
      const data = true;

      if (data) {
        //commit('update', data);
        commit('update', params);
      }
    } catch (error) {
      throw Error("Ocorreu um erro de API.");
    }
  },

  create: async ({ commit }, params) => {
    try {
      //const { data } = await createProvider(params);
      const data = true;

      if (data) {
        //commit('create', data);
        commit('create', params);
      }
    } catch (error) {
      throw Error("Ocorreu um erro de API.");
    }
  },

  delete: async ({ commit }, params) => {
    try {
      //const { data } = await deleteProvider(params);
      const data = true;

      if (data) {
        //commit('delete', data);
        commit('delete', params);
      }
    } catch (error) {
      throw Error("Ocorreu um erro de API.");
    }
  }
};
