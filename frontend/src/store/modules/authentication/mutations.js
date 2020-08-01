import Axios from 'axios';
import router from '@/router';
import { showMessage } from '@/helpers/messages';
import * as HANDLERS from '@/helpers/handlers';
import eventBus from 'vue-option-events';

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

  setEditPassword: () => {
    showMessage('success', 'Senha alterada com sucesso!')
    eventBus.$emit(HANDLERS.CLOSE_DIALOG_NEW_PASSWORD);
  },

  clear: (state) => {
    state.profile = null;
    state.token = null;

    router.push('login');
  }
};
