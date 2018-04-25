const fs = require('fs');
const showdown = require('showdown');
const converter = new showdown.Converter();

function convertMarkdown(file, outFile) {
  const mkdown = fs.readFileSync(file).toString('utf8');
  const html = converter.makeHtml(mkdown);
  const wrappedHtml = `<div class="row copy-spacing">
  ${html}
  </div>`
  fs.writeFile(outFile, wrappedHtml,  (err) => {
    if (err) throw err;
    console.log(`${file} has been converted to HTML`);
  });
}

convertMarkdown('CHANGELOG.md', 'docs/app/develop/changelog/changelog.component.html');
convertMarkdown('CONTRIBUTING.md', 'docs/app/develop/contributing/contributing.component.html');
convertMarkdown('GETTING-STARTED.md', 'docs/app/develop/getting-started/getting-started.component.html');
