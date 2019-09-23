import AlertBanner from './index.vue';

AlertBanner.install = function(Vue) {
  Vue.component(AlertBanner.name, AlertBanner);
};

export default AlertBanner;
