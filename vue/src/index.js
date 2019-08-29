import Badge from './lib/badge/index.vue';
import Button from './lib/button/index.vue';
import ButtonGroup from './lib/button-group/index.vue';
import Checkbox from './lib/checkbox/index.vue';
import CheckboxGroup from './lib/checkbox-group/index.vue';
import Icon from './lib/icon/index.vue';
import Label from './lib/label/index.vue';
import List from './lib/list/index.vue';
import ListItem from './lib/list-item/index.vue';
import ListItemHeader from './lib/list-item-header/index.vue';
import ListItemSection from './lib/list-item-section/index.vue';
import ListSeparator from './lib/list-separator/index.vue';
import Loading from './lib/loading/index.vue';
import Radio from './lib/radio/index.vue';
import RadioGroup from './lib/radio-group/index.vue';

const components = [
  Badge,
  Button,
  ButtonGroup,
  Checkbox,
  CheckboxGroup,
  Icon,
  Label,
  List,
  ListItem,
  ListItemHeader,
  ListItemSection,
  ListSeparator,
  Loading,
  Radio,
  RadioGroup
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
  Checkbox,
  CheckboxGroup,
  Icon,
  Label,
  List,
  ListItem,
  ListItemHeader,
  ListItemSection,
  ListSeparator,
  Loading,
  Radio,
  RadioGroup
};
