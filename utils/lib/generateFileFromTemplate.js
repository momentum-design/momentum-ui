const handlebars = require("handlebars");
const path = require("path");
const fs = require('fs-extra');

async function generateFileFromTemplate(dest, fileName, data, template) {
  const source = await fs.readFile(template, "utf8");
  const compile = handlebars.compile(source);
  const finalFile = path.join(dest, fileName);
  await fs.writeFile(finalFile, compile(data));
  console.warn(`${finalFile} written!`);
}

module.exports = generateFileFromTemplate;
