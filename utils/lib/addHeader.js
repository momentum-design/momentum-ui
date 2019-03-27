const fs = require('fs');

const addHeader = (file, header) => {
  const fileContents = fs.readFileSync(file).toString('utf8');
  const fileWithHeader = `${header}\n${fileContents}`;
  fs.writeFile(file, fileWithHeader, err => {
    if (err) throw err;
    console.log(`Header has been added to ${file}`);
  });
}

module.exports = addHeader;
