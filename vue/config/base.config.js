const WebpackMd5Hash = require('webpack-md5-hash');
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const codePath = path.resolve(__dirname, '..');

const baseConfig = {
  entry: undefined,

  output: undefined,

  externals: undefined,

  devtool: 'eval-source-map', // more info:https://webpack.js.org/guides/production/#source-mapping and https://webpack.js.org/configuration/devtool/

  resolve: {
    extensions: ['*', '.js', '.jsx', '.vue', '.json'],
    alias: {
      '@momentum-ui/vue': path.resolve(codePath, 'src', 'lib'),
    }
  },

  plugins: [
    // Hash the files using MD5 so that their names change when the content changes.
    new WebpackMd5Hash(),
    // this plugin will apply the other rules to .vue files
    new VueLoaderPlugin()
  ],

  module: {
    rules: [{
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        include: [
          path.resolve(codePath, 'src'),
          path.resolve(codePath, 'node_modules/@momentum-ui/core/data'),
          path.resolve(codePath, 'node_modules/@momentum-ui/icons/data')
        ],
        use: ['babel-loader']
      },
      {
        test: /\.eot(\?v=\d+.\d+.\d+)?$/,
        loader: 'url-loader?name=[name].[ext]'
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff&name=[name].[ext]'
      },
      {
        test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/octet-stream&name=[name].[ext]'
      },
      {
        test: /\.svg(\?v=\d+.\d+.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=image/svg+xml&name=[name].[ext]'
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        loader: 'file-loader?name=[name].[ext]'
      },
      {
        test: /\.ico$/,
        loader: 'file-loader?name=[name].[ext]'
      }
    ]
  }
};

module.exports = {
  baseConfig
};
