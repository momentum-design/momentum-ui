const path = require('path');
const APPROOT = path.resolve(__dirname, 'src/app');

/**
 * Webpack Plugins
 */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  context: APPROOT,

  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      // '@momentum-ui/angularjs': path.resolve(__dirname, 'src/lib', 'momentum-ui-angularjs.ts'),
      '@momentum-ui/angularjs': path.resolve(__dirname, 'bundles', 'momentum-ui-angularjs.umd.js'),
    },
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: [/node_modules/],
        use: ['ng-annotate-loader', 'awesome-typescript-loader'],
      },

      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
          publicPath: '../',
        }),
      },

      {
        test: /\.(svg|jpg|png|gif)$/,
        use: 'file-loader',
      },

      {
        test: /\.(woff|woff2|eot|ttf)$/,
        use: 'file-loader?outputPath=fonts/',
      },

      {
        test: /.html$/,
        exclude: /index.html$/,
        use: 'html-loader',
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'AngularJS - Webpack',
      template: 'index.html',
      inject: true,
    }),
    new LoaderOptionsPlugin({
      debug: true,
      options: {
        tslint: {
          configuration: require('./tslint.json'),
          typeCheck: true,
        },
      },
    }),
    new ExtractTextPlugin('css/style.css'),
    new webpack.ProvidePlugin({
      'window.jQuery': 'jquery',
    }),
  ],

  entry: './index.ts',
};
