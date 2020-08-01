import Axios from 'axios';
import router from '@/router';
import { showMessage } from '@/helpers/messages';

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

  setChangePassword: () => {
    showMessage('success', 'Senha alterada com sucesso!')
    router.push('login');
  },

  clear: (state) => {
    state.profile = null;
    state.token = null;

    router.push('login');
  }
};
