import { get } from '@/services/settings';

export default {
  getSettings: async ({ commit }) => {
    try {
      const { data } = await get();

      if (data) {
        commit('setSettings', data);
      }
    } catch (error) {
      throw Error("Ocorreu um erro de API.");
    }
  }
};
