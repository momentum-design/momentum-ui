const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const {
  MiniCssExtractPlugin,
  assetRules,
  javascriptRule,
  resolveConfig,
  styleRule,
} = require('../tools/webpack/shared');

module.exports = {
  mode: 'production',
  target: 'web',
  devtool: 'source-map',
  entry: path.resolve(__dirname, 'client/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].[contenthash].js',
    clean: true,
  },
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
      styleRule({ extract: true, includePaths: [path.resolve(__dirname, 'client/scss')] }),
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      __DEV__: JSON.stringify(false),
    }),
    new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' }),
    new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'client/index.ejs') }),
    new CopyWebpackPlugin({
      patterns: [{ from: path.resolve(__dirname, 'client/favicon'), to: '.' }],
    }),
  ],
};
