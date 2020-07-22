import Axios from 'axios';
import store from '@/store';
import router from '@/router';
import { showMessage } from '@/helpers/messages';

Axios.interceptors.request.use(
  async function (config) {
    store.dispatch('loading/startLoading');

    const token = store.getters['authentication/getToken'];

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },

  function (error) {
    Promise.resolve(error).then(function ({ response }) {
      const { message } = response.data
      return showMessage('error', message);
    });

    store.dispatch('loading/finishLoading');
  }
);

Axios.interceptors.response.use(
  function (response) {
    store.dispatch('loading/finishLoading');
    return response;
  },

  function (error) {
    Promise.resolve(error).then(function ({ response }) {
      const { message } = response.data
      const { status } = response;

      switch (status) {
        case 400:
        case 415:
        case 500: {
          showMessage('error', message)
          break;
        }

        case 401: {
          router.push({ path: '/login' });
          showMessage("error", message, 2500);
          break;
        }

        case 403: {
          router.push({ path: '/403' });
          break;
        }

        case 404: {
          router.push({ path: '/404' });
          break;
        }

        default: {
          showMessage('error', message)
        }
      }
    });

    store.dispatch('loading/finishLoading');
  }
);
