const path = require('path');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.config.js');
const DESTINATION = path.resolve( __dirname, '.tmp' );

module.exports = webpackMerge(commonConfig, {
    devtool: 'cheap-module-source-map',
    mode: 'development',
    devServer: {
        contentBase: path.join(__dirname, ".tmp"),
        compress: true,
        port: 4900
    },

    output: {
        path: DESTINATION,
        filename: 'js/index.js'
    },
});
