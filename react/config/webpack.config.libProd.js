const autoprefixer = require('autoprefixer');
const path = require('path');
const webpack = require('webpack');

const { baseConfig } = require('./base.config');
const { repoRoot } = require('./constants');

baseConfig.plugins.push(
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production')
  }),
  new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false,
    noInfo: true, // set to false to see a list of every file being bundled.
    options: {
      sassLoader: {
        includePaths: [path.resolve(repoRoot, 'src', 'scss')],
      },
      context: '/',
      postcss: () => [autoprefixer],
    },
  })
);

baseConfig.module.rules.push({
  test: /(\.css|\.scss|\.sass)$/,
  use: [
    'style-loader',
    'css-loader?sourceMap',
    {
      loader: 'postcss-loader',
      options: {
        ident: 'postcss',
        sourceMap: true,
        plugins: () => [
          require('postcss-flexbugs-fixes'),
          autoprefixer(
            // https://webpack.js.org/guides/migrating/#complex-options
            {
              browsers: [
                '>1%',
                'last 4 versions',
                'Firefox ESR',
                'not ie < 9', // React doesn't support IE8 anyway
              ],
              flexbox: 'no-2009',
            }
          ),
        ],
      },
    },
    'sass-loader?sourceMap',
  ],
});

exports.config = [
  {
    ...baseConfig,

    entry: [
      'babel-polyfill',
      path.resolve(repoRoot, 'src/lib/index')
    ],

    output: {
      library: 'collab-ui-react',
      libraryTarget: 'umd',
      path: path.resolve(repoRoot, 'bundles'),
      publicPath: '/',
      filename: 'index.js',
    },

    externals: [
      {
        react: {
          root: 'React',
          commonjs2: 'react',
          commonjs: 'react',
          amd: 'react',
        },
      },
      {
        'react-dom': {
          root: 'ReactDOM',
          commonjs2: 'react-dom',
          commonjs: 'react-dom',
          amd: 'react-dom',
        },
      },
    ],
  },
];
