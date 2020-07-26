import { getBudgets, createBudgets, updateBudgets, deleteBudgets } from '@/services/budgets';

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
      const { status } = await updateBudgets(params);

      if (status === 200) {
        commit('update');
      }
    } catch (error) {
      throw Error("Ocorreu um erro de API.");
    }
  },

  create: async ({ commit }, params) => {
    try {
      const { status } = await createBudgets(params);

      if (status === 201) {
        commit('create');
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
  }
};
