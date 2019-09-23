'use strict';

console.log();
process.on('exit', () => {
  console.log();
});

if (!process.argv[2]) {
  console.error('Component Name Required - Please enter new component name');
  process.exit(1);
}

const path = require('path');
const fileSave = require('file-save');
const uppercamelcase = require('uppercamelcase');
const componentname = process.argv[2];
const ComponentName = uppercamelcase(componentname);
const componentPath = path.resolve(__dirname, '../../src/lib', componentname);
const files = [
  {
    filename: 'index.js',
    content: `import ${ComponentName} from './index.vue';

${ComponentName}.install = function(Vue) {
  Vue.component(${ComponentName}.name, ${ComponentName});
};

export default ${ComponentName};`
  },
  {
    filename: `index.vue`,
    content: `<template>
  <div class="md-${componentname}"></div>
</template>

<script>
export default {
  name: 'md-${componentname}',
};
</script>`
  },
  {
    filename: path.join('./tests', `${componentname}.spec.js`),
    content: `import { mount } from '@vue/test-utils';
import ${ComponentName} from '../index.vue';

describe('${ComponentName}', () => {
  it('should match snapshot', () => {
    const wrapper = mount(${ComponentName});
    expect(wrapper.html()).toMatchSnapshot();
  });
});
`
  },
  {
    filename: path.join('./examples', `default.vue`),
    content: `<template>
  <md-${componentname}></md-${componentname}>
</template>

<script>
export default {
  name: 'Example${ComponentName}Default',
};
</script>
`
  },
  {
    filename: './examples/index.js',
    content: `import ${ComponentName} from '../index.vue';
import Example${ComponentName}Default from './default.vue';

export default {
  ${ComponentName},
  Example${ComponentName}Default
};
`
  }
];

// Add to components.json
const components = require('../../components.json');
if (components[componentname]) {
  console.error(`${componentname} exists.`);
  process.exit(1);
}
let names = Object.keys(components);
names.push(componentname);
names.sort();
let componentsSorted = {};
names.forEach(name => {
  componentsSorted[name] = `./src/lib/${name}/index.js`;
});

fileSave(path.join(__dirname, '../../components.json'))
  .write(JSON.stringify(componentsSorted, null, '  '), 'utf8')
  .end('\n');

// Create component
files.forEach(file => {
  fileSave(path.join(componentPath, file.filename))
    .write(file.content, 'utf8')
    .end('\n');
});

console.log('DONE!');
