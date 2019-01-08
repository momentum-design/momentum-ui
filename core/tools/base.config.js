const webpack = require('webpack');
const WebpackMd5Hash = require('webpack-md5-hash');
const path = require('path');

const codePath = path.resolve(__dirname, '..');

const baseConfig = {
  entry: undefined,

  output: undefined,

  externals: undefined,

  devtool: 'source-map', // more info:https://webpack.js.org/guides/production/#source-mapping and https://webpack.js.org/configuration/devtool/

  resolve: {
    extensions: ['*', '.js', '.jsx', '.json'],
    alias: {
      'react-native': 'react-native-web',
      '@collab-ui/icons': path.resolve(codePath, '../icons'),
      'images': path.resolve(codePath, 'images'),
      // '@collab-ui/core': path.resolve(codePath, 'node_modules/@collab-ui/core/css/collab-ui.css'),
    },
  },

  plugins: [
    // Hash the files using MD5 so that their names change when the content changes.
    new WebpackMd5Hash(),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
    }),
  ],

  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        include: [
          path.resolve(codePath, 'app'),
        ],
        use: ['babel-loader'],
      },
      {
        test: /\.eot(\?v=\d+.\d+.\d+)?$/,
        loader: 'url-loader?name=[name].[ext]',
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader:
          'url-loader?limit=10000&mimetype=application/font-woff&name=[name].[ext]',
      },
      {
        test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/,
        loader:
          'url-loader?limit=10000&mimetype=application/octet-stream&name=[name].[ext]',
      },
      {
        test: /\.svg(\?v=\d+.\d+.\d+)?$/,
        loader:
          'url-loader?limit=10000&mimetype=image/svg+xml&name=[name].[ext]',
      },
      { test: /\.(jpe?g|png|gif)$/i, loader: 'file-loader?name=[name].[ext]' },
      { test: /\.ico$/, loader: 'file-loader?name=[name].[ext]' },
      { test: /\.html$/, use: 'html-loader' },
    ],
  },
};

module.exports = {
  baseConfig
};
