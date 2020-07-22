import Axios from 'axios';
import { get } from '@/services/settings';

export default {
  getSettings: async ({ commit }) => {
    try {
      const { data } = await get();

      if (data) {
        commit('setSettings', data);
        Axios.defaults.baseURL = data.API;
      }
    } catch (error) {
      throw Error("Ocorreu um erro de API.");
    }
  }
};
