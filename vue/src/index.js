import Badge from './lib/badge/index.vue';
import Button from './lib/button/index.vue';
import Loading from './lib/loading/index.vue';

const components = [
  Badge,
  Button,
  Loading
];

const install = function(Vue) {
  components.forEach(component => {
    Vue.component(component.name, component);
  });
};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  install,
  Badge,
  Button,
  Loading
};
