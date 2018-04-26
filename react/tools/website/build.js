// More info on Webpack's Node API here: https://webpack.js.org/api/node/
// Allowing console calls below since this is a build file.
/* eslint-disable no-console */
import webpack from 'webpack';

import config from '../../config/webpack.config.prod';
import {
  chalkError,
  chalkSuccess,
  chalkWarning,
  chalkProcessing,
} from '../../config/chalkConfig';

process.env.NODE_ENV = 'production'; // this assures React is built in prod mode and that the Babel dev config doesn't apply.

const runWebpack = () => {
  console.log(
    chalkProcessing('Generating minified bundle. This will take a moment...')
  );

  webpack(config).run((error, stats) => {
    if (error) {
      // so a fatal error occurred. Stop here.
      console.log(chalkError(error));
      return error;
    }

    const jsonStats = stats.toJson();

    if (jsonStats.hasErrors) {
      return jsonStats.errors.map(error => console.log(chalkError(error)));
    }

    if (jsonStats.hasWarnings) {
      console.log(chalkWarning('Webpack generated the following warnings: '));
      jsonStats.warnings.map(warning => console.log(chalkWarning(warning)));
    }

    console.log(`Webpack stats: ${stats}`);

    // if we got this far, the build succeeded.
    console.log(
      chalkSuccess(
        "Your app is compiled in production mode in /bundles. It's ready to roll!"
      )
    );

    return 'success';
  });
};

// const runLib = async () => {
// 	await lib();
// 	console.log(chalkSuccess('Your components are transformed in production mode in /lib.'));
// };

(async () => {
  // await runLib();
  await runWebpack();
})();
