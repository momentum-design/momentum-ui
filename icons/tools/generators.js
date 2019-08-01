/* eslint-disable no-console */
const handlebars = require("handlebars");
const path = require("path");
const sass = require("node-sass");
const svgson = require("svgson");

const { readFile, writeFile } = require('./icons-utils');

function sassRender(file, outFile, outputStyle) {
  const sassOptions = {
    file,
    outFile,
    outputStyle
  };

  return new Promise((resolve, reject) => {
    sass.render(sassOptions, (error, result) => {
      if (error) {
        return reject(error);
      }

      resolve(result.css);
    });
  });
}

async function compileCss(options = {}) {
  const cssFilePath = options.compressed
    ? "css/momentum-ui-icons.min.css"
    : "css/momentum-ui-icons.css";
  const outputStyle = options.compressed ? "compressed" : "expanded";
  const css = await sassRender(
    "templates/momentum-ui-icons.scss",
    cssFilePath,
    outputStyle
  );
  await writeFile(cssFilePath, css);
  console.log(`${cssFilePath} written!`);
}

async function generateFile(dest, fileName, data) {
  const template = path.join("templates", `${fileName}.hbs`);
  const source = await readFile(template, "utf8");
  const compile = handlebars.compile(source);
  const finalFile = path.join(dest, fileName);
  await writeFile(finalFile, compile(data));
  console.warn(`${finalFile} written!`);
}

async function generateIconsDataJson(data) {
  const glyphs = data.glyphsData.map(({ file, name }) => ({
    name,
    file
  }));

  const promises = glyphs.map(async function({ file, name }) {
    const svgString = await readFile(path.resolve(file), "utf-8");
    const ast = await svgson.parse(svgString);
    const svgPath = ast.children.find(child => child.name === "path");
    const svgG = ast.children.find(child => child.name === "g");
    const ds = [];
    if (svgPath) {
      const { d } = svgPath.attributes;
      ds.push(d);
    } else if (svgG) {
      const paths = svgG.children;
      for (let path of paths) {
        const { d } = path.attributes;
        ds.push(d);
      }
    }
    return { name, ds };
  });

  const iconsDs = await Promise.all(promises);
  const icons = iconsDs.reduce((acc, curr) => {
    acc[curr.name] = curr.ds;
    if (curr.ds.length === 0) console.error(`⚠️ ${curr.name} has no paths!`);
    return acc;
  }, {});
  await writeFile(path.join("data", "iconsData.json"), JSON.stringify(icons));
  console.info("data/iconsData.json written!");
}

module.exports = {
  compileCss,
  generateFile,
  generateIconsDataJson
};
