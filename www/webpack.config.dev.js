const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const {
  assetRules,
  devServer,
  javascriptRule,
  resolveConfig,
  styleRule,
} = require('../tools/webpack/shared');

module.exports = {
  mode: 'development',
  target: 'web',
  devtool: 'eval-source-map',
  entry: [
    path.resolve(__dirname, 'client/webpack-public-path.js'),
    path.resolve(__dirname, 'client/index.js'),
  ],
  output: { path: path.resolve(__dirname, 'dist'), publicPath: '/', filename: 'bundle.js' },
  resolve: resolveConfig({
    'react$': require.resolve('react'),
    'react-dom$': require.resolve('react-dom'),
    images: path.resolve(__dirname, '../core/images'),
  }),
  module: {
    rules: [
      javascriptRule([
        path.resolve(__dirname, 'client'),
        path.resolve(__dirname, '../react/examples'),
      ]),
      ...assetRules(),
      styleRule({ includePaths: [path.resolve(__dirname, 'client/scss')] }),
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      __DEV__: JSON.stringify(true),
    }),
    new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'client/index.ejs') }),
  ],
  devServer: devServer(path.resolve(__dirname, 'client'), 3000),
};
