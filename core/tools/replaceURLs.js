const fs = require('fs');
const path = require('path');

const packageJSON = require(path.resolve(__dirname, `../package.json`));
const iconsPackageJSON = require(path.resolve(__dirname, `../../icons/package.json`));
const cssPath = `../css/momentum-ui`;
const version = packageJSON.version;
const iconsVersion = iconsPackageJSON.version;
const cssFile = path.resolve(__dirname, `${cssPath}.css`);
const cssMinFile = path.resolve(__dirname, `${cssPath}.min.css`);

fs.readFile(cssFile, 'utf8', function(err, data) {
  if (err) return console.error(err);

  const result = data.replace(
    /\.\.\/\.\.\/icons\/fonts/g,
    `https://downloads.momentum-ui.com/@momentum-ui/icons/${iconsVersion}/fonts`
  ).replace(
    /\.\.\/fonts/g,
    `https://downloads.momentum-ui.com/@momentum-ui/core/${version}/fonts`
  );

  fs.writeFile(cssFile, result, 'utf8', function(err) {
    if (err) return console.log(err);
    console.log(`${cssFile} updated!`);
  });
});

fs.readFile(cssMinFile, 'utf8', function(err, data) {
  if (err) return console.error(err);
  const result = data.replace(
    /\.\.\/.\.\/icons\/fonts/g,
    `https://downloads.momentum-ui.com/@momentum-ui/icons/${iconsVersion}/fonts`
  ).replace(
    /.\.\/fonts/g,
    `https://downloads.momentum-ui.com/@momentum-ui/core/${version}/fonts`
  );

  fs.writeFile(cssMinFile, result, 'utf8', function(err) {
    if (err) return console.log(err);
    console.log(`${cssMinFile} updated!`);
  });
});
