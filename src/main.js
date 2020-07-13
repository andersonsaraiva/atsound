import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import vuetify from '@/plugins/vuetify';

import '@/plugins/Events';
import '@/plugins/styles';
import '@/plugins/vueTheMask';
import '@/plugins/vuetify-money.js';
import '@/services/http';

Vue.config.productionTip = false;

export default new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app');
