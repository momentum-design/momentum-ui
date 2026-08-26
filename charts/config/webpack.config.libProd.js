const path = require('path');
const webpack = require('webpack');
const { createBaseConfig } = require('./base.config');
const { componentRoot, repoRoot } = require('./constants');

const baseConfig = createBaseConfig();

module.exports = {
  ...baseConfig,
  mode: 'production',
  entry: path.resolve(componentRoot, 'index.js'),
  output: {
    path: path.resolve(repoRoot, 'bundles'),
    publicPath: '/',
    filename: 'momentum-ui-charts-min.js',
    library: { name: 'momentum-ui-charts', type: 'umd', export: 'default' },
    globalObject: 'this',
  },
  plugins: [
    ...baseConfig.plugins,
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('production') }),
  ],
  externals: {
    d3: { root: 'd3', commonjs: 'd3', commonjs2: 'd3', amd: 'd3' },
  },
};
