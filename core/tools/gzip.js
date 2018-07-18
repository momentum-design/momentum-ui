const fs = require('fs');
const gzip = require('@gfx/zopfli').gzip;

const file = 'css/collab-ui.min.css';
const css = fs.readFileSync(file).toString('utf8');
const options = {
  verbose: false,
  verbose_more: false,
  numiterations: 15,
  blocksplitting: true,
  blocksplittinglast: false,
  blocksplittingmax: 15
};

gzip(css, options, (err, output) => {
    if (err) throw err;
    fs.writeFile(`${file}.gz`, output,  (err) => {
      if (err) throw err;
      console.log(`${file} has been gZipped!`);
    });
});
