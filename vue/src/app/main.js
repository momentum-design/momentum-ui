import Vue from 'vue';
import Momentum from '../index.js';
import Examples from '../examples.js';
import App from './playground/index.vue';
import './styles.scss';

Vue.use(Momentum);
Vue.use(Examples);

new Vue({
  render: h => h(App)
}).$mount('#app');
