const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const { baseConfig } = require('./base.config');
const { repoRoot } = require('./constants');

baseConfig.resolve.alias['react-dom'] = '@hot-loader/react-dom';

baseConfig.plugins.push(
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('development'), // Tells React to build in either dev or prod modes. https://facebook.github.io/react/downloads.html (See bottom)
    __DEV__: true,
  }),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
  new HtmlWebpackPlugin({
    // Create HTML file that includes references to bundled CSS and JS.
    template: 'app/index.ejs',
    minify: {
      removeComments: true,
      collapseWhitespace: true,
    },
    inject: true,
  }),
  new webpack.LoaderOptionsPlugin({
    minimize: false,
    debug: true,
    noInfo: true, // set to false to see a list of every file being bundled.
  }),
);

exports.config = {
  ...baseConfig,

  devtool: 'eval-source-map', // more info:https://webpack.js.org/guides/development/#using-source-maps and https://webpack.js.org/configuration/devtool/

  entry: [
    // must be first entry to properly set public path
    './app/webpack-public-path',
    'babel-polyfill',
    'react-hot-loader/patch',
    'webpack-hot-middleware/client?reload=true',
    path.resolve(repoRoot, 'app/index.js'), // Defining path seems necessary for this to work consistently on Windows machines.
  ],

  target: 'web',

  output: {
    path: path.resolve(repoRoot, 'dist'), // Note: Physical files are only output by the production build task `npm run build`.
    publicPath: '/',
    filename: 'bundle.js',
  },
};
