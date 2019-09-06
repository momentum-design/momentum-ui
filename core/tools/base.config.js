const webpack = require('webpack');
const WebpackMd5Hash = require('webpack-md5-hash');
const autoprefixer = require('autoprefixer');
const postcssFlexbugsFixes = require('postcss-flexbugs-fixes')
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

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
      '@momentum-ui/icons': path.resolve(codePath, '../icons'),
      '@momentum-ui/react': path.resolve(codePath, '../react'),
      'images': path.resolve(codePath, 'images'),
    },
  },

  plugins: [
    new WebpackMd5Hash(),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
    }),
    new ExtractTextPlugin('styles.css'),
  ],

  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        include: [
          path.resolve(codePath, 'app'),
        ],
        loader: ['babel-loader'],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        loader: [
          'file-loader?name=[name].[ext]'
        ]
      },
      {
        test: /\.svg(\?v=\d+.\d+.\d+)?$/,
        loader:
          'url-loader?limit=10000&mimetype=image/svg+xml&name=[name].[ext]',
      },
      { test: /\.(jpe?g|png|gif)$/i, loader: 'file-loader?name=[name].[ext]' },
      { test: /\.ico$/, loader: 'file-loader?name=[name].[ext]' },
      { test: /\.html$/, loader: 'html-loader' },
      {
        test: /\.(scss|css)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
                loader: 'css-loader',
                options: {
                    minimize: true,
                    sourceMap: true
                }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
                ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
                plugins: () => [
                  postcssFlexbugsFixes,
                  autoprefixer({
                    browsers: [
                      '>.25%',
                      'not ie < 9',
                    ],
                    flexbox: 'no-2009',
                  }),
                ],
              },
            },
            {
              loader: 'sass-loader',
              options: {
                outputStyle: 'compressed',
                sourceMap: true,
              }
            }
          ]
        }),
      },
    ],
  },
};

module.exports = {
  baseConfig
};
