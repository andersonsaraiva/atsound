import Axios from 'axios';
import router from '@/router';

export default {
  setSettings: (state, payload) => {
    state.settings = payload
    Axios.defaults.baseURL = payload.API;
  },

  setProfile: (state, payload) => {
    state.profile = payload;

    router.push('dashboard');
  },

  setToken: (state, payload) => {
    state.token = payload;
  },

  clear: (state) => {
    state.profile = null;
    state.token = null;

    router.push('login');
  }
};
