const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const { devServer } = require('../../tools/webpack/shared');
const { createBaseConfig } = require('./base.config');
const { appRoot, distRoot, repoRoot } = require('./constants');

const baseConfig = createBaseConfig();

module.exports = {
  ...baseConfig,
  mode: 'development',
  devtool: 'eval-source-map',
  entry: [
    path.resolve(repoRoot, 'src/app/webpack-public-path.js'),
    path.resolve(appRoot, 'index.js'),
  ],
  output: { path: distRoot, publicPath: '/', filename: 'bundle.js' },
  plugins: [
    ...baseConfig.plugins,
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      __DEV__: JSON.stringify(true),
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(appRoot, 'index.ejs'),
      favicon: path.resolve(appRoot, 'favicon.ico'),
    }),
  ],
  devServer: devServer(path.resolve(repoRoot, 'src'), 6400),
};
