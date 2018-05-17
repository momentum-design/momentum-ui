const webpack = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const config = require('../config/webpack.config.prod');

config.plugins.push(new BundleAnalyzerPlugin());

process.env.NODE_ENV = 'production';

const compiler = webpack(config);

compiler.run((error, stats) => {
  if (error) {
    throw new Error(error);
  }

  console.log(stats); // eslint-disable-line no-console
});
