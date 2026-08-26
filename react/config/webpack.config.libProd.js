const path = require('path');
const webpack = require('webpack');
const { createBaseConfig } = require('./base.config');
const { repoRoot } = require('./constants');

const baseConfig = createBaseConfig();

module.exports = {
  ...baseConfig,
  mode: 'production',
  entry: path.resolve(repoRoot, 'src/lib/index.js'),
  output: {
    path: path.resolve(repoRoot, 'bundles'),
    publicPath: '/',
    filename: 'index.js',
    library: { name: 'momentum-ui-react', type: 'umd' },
    globalObject: 'this',
  },
  plugins: [
    ...baseConfig.plugins,
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('production') }),
  ],
  externals: {
    react: { root: 'React', commonjs: 'react', commonjs2: 'react', amd: 'react' },
    'react-dom': { root: 'ReactDOM', commonjs: 'react-dom', commonjs2: 'react-dom', amd: 'react-dom' },
  },
};
