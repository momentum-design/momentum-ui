const {
  transform
} = require('@babel/core');
const fse = require('fs-extra');
const path = require('path');

const getConfig = ({
  modules = true,
  optimize = true,
  test = false
} = {}) => {
  delete require.cache[require.resolve('../../babel.config.js')];
  const devEnv = test ? 'test' : 'development';
  process.env.NODE_ENV = optimize ? 'production' : devEnv;
  process.env.BABEL_ENV = modules ? '' : 'esm';

  return require('../../babel.config.js');
};

const RegJsFile = /.js$/;

const RegExampleAndTestFile = /(example)|(test)$/;

const buildFile = async (filename, destination, babelOptions = {}) => {
  if (!path.extname(filename) === '.js') return;
  const content = await fse.readFile(filename, {
    encoding: 'utf8'
  });

  if (RegJsFile.test(path.basename(filename)) && !RegExampleAndTestFile.test(path.dirname(filename))) {
    const result = transform(content, Object.assign({}, babelOptions, { filename }));
    const output = path.join(destination, path.basename(filename));
    await fse.outputFile(output, result.code);
  }
};

const _build = async (folderPath, destination, babelOptions = {}, firstFolder = true) => {
  let stats = fse.statSync(folderPath);

  if (stats.isFile()) {
    await buildFile(folderPath, destination, babelOptions);
  } else if (stats.isDirectory()) {
    let outputPath = firstFolder
      ? destination
      : path.join(destination, path.basename(folderPath));

    let files = (await fse.readdir(folderPath))
      .map(file => path.join(folderPath, file));

    await Promise.all(
      files.map(f => _build(f, outputPath, babelOptions, false))
    );
  }
};

module.exports = function buildBabel(
  folderPath,
  destination,
  babelConfig = {}
) {
  return _build(folderPath, destination, getConfig(babelConfig));
};
