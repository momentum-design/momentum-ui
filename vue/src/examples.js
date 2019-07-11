import Badge from './lib/badge/examples/index.js';

const Examples = [
  Badge
];

const install = (Vue) => {
  Examples.forEach((example) => {
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
