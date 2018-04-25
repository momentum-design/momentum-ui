const fs = require('fs');

const pkg = require('../package.json');
const year = (new Date()).getFullYear();
const header = `/*!
 * ${pkg.name} v${pkg.version} (${pkg.homepage})
 * ${pkg.description}
 * Copyright 2013-${year} ${pkg.author}
 */`;

function addHeader(file) {
  const fileContents = fs.readFileSync(file).toString('utf8');
  const fileWithHeader = header + '\n' + fileContents;
  fs.writeFile(file, fileWithHeader,  (err) => {
    if (err) throw err;
    console.log(`Header has been added to ${file}`);
  });
}

addHeader('css/collab-ui.css');
addHeader('css/collab-ui.min.css');
