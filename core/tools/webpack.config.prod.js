const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const { baseConfig } = require('./base.config');
const { repoRoot } = require('./constants');

baseConfig.plugins.push(
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production')
  }),
  new HtmlWebpackPlugin({
    template: 'app/index.ejs',
    favicon: 'app/favicon.ico',
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeRedundantAttributes: true,
      useShortDoctype: true,
      removeEmptyAttributes: true,
      removeStyleLinkTypeAttributes: true,
      keepClosingSlash: true,
      minifyJS: true,
      minifyCSS: true,
      minifyURLs: true,
    },
    inject: true,
    // Note that you can add custom options here if you need to handle other custom logic in index.html
    // To track JavaScript errors via TrackJS, sign up for a free trial at TrackJS.com and enter your token below.
    trackJSToken: '',
  })
);

exports.config = [
  {
    ...baseConfig,

    target: 'web',

    entry: [
      'babel-polyfill',
      path.resolve(repoRoot, 'app/index')
    ],

    output: {
      path: path.resolve(repoRoot, 'dist'),
      publicPath: '/',
      filename: 'index.js',
    },
  },
];
