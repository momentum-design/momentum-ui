var path = require('path');
var nodeExternals = require('webpack-node-externals');
var Components = require('../components.json');

var externals = {};

Object.keys(Components).forEach(function(key) {
  externals[`momentum-ui/vue/${key}`] = `momentum-ui/lib/${key}`;
});

externals = [
  Object.assign(
    {
      vue: 'vue',
    },
    externals
  ),
  nodeExternals(),
];

exports.externals = externals;

exports.alias = {
  main: path.resolve(__dirname, '../src'),
  components: path.resolve(__dirname, '../src/lib'),
  examples: path.resolve(__dirname, '../src/app'),
  'momentum-ui': path.resolve(__dirname, '../'),
};

exports.vue = {
  root: 'Vue',
  commonjs: 'vue',
  commonjs2: 'vue',
  amd: 'vue',
};

exports.jsexclude = /node_modules|utils\/popper\.js|utils\/date\.js/;

exports.CDN_OBJECTS = [
  'bundles',
  'es',
  'lib',
  'src',
  'CHANGELOG.md',
  'components.json',
  'LICENSE',
  'README.md',
  'package.json'
];
