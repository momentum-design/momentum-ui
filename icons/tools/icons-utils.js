const crypto = require("crypto");
const fs = require("fs");
const util = require("util");

async function calcHash(file) {
  const hash = crypto.createHash("md5");
  const fileContent = await readFile(file, "utf8");
  hash.update(fileContent);
  return hash.digest("hex");
}

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

module.exports = {
  calcHash,
  readFile,
  writeFile
};
