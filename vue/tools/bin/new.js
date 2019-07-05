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
const fs = require('fs');
const fileSave = require('file-save');
const uppercamelcase = require('uppercamelcase');
const componentname = process.argv[2];
const ComponentName = uppercamelcase(componentname);
const ComponentPath = path.resolve(__dirname, '../../src/lib', componentname);
const Files = [
  {
    filename: 'index.js',
    content: `import ${ComponentName} from './sample';

${ComponentName}.install = function(Vue) {
  Vue.component(${ComponentName}.name, ${ComponentName});
};

export default ${ComponentName};`
  },
  {
    filename: `${componentname}.vue`,
    content: `<template>
  <div class="md-${componentname}"></div>
</template>

<script>
export default {
  name: 'Md${ComponentName}'
};
</script>`
  },
  {
    filename: path.join('./tests', `${componentname}.spec.js`),
    content: `import { shallowMount } from '@vue/test-utils';
import ${ComponentName} from '../${componentname}';

describe('${ComponentName}', () => {
  it('should match snapshot', () => {
    const wrapper = shallowMount(${ComponentName});
    expect(wrapper.html()).toMatchSnapshot();
  });
});
`
  },
  {
    filename: path.join('./examples', `example-${componentname}-default.vue`),
    content: `<template>
  <div>
    <md-${componentname}></md-${componentname}>
  </div>
</template>

<script>
export default {
  name: 'Example${ComponentName}Default',
};
</script>
`
  },
  {
    filename: './examples/index.json',
    content: `[
  "example-${componentname}-default"
]
`
  },
  {
    filename: path.join('../../../types', `${componentname}.d.ts`),
    content: `import { MomentumUIComponent } from './component'

/** ${ComponentName} Component */
export declare class ${ComponentName} extends MomentumUIComponent {
}`
  }
];

// Add to components.json
const componentsFile = require('../../components.json');
if (componentsFile[componentname]) {
  console.error(`${componentname} exists.`);
  process.exit(1);
}
componentsFile[componentname] = `./src/lib/${componentname}/index.js`;
fileSave(path.join(__dirname, '../../components.json'))
  .write(JSON.stringify(componentsFile, null, '  '), 'utf8')
  .end('\n');

// Add to momentum-ui.d.ts
const tsPath = path.join(__dirname, '../../types/momentum-ui.d.ts');

let tsText = `${fs.readFileSync(tsPath)}
/** ${ComponentName} Component */
export class ${ComponentName} extends ${ComponentName} {}`;

const index = tsText.indexOf('export') - 1;
const importString = `import { ${ComponentName} } from './${componentname}'`;

tsText = tsText.slice(0, index) + importString + '\n' + tsText.slice(index);

fileSave(tsPath)
  .write(tsText, 'utf8')
  .end('\n');

// Create component
Files.forEach(file => {
  fileSave(path.join(ComponentPath, file.filename))
    .write(file.content, 'utf8')
    .end('\n');
});

console.log('DONE!');
