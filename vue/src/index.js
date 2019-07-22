import Badge from './lib/badge/index.vue';
import Button from './lib/button/index.vue';
import Icon from './lib/icon/index.vue';
import Loading from './lib/loading/index.vue';

const components = [
  Badge,
  Button,
  Icon,
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
  Icon,
  Loading
};
