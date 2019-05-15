const fs = require('fs');
const gzipFile = require('@gfx/zopfli').gzip;

const gzip = file => {
  const options = {
    verbose: false,
    verbose_more: false,
    numiterations: 15,
    blocksplitting: true,
    blocksplittinglast: false,
    blocksplittingmax: 15,
  };
  const fileContents = fs.readFileSync(file).toString('utf8');
  gzipFile(fileContents, options, (err, output) => {
    if (err) throw err;
    fs.writeFile(`${file}.gz`, output, err => {
      if (err) throw err;
      /* eslint-disable no-console */
      console.log(`${file} has been gZipped!`);
      /* eslaint-enable no-console */
    });
  });
};

module.exports = gzip;
