const webpack = require('webpack');
// add browser core prefix
const autoprefixer = require('autoprefixer');
// build css out of js
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// generate html and hash
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const {
  baseConfig
} = require('./base.config');
const {
  appRoot,
  distRoot
} = require('./constants');

baseConfig.plugins.push(
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production')
  }),
  new ExtractTextPlugin('[name].[hash].css'),
  new HtmlWebpackPlugin({
    template: path.resolve(appRoot, 'index.ejs'),
    favicon: path.resolve(appRoot, 'favicon.ico'),
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
      minifyURLs: true
    },
    inject: true,
    // Note that you can add custom options here if you need to handle other custom logic in index.html
    // To track JavaScript errors via TrackJS, sign up for a free trial at TrackJS.com and enter your token below.
    trackJSToken: ''
  })
);

baseConfig.module.rules.push({
  test: /(\.css|\.scss|\.sass)$/,
  loader: ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: [
      'css-loader?sourceMap',
      {
        loader: 'postcss-loader',
        options: {
          ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
          sourceMap: true,
          plugins: () => [
            require('postcss-flexbugs-fixes'),
            autoprefixer({
              overrideBrowserslist: [
                '>.25%',
                'not ie < 9'
              ],
              flexbox: 'no-2009'
            })
          ]
        }
      },
      'sass-loader?sourceMap'
    ]
  })
});

exports.config = Object.assign({}, baseConfig, {
  target: 'web',
  entry: [
    'babel-polyfill', // convert new API
    path.resolve(appRoot, 'index.js')
  ],
  output: {
    path: distRoot,
    publicPath: '/',
    filename: 'index.js'
  },
  mode: 'production',
  optimization: {
    splitChunks: {
      chunks: "all",
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  }
});
