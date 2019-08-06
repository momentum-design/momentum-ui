const path = require('path');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.config.js');
const DESTINATION = path.resolve( __dirname, 'dist' );

module.exports = webpackMerge(commonConfig, {
    mode: 'production',
    output: {
        path: DESTINATION,
        filename: 'js/[name]-bundle-[chunkhash].js'
    },
});
