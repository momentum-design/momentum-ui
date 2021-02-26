const fs = require("fs");
const util = require("util");
const path = require("path");

const generateTokenJSON = async (
  tokenName,
  tokenFile
) => {
  try {
    const aJSON = JSON.stringify(tokenFile);

    /** Create JSON file within dist */
    const distDir = './dist';
    const dataDir = './data';
    if (!fs.existsSync(distDir)) {
      fs.mkdirSync(distDir);
    }
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir);
    }

    const writeFile = util.promisify(fs.writeFile);
    await writeFile(path.join("dist", `${tokenName}.json`), aJSON);
    console.log(`dist/${tokenName}.json written!`);
    await writeFile(path.join("data", `${tokenName}.json`), aJSON);
    console.log(`data/${tokenName}.json written!`);
  } catch (e) {
    throw new Error(console.error("Failed to generate tokens\n", e));
  }
};

module.exports = generateTokenJSON;
