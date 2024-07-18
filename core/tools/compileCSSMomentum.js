const fs = require('fs');
const fsExtra = require('fs-extra');
const sass = require('sass');
const path = require('path');
const tildeImporter = require('node-sass-tilde-importer');
const modules = [
  "momentum-ui"
];

const compileCSSModules = () => {
  modules.forEach((module) => {
    const templateDirectory = path.resolve(__dirname, `../templates`);
    const cssDirectory = path.resolve(__dirname, `../css`);
    const outFile = path.resolve(__dirname, cssDirectory, `${module}.css`);

    sass.render(
      {
        file: path.resolve(__dirname, `${templateDirectory}/${module}.scss`),
        importer: tildeImporter,
        outputStyle: 'expanded',
        outFile: outFile,
        sourceMap: true,
        quietDeps: true        
      },
      function(error, result) {
        // node-style callback from v3.0.0 onwards
        if (error) {
          // eslint-disable-next-line no-console
          console.log(`Error: ${error.message} (Status: ${error.status}, Line: ${error.line}, Column: ${error.column})`);
        } else {
          fsExtra.ensureDir(cssDirectory).then(() => {
            fs.writeFileSync(outFile, result.css);
          });
        }
      }
    );
  });
};

compileCSSModules();
