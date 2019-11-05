import Accordion from './index.vue';

Accordion.install = function(Vue) {
  Vue.component(Accordion.name, Accordion);
};

export default Accordion;
