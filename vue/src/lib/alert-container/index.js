import AlertContainer from './index.vue';

AlertContainer.install = function(Vue) {
  Vue.component(AlertContainer.name, AlertContainer);
};

export default AlertContainer;
