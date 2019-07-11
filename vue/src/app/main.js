import Vue from 'vue';
import Examples from '../examples.js';
import App from './playground/index.vue';
import './styles.scss';

Vue.use(Examples);

new Vue({
  render: h => h(App)
}).$mount('#app');
