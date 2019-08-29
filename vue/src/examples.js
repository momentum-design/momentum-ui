import Badge from './lib/badge/examples/index.js';
import Button from './lib/button/examples/index.js';
import ButtonGroup from './lib/button-group/examples/index.js';
import Checkbox from './lib/checkbox/examples/index.js';
import Icon from './lib/icon/examples/index.js';
import Label from './lib/label/examples/index.js';
import List from './lib/list/examples/index.js';
import ListItem from './lib/list-item/examples/index.js';
import ListItemHeader from './lib/list-item-header/examples/index.js';
import Loading from './lib/loading/examples/index.js';
import Radio from './lib/radio/examples/index.js';

const examples = [
  Badge,
  Button,
  ButtonGroup,
  Checkbox,
  Icon,
  Label,
  List,
  ListItem,
  ListItemHeader,
  Loading,
  Radio
];

const install = (Vue) => {
  examples.forEach((example) => {
    for (var n in example) {
      Vue.component(example[n].name, example[n]);
    }
  });
};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  install
};
