import { getProducts, createProduct, updateProduct, deleteProduct } from '@/services/products';

export default {
  get: async ({ commit }) => {
    try {
      const { data } = await getProducts();

      if (data) {
        commit('set', data);
      }
    } catch (error) {
      throw Error("Ocorreu um erro de API.");
    }
  },

  update: async ({ commit }, params) => {
    try {
      const { status } = await updateProduct(params);

      if (status === 200) {
        commit('update');
      }
    } catch (error) {
      throw Error("Ocorreu um erro de API.");
    }
  },

  create: async ({ commit }, params) => {
    try {
      const { status } = await createProduct(params);

      if (status === 201) {
        commit('create');
      }
    } catch (error) {
      throw Error("Ocorreu um erro de API.");
    }
  },

  delete: async ({ commit }, params) => {
    try {
      const { status } = await deleteProduct(params);

      if (status === 200) {
        commit('delete', params);
      }
    } catch (error) {
      throw Error("Ocorreu um erro de API.");
    }
  }
};
