const fs = require('fs');
const path = require('path');

if (process.argv.length != 3) {
  console.error("Run as replaceURLs.js <package name>");
}

const packageJSON = require(path.resolve(__dirname, `../package.json`));
const cssPath = `../css/momentum-ui`;
const packageName = process.argv[2];
const version = packageJSON.version;
const cssFile = path.resolve(__dirname, `${cssPath}-${packageName}.css`);
const cssMinFile = path.resolve(__dirname, `${cssPath}-${packageName}.min.css`);

fs.readFile(cssFile, 'utf8', function(err, data) {
  if (err) return console.error(err);

  const result = data.replace(
    /\.\.\/fonts/g,
    `https://downloads.momentum-ui.com/@momentum-ui/${packageName}/${version}/fonts`
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
    `https://downloads.momentum-ui.com/@momentum-ui/${packageName}/${version}/fonts`
  );

  fs.writeFile(cssMinFile, result, 'utf8', function(err) {
    if (err) return console.log(err);
    console.log(`${cssMinFile} updated!`);
  });
});
