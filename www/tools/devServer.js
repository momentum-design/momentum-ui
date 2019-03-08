process.env.NODE_ENV = 'development';

import nodemon from 'nodemon';
import browserSync from 'browser-sync';
import historyApiFallback from 'connect-history-api-fallback';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from '../webpack.config.dev';

const bundler = webpack(config);

nodemon('--exec ./node_modules/.bin/babel-node ./server/server.js --watch ./server');
nodemon
  .on('start', function() {
    console.log('\n[nodemon] App has started'); // eslint-disable-line no-console
  })
  .on('quit', function() {
    console.log('\n[nodemon] App has started'); // eslint-disable-line no-console
    process.exit(0);
  })
  .on('restart', function() {
    console.log('\n[nodemon] App has quit'); // eslint-disable-line no-console
  });

browserSync({
  port: 3000,
  ui: {
    port: 3001,
  },
  server: {
    baseDir: 'client',

    middleware: [
      historyApiFallback(),

      webpackDevMiddleware(bundler, {
        // Dev middleware can't access config, so we provide publicPath
        publicPath: config.output.publicPath,

        // These settings suppress noisy webpack output so only errors are displayed to the console.
        noInfo: true,
        quiet: false,
        stats: {
          assets: false,
          colors: true,
          version: false,
          hash: false,
          timings: false,
          chunks: false,
          chunkModules: false,
        },

        // for other settings see
        // https://webpack.js.org/guides/development/#using-webpack-dev-middleware
      }),

      // bundler should be the same as above
      webpackHotMiddleware(bundler),
    ],
  },

  // no need to watch '*.js' here, webpack will take care of it for us,
  // including full page reloads if HMR won't work
  files: ['client/*.html'],
});
