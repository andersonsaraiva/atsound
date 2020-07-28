import { getCustomers, createCustomers, updateCustomers, deleteCustomers, getCars, createCars, updateCars, deleteCars } from '@/services/customers';

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

  getCars: async ({ commit }, params) => {
    try {
      const { data } = await getCars(params);

      if (data) {
        commit('setCars', data);
      }
    } catch (error) {
      throw Error("Ocorreu um erro de API.");
    }
  },

  updateCar: async ({ commit, dispatch }, params) => {
    try {
      const { status, data } = await updateCars({ ...params.car, ...params.customer });

      if (status === 200) {
        commit('updateCar', data);
        dispatch('customers/getCars', params.customer.customer_id, { root: true });
      }
    } catch (error) {
      throw Error("Ocorreu um erro de API.");
    }
  },

  createCar: async ({ commit, dispatch }, params) => {
    try {
      const { status, data } = await createCars({ ...params.car, ...params.customer });

      if (status === 201) {
        commit('createCar', data);
        dispatch('customers/getCars', params.customer.customer_id, { root: true });
      }
    } catch (error) {
      throw Error("Ocorreu um erro de API.");
    }
  },

  deleteCar: async ({ commit }, params) => {
    try {
      const { status } = await deleteCars(params);

      if (status === 200) {
        commit('deleteCar', params);
      }
    } catch (error) {
      throw Error("Ocorreu um erro de API.");
    }
  }
};
