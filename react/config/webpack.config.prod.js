const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const { createBaseConfig } = require('./base.config');
const { repoRoot } = require('./constants');

const baseConfig = createBaseConfig({ extract: true, cssFilename: '[name].[contenthash].css' });

module.exports = {
  ...baseConfig,
  mode: 'production',
  entry: path.resolve(repoRoot, 'src/app/index.js'),
  output: { path: path.resolve(repoRoot, 'dist'), publicPath: '/', filename: 'index.js', clean: true },
  plugins: [
    ...baseConfig.plugins,
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      __DEV__: JSON.stringify(false),
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(repoRoot, 'src/app/index.ejs'),
      favicon: path.resolve(repoRoot, 'src/app/favicon.ico'),
    }),
  ],
};
