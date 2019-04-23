let glob = require('glob');
let _ = require('lodash');

let webpack = require('webpack');
let path = require('path');
let libraryName = 'momentum-ui-ng';
let outputFile = libraryName + '.js';
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
  entry: entryFiles,
  // entry: {
  //   'momentum-ui-angularjs.umd': './src/lib/momentum-ui-angularjs.ts',
  //   'momentum-ui-angularjs.umd.min': './src/lib/momentum-ui-angularjs.ts',
  // },
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
    // modules: [path.resolve(__dirname, '../node_modules'), path.resolve(__dirname, 'src/lib')],
    alias: {
      imagesloaded: 'imagesloaded/imagesloaded.pkgd.js',
      'masonry-layout': 'masonry-layout/dist/masonry.pkgd.js',
      'moment$': 'moment/moment.js',
    },
  },
  resolveLoader: {
    modules: [path.join(__dirname, 'node_modules')],
  },
  plugins: [
    new webpack.BannerPlugin(banner),
    new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      include: /\.min\.js$/,
    }),
    new webpack.optimize.UglifyJsPlugin({
      mangle: false,
      compress: false,
      exclude: /\.min\.js$/,
    }),
  ],
};

module.exports = config;
