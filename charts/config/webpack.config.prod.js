const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const { createBaseConfig } = require('./base.config');
const { appRoot, distRoot } = require('./constants');

const baseConfig = createBaseConfig({ extract: true, cssFilename: '[name].[contenthash].css' });

module.exports = {
  ...baseConfig,
  mode: 'production',
  entry: path.resolve(appRoot, 'index.js'),
  output: { path: distRoot, publicPath: '/', filename: 'index.js', clean: true },
  plugins: [
    ...baseConfig.plugins,
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('production') }),
    new HtmlWebpackPlugin({
      template: path.resolve(appRoot, 'index.ejs'),
      favicon: path.resolve(appRoot, 'favicon.ico'),
    }),
  ],
};
