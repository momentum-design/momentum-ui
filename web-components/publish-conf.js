/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable no-undef */
const fs = require("fs");
const fse = require("fs-extra");
const path = require("path");
const spawnSync = require("child_process").spawnSync;

const filePkg = fs.readFileSync(path.resolve("./package.json"));
const p = JSON.parse(filePkg.toString());

module.exports.notify = function () {
  const email = spawn(`npm config get email`).result.trim();
  const markdown = `**${p.name} - ${p.version}** by ${email} at https://www.npmjs.com/package/@momentum-ui/web-components`;
  const curl = `curl -X POST -H "Content-Type: application/json" -d '{"markdown" : "${markdown}"}' "https://webexapis.com/v1/webhooks/incoming/Y2lzY29zcGFyazovL3VzL1dFQkhPT0svMDc3ZjBlNTMtZjhlNC00NDM2LTk2MzYtNGVmYzk3NmRkNjNj"`;
  //spawn(curl);
};

function spawn(cmd) {
  const exec = spawnSync(cmd, { shell: true });
  const isError = exec.status != 0;
  return {
    isError,
    result: isError ? exec.stderr.toString() : exec.stdout.toString()
  };
}

module.exports.createPackageJson = function () {
  const pkg = {
    name: p.name,
    version: p.version,
    description: p.description,
    author: p.author,
    license: p.license,
    repository: p.repository,
    main: p.main,
    module: p.module,
    types: p.types,
    exports: p.exports,
    dependencies: p.dependencies,
    peerDependencies: p.peerDependencies,
    publishConfig: {
      registry: `https://registry.npmjs.org`
    }
  };

  const publishDir = path.resolve("./publish");

  if (!fse.existsSync(publishDir)) {
    fse.mkdirSync(publishDir);
  } else {
    fse.removeSync(publishDir);
    fse.mkdirSync(publishDir);
  }
  const publishDistDir = path.resolve("./publish/dist");

  if (!fse.existsSync(publishDistDir)) {
    fse.mkdirSync(`./publish/dist`);
  }

  const dist = path.resolve("./dist");
  const pPublishDist = path.resolve(`./publish/dist`);
  //fse.removeSync(publishDir);
  fse.ensureDirSync(pPublishDist);
  fse.copySync(dist, pPublishDist);
  const data = JSON.stringify(pkg, null, 2);
  fs.writeFileSync(path.resolve(`./publish/package.json`), data);
};
