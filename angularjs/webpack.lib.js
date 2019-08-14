let glob = require('glob');
let _ = require('lodash');

let webpack = require('webpack');
let UglifyJsPlugin = require('uglifyjs-webpack-plugin');
let path = require('path');
let pkg = require('./package.json');
let now = new Date();
let year = now.getFullYear();

let banner = `${pkg.name} v${pkg.version} (${pkg.homepage})
${pkg.description}
Copyright 2013-${year} ${pkg.author}`;

let SRC = './src/lib/';
let SUFFIX = '/index.ts';
let moduleFiles = glob.sync('./src/lib/**/index.ts');
let entryFiles = _.reduce(
  moduleFiles,
  function(obj, file) {
    let key = file.substring(file.indexOf(SRC) + SRC.length, file.indexOf(SUFFIX));
    _.set(obj, key, [file]); // set as array to workaround webpack entry path limitation
    return obj;
  },
  {
    'momentum-ui-angularjs.umd': './src/lib/momentum-ui-angularjs.ts',
    'momentum-ui-angularjs.umd.min': './src/lib/momentum-ui-angularjs.ts',
  },
);

let config = {
  mode: 'production',
  entry: entryFiles,
  devtool: 'source-map',
  output: {
    path: __dirname + '/bundles',
    filename: '[name].js',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  externals: {
    'angular': {
      amd: 'angular',
      commonjs: 'angular',
      commonjs2: 'angular',
      root: "angular",
    },
    'angular-animate': {
      amd: 'angular-animate',
      commonjs: 'angular-animate',
      commonjs2: 'angular-animate',
      root: 'ngAnimate',
    },
    'google-libphonenumber/dist/libphonenumber': {
      amd: 'google-libphonenumber/dist/libphonenumber',
      commonjs: 'google-libphonenumber/dist/libphonenumber',
      commonjs2: 'google-libphonenumber/dist/libphonenumber',
      root: 'libphonenumber',
    },
    'angular-messages': {
      amd: 'angular-messages',
      commonjs: 'angular-messages',
      commonjs2: 'angular-messages',
      root: 'ngMessages',
    },
    'angular-ui-grid': {
      amd: 'angular-ui-grid',
      commonjs: 'angular-ui-grid',
      commonjs2: 'angular-ui-grid',
      root: 'uiGrid',
    },
    'angular-ui-router': {
      amd: 'angular-ui-router',
      commonjs: 'angular-ui-router',
      commonjs2: 'angular-ui-router',
      root: 'uiRouter',
    },
    'imagesloaded': {
      amd: 'imagesloaded',
      commonjs: 'imagesloaded',
      commonjs2: 'imagesloaded',
      root: 'imagesloaded',
    },
    'masonry-layout': {
      amd: 'masonry-layout',
      commonjs: 'masonry-layout',
      commonjs2: 'masonry-layout',
      root: 'masonry-layout',
    },
    'moment': {
      amd: 'moment',
      commonjs: 'moment',
      commonjs2: 'moment',
      root: 'moment',
    }
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ['ng-annotate-loader', 'awesome-typescript-loader'],
        exclude: [/node_modules/],
      },
      {
        test: /\.html$/,
        exclude: [/\/app\/index.html$/, /node_modules/, /\/src\/docs/],
        use: [
          { loader: 'html-loader' },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      imagesloaded: 'imagesloaded/imagesloaded.pkgd.js',
      'masonry-layout': 'masonry-layout/dist/masonry.pkgd.js'
    },
  },
  resolveLoader: {
    modules: [path.join(__dirname, 'node_modules')],
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          mangle: true,
          compress: true,
        },
        include: /\.min\.js$/,
      }),
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          mangle: false,
          compress: false,
        },
        exclude: /\.min\.js$/,
      })
    ]
  },
  plugins: [
    new webpack.BannerPlugin(banner),
  ],
};

module.exports = config;
