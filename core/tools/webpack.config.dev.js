const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const { devServer } = require('../../tools/webpack/shared');
const { createBaseConfig } = require('./base.config');
const { repoRoot } = require('./constants');

module.exports = {
  ...createBaseConfig(),
  mode: 'development',
  devtool: 'eval-source-map',
  entry: [
    path.resolve(repoRoot, 'app/webpack-public-path.js'),
    path.resolve(repoRoot, 'app/index.js'),
  ],
  output: {
    path: path.resolve(repoRoot, 'dist'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  plugins: [
    ...createBaseConfig().plugins,
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      __DEV__: JSON.stringify(true),
    }),
    new HtmlWebpackPlugin({ template: path.resolve(repoRoot, 'app/index.ejs') }),
  ],
  devServer: devServer(path.resolve(repoRoot, 'app'), 4000),
};
