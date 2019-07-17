'use strict';
/* eslint-disable */
console.log();
process.on('exit', () => {
  console.log();
});

if (!process.argv[2]) {
  console.error('Component Name Required - Please enter new component name');
  process.exit(1);
}

const fs = require("fs");
const path = require('path');
const fileSave = require('file-save');
const camelCase = require('camelcase');
const _componentname = process.argv[2];
const ComponentName = camelCase(_componentname, {pascalCase: true});
const componentName = camelCase(_componentname, {pascalCase: false});
const { componentRoot } = require('../../config/constants');
const componentPath = path.resolve(componentRoot, componentName);
const entryPath = path.resolve(componentRoot, 'index.js');

let configContent = fs.readFileSync(entryPath).toString();

configContent = configContent
  .replace(/;[\n\s\r\t]*const\scomponents/, `;
import ${ComponentName} from './${componentName}/index';

const components`)
  .replace(/(\w)[\n\s\r\t]*\}\;[\n\s\r\t]*Board\.registerShapesObj/, `$1,
  ${ComponentName}
};

Board.registerShapesObj`);

fileSave(entryPath)
  .write(configContent, 'utf8')
  .end();

const files = [
  {
    filename: `index.js`,
    content: `import * as d3 from "d3";
import Shape from '../shape/index';

class ${ComponentName} extends Shape {

  constructor(data, config) {
    super();
    super.init(data, config);
  }

  renderSelection(selection) {
    return selection;
  }
}

${ComponentName}.prototype.DomName = 'path';
${ComponentName}.prototype.defaultConfig = {
  generator: {

  },
  modify: {
    attr: {

    }
  }
};

export default ${ComponentName};
`
  },
  {
    filename: path.join('./example', 'index.js'),
    content: `import MomentumChart from '../../index.js';

const example = () => {

};

export default example;`
  },
  {
    filename: path.join('./test', 'index.spec.js'),
    content: `import { JSDOM } from 'jsdom';
import MomentumChart from '../../index.js';

describe('#${ComponentName} Tests', function() {
  let board;
  const { document } = (new JSDOM('')).window;

  beforeEach(function() {
    board = new MomentumChart.Board(document.body);
  });

  it('Register ${ComponentName}', function() {
    expect(board._shapeList.${componentName}).toBeTruthy();
  });

});
`
  }];

// Create component
files.forEach(file => {
  fileSave(path.join(componentPath, file.filename))
    .write(file.content, 'utf8')
    .end('\n');
});

console.log('DONE!');
