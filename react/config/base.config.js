import webpack from 'webpack';
import WebpackMd5Hash from 'webpack-md5-hash';
import path from 'path';

const codePath = path.resolve(__dirname, '..');

export const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('production'),
  __DEV__: false,
};

const baseConfig = {
  entry: undefined,

  output: undefined,

  externals: undefined,

  devtool: 'source-map', // more info:https://webpack.js.org/guides/production/#source-mapping and https://webpack.js.org/configuration/devtool/

  resolve: {
    extensions: ['*', '.js', '.jsx', '.json'],
    alias: {
      'react-native': 'react-native-web',
      '@collab-ui/react': path.resolve(codePath, 'src', 'lib'),
      // '@collab-ui/core': path.resolve(codePath, 'node_modules/@collab-ui/core/css/collab-ui.css'),
    },
  },

  plugins: [
    // Hash the files using MD5 so that their names change when the content changes.
    new WebpackMd5Hash(),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
    }),
    new webpack.DefinePlugin(GLOBALS),
  ],

  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        include: [
          path.resolve(codePath, 'src'),
          path.resolve(codePath, 'node_modules/@collab-ui/core/data'),
          path.resolve(codePath, 'node_modules/@collab-ui/icons/data'),
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
    ],
  },
};

export default baseConfig;
