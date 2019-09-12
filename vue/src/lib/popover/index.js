import Popover from './index.vue';

Popover.install = function(Vue) {
  Vue.component(Popover.name, Popover);
};

export default Popover;
