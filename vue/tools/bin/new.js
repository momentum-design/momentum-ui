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

// Create component
files.forEach(file => {
  fileSave(path.join(componentPath, file.filename))
    .write(file.content, 'utf8')
    .end('\n');
});

console.log('DONE!');
