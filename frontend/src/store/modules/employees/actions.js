import { getEmployees, createEmployees, updateEmployees, deleteEmployees } from '@/services/employees';

export default {
  get: async ({ commit }) => {
    try {
      const { data } = await getEmployees();

      if (data) {
        commit('set', data);
      }
    } catch (error) {
      throw Error("Ocorreu um erro de API.");
    }
  },

  update: async ({ commit }, params) => {
    try {
      const { status } = await updateEmployees(params);

      if (status === 200) {
        commit('update');
      }
    } catch (error) {
      throw Error("Ocorreu um erro de API.");
    }
  },

  create: async ({ commit }, params) => {
    try {
      const { status } = await createEmployees(params);

      if (status === 201) {
        commit('create');
      }
    } catch (error) {
      throw Error("Ocorreu um erro de API.");
    }
  },

  delete: async ({ commit }, params) => {
    try {
      const { status } = await deleteEmployees(params);

      if (status === 200) {
        commit('delete', params);
      }
    } catch (error) {
      throw Error("Ocorreu um erro de API.");
    }
  }
};
