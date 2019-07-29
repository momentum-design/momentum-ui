import Badge from './lib/badge/examples/index.js';
import Button from './lib/button/examples/index.js';
import ButtonGroup from './lib/button-group/examples/index.js';
import Icon from './lib/icon/examples/index.js';
import Input from './lib/input/examples/index.js';
import InputHelper from './lib/input-helper/examples/index.js';
import Label from './lib/label/examples/index.js';
import Loading from './lib/loading/examples/index.js';

const examples = [
  Badge,
  Button,
  ButtonGroup,
  Icon,
  Input,
  InputHelper,
  Label,
  Loading
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
