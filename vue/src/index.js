import Badge from './lib/badge/index.vue';
import Button from './lib/button/index.vue';
import ButtonGroup from './lib/button-group/index.vue';
import Icon from './lib/icon/index.vue';
import Input from './lib/input/index.vue';
import InputError from './lib/input-error/index.vue';
import InputHelper from './lib/input-helper/index.vue';
import Label from './lib/label/index.vue';
import Loading from './lib/loading/index.vue';

const components = [
  Badge,
  Button,
  ButtonGroup,
  Icon,
  Input,
  InputError,
  InputHelper,
  Label,
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
  ButtonGroup,
  Icon,
  Input,
  InputError,
  InputHelper,
  Label,
  Loading
};
