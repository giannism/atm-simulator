import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import axios from "axios";
import { store } from './store';

axios.defaults.headers['Content-Type'] = 'application/json';

Vue.config.productionTip = false

new Vue({
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
