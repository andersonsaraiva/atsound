import { getBudgets, createBudgets, updateBudgets, deleteBudgets, createServices, updateServices, deleteServices } from '@/services/budgets';

export default {
  get: async ({ commit }) => {
    try {
      const { data } = await getBudgets();

      if (data) {
        commit('set', data);
      }
    } catch (error) {
      throw Error("Ocorreu um erro de API.");
    }
  },

  update: async ({ commit }, params) => {
    try {
      const { status, data } = await updateBudgets(params);

      if (status === 200) {
        commit('update', data);
      }
    } catch (error) {
      throw Error("Ocorreu um erro de API.");
    }
  },

  create: async ({ commit }, params) => {
    try {
      const { status, data } = await createBudgets(params);

      if (status === 201) {
        commit('create', data);
      }
    } catch (error) {
      throw Error("Ocorreu um erro de API.");
    }
  },

  delete: async ({ commit }, params) => {
    try {
      const { status } = await deleteBudgets(params);

      if (status === 200) {
        commit('delete', params);
      }
    } catch (error) {
      throw Error("Ocorreu um erro de API.");
    }
  },

  updateService: async ({ commit }, params) => {
    try {
      const { status, data } = await updateServices({ ...params.service, ...params.budget });

      if (status === 200) {
        commit('updateService', data);
      }
    } catch (error) {
      throw Error("Ocorreu um erro de API.");
    }
  },

  createService: async ({ commit }, params) => {
    try {
      const { status, data } = await createServices({ ...params.service, ...params.budget });

      if (status === 201) {
        commit('createService', data);
      }
    } catch (error) {
      throw Error("Ocorreu um erro de API.");
    }
  },

  deleteService: async ({ commit }, params) => {
    try {
      const { status } = await deleteServices(params);

      if (status === 200) {
        commit('deleteService', params);
      }
    } catch (error) {
      throw Error("Ocorreu um erro de API.");
    }
  }
};
