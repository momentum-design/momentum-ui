const fs = require('fs');
const path = require('path');

const packageJSON = require(path.resolve(__dirname, `../package.json`));
const cssPath = `../css/momentum-ui`;
const version = packageJSON.version;
const cssFile = path.resolve(__dirname, `${cssPath}-icons.css`);
const cssMinFile = path.resolve(__dirname, `${cssPath}-icons.min.css`);

fs.readFile(cssFile, 'utf8', function(err, data) {
  if (err) return console.error(err);

  const result = data.replace(
    /\.\.\/fonts/g,
    `https://downloads.momentum-ui.com/@momentum-ui/icons/${version}/fonts`
  );

  fs.writeFile(cssFile, result, 'utf8', function(err) {
    if (err) return console.log(err);
    console.log(`${cssFile} updated!`);
  });
});

fs.readFile(cssMinFile, 'utf8', function(err, data) {
  if (err) return console.error(err);
  const result = data.replace(
    /.\.\/fonts/g,
    `https://downloads.momentum-ui.com/@momentum-ui/icons/${version}/fonts`
  );

  fs.writeFile(cssMinFile, result, 'utf8', function(err) {
    if (err) return console.log(err);
    console.log(`${cssMinFile} updated!`);
  });
});
