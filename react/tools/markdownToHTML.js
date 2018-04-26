import fs from 'fs-extra';
import showdown from 'showdown';
const converter = new showdown.Converter();

function convertMarkdown(file, outFile) {
  const mkdown = fs.readFileSync(file).toString('utf8');
  const html = converter.makeHtml(mkdown);
  //   const wrappedHtml = `
  // 	import React from 'react';

  // 	export default class docs extends React.Component {
  // 		render() {
  // 			return (
  // 				<div dangerouslySetInnerHTML={{__html: ${html}} />
  // 			)
  // 		}
  // 	}`;
  const wrappedHtml = `module.exports =
    {__html: \`<div>${html}</div>\`}
  `;

  fs.outputFileSync(outFile, wrappedHtml, err => {
    if (err) throw err;
    console.log(`${file} has been converted to HTML`);
  });
}

convertMarkdown('CHANGELOG.md', 'src/docs/components/Develop/changelog.js');
convertMarkdown(
  'CONTRIBUTING.md',
  'src/docs/components/Develop/contributing.js'
);
convertMarkdown(
  'GETTING_STARTED.md',
  'src/docs/components/Develop/gettingstarted.js'
);
