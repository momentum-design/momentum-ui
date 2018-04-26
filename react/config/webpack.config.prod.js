import autoprefixer from 'autoprefixer';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';

import baseConfig from './base.config';
import { repoRoot } from './constants';

baseConfig.plugins.push(
  new ExtractTextPlugin('[name].[contenthash].css'),
  new HtmlWebpackPlugin({
    template: 'src/docs/index.ejs',
    favicon: 'src/docs/favicon.ico',
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
              browsers: [
                '>1%',
                'last 4 versions',
                'Firefox ESR',
                'not ie < 9', // React doesn't support IE8 anyway
              ],
              flexbox: 'no-2009',
            }),
          ],
        },
      },
      'sass-loader?sourceMap',
    ],
  }),
});

const config = [
  {
    ...baseConfig,

    target: 'web',

    entry: path.resolve(repoRoot, 'src/docs/index'),

    output: {
      path: path.resolve(repoRoot, 'dist'),
      publicPath: '/',
      filename: 'index.js',
    },
  },
];

export default config;
