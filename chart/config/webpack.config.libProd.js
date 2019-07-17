const autoprefixer = require('autoprefixer');
const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const {
  baseConfig
} = require('./base.config');
const {
  repoRoot,
  componentRoot
} = require('./constants');

baseConfig.devtool = 'source-map';

var _plusins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production')
  }),
  new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false,
    noInfo: true, // set to false to see a list of every file being bundled.
    options: {
      sassLoader: {
        includePaths: [path.resolve(repoRoot, 'src', 'scss')]
      },
      context: '/',
      postcss: () => [autoprefixer]
    }
  })
];
for (let _i = 0, _l = _plusins.length; _i < _l; _i++) {
  baseConfig.plugins.push(_plusins[_i]);
}

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
              overrideBrowserslist: [
                '>1%',
                'last 4 versions',
                'Firefox ESR',
                'not ie < 9' // React doesn't support IE8 anyway
              ],
              flexbox: 'no-2009'
            }
          )
        ]
      }
    },
    'sass-loader?sourceMap'
  ]
});

exports.config = Object.assign({}, baseConfig, {
  entry: [
    'babel-polyfill',
    path.resolve(componentRoot, 'index.js')
  ],
  output: {
    library: 'momentum-ui-chart',
    libraryTarget: 'umd',
    libraryExport: 'default',
    path: path.resolve(repoRoot, 'bundles/'),
    publicPath: '/',
    filename: 'momentum-ui-chart-min.js'
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        sourceMap: true,
        extractComments: false
      })
    ]
  },
  mode: 'production',
  externals: {
    d3: {
      d3: 'd3',
      root: 'd3',
      commonjs: 'd3',
      commonjs2: 'd3',
      amd: 'd3'
    }
  }
});
