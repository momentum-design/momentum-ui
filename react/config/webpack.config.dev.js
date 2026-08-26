const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const { devServer } = require('../../tools/webpack/shared');
const { createBaseConfig } = require('./base.config');
const { repoRoot } = require('./constants');

const baseConfig = createBaseConfig({ extract: true });

module.exports = {
  ...baseConfig,
  mode: 'development',
  devtool: 'eval-source-map',
  entry: [
    path.resolve(repoRoot, 'src/app/webpack-public-path.js'),
    path.resolve(repoRoot, 'src/app/index.js'),
  ],
  output: { path: path.resolve(repoRoot, 'dist'), publicPath: '/', filename: 'bundle.js' },
  plugins: [
    ...baseConfig.plugins,
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      __DEV__: JSON.stringify(true),
    }),
    new HtmlWebpackPlugin({ template: path.resolve(repoRoot, 'src/app/index.ejs') }),
  ],
  devServer: devServer(path.resolve(repoRoot, 'src'), 4400),
};
