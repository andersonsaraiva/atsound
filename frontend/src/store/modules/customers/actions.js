import { getCustomers, createCustomers, updateCustomers, deleteCustomers, createCars, updateCars, deleteCars } from '@/services/customers';

export default {
  get: async ({ commit }) => {
    try {
      const { data } = await getCustomers();

      if (data) {
        commit('set', data);
      }
    } catch (error) {
      throw Error("Ocorreu um erro de API.");
    }
  },

  update: async ({ commit }, params) => {
    try {
      const { status, data } = await updateCustomers(params);

      if (status === 200) {
        commit('update', data);
      }
    } catch (error) {
      throw Error("Ocorreu um erro de API.");
    }
  },

  create: async ({ commit }, params) => {
    try {
      const { status, data } = await createCustomers(params);

      if (status === 201) {
        commit('create', data);
      }
    } catch (error) {
      throw Error("Ocorreu um erro de API.");
    }
  },

  delete: async ({ commit }, params) => {
    try {
      const { status } = await deleteCustomers(params);

      if (status === 200) {
        commit('delete', params);
      }
    } catch (error) {
      throw Error("Ocorreu um erro de API.");
    }
  },

  updateCars: async ({ commit }, params) => {
    try {
      const { status, data } = await updateCars({ ...params.cars, ...params.customer });

      if (status === 200) {
        commit('updateCars', data);
      }
    } catch (error) {
      throw Error("Ocorreu um erro de API.");
    }
  },

  createCars: async ({ commit }, params) => {
    try {
      const { status, data } = await createCars({ ...params.cars, ...params.customer });

      if (status === 201) {
        commit('createCars', data);
      }
    } catch (error) {
      throw Error("Ocorreu um erro de API.");
    }
  },

  deleteCars: async ({ commit }, params) => {
    try {
      const { status } = await deleteCars(params);

      if (status === 200) {
        commit('deleteCars', params);
      }
    } catch (error) {
      throw Error("Ocorreu um erro de API.");
    }
  }
};
