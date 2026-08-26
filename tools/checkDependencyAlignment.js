const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const expectedWebpack = '5.104.1';
const forbiddenPackages = new Set([
  '@babel/polyfill',
  '@hot-loader/react-dom',
  'babel-core',
  'babel-polyfill',
  'extract-text-webpack-plugin',
  'file-loader',
  'hard-source-webpack-plugin',
  'html-loader',
  'react-hot-loader',
  'url-loader',
  'webpack-dev-middleware',
  'webpack-hot-middleware',
  'webpack-md5-hash',
  'yarn',
]);

const readJson = relativePath =>
  JSON.parse(fs.readFileSync(path.join(repoRoot, relativePath), 'utf8'));

const rootPackage = readJson('package.json');
const webComponentsPackage = readJson('web-components/package.json');
const errors = [];

const declaredVersion = (pkg, dependency) =>
  ['dependencies', 'devDependencies', 'peerDependencies', 'optionalDependencies']
    .map(section => pkg[section] && pkg[section][dependency])
    .find(Boolean);

if (declaredVersion(rootPackage, 'webpack') !== expectedWebpack) {
  errors.push(`root webpack must be exactly ${expectedWebpack}`);
}
if (declaredVersion(webComponentsPackage, 'webpack') !== expectedWebpack) {
  errors.push(`web-components webpack must be exactly ${expectedWebpack}`);
}

for (const workspace of rootPackage.workspaces.packages) {
  const manifestPath = path.join(workspace, 'package.json').replace(/^\.\//, '');
  const pkg = readJson(manifestPath);
  const webpackVersion = declaredVersion(pkg, 'webpack');
  if (webpackVersion) {
    errors.push(`${manifestPath} must use the root webpack toolchain, not ${webpackVersion}`);
  }

  for (const section of ['dependencies', 'devDependencies', 'peerDependencies', 'optionalDependencies']) {
    for (const dependency of Object.keys(pkg[section] || {})) {
      if (forbiddenPackages.has(dependency)) {
        errors.push(`${manifestPath} declares forbidden legacy dependency ${dependency}`);
      }
    }
  }
}

const lockfiles = [];
const findLockfiles = directory => {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.name === '.git' || entry.name === 'node_modules') continue;
    const absolutePath = path.join(directory, entry.name);
    if (entry.isDirectory()) findLockfiles(absolutePath);
    if (entry.isFile() && entry.name === 'yarn.lock') {
      lockfiles.push(path.relative(repoRoot, absolutePath));
    }
  }
};
findLockfiles(repoRoot);

const expectedLockfiles = ['web-components/yarn.lock', 'yarn.lock'];
if (lockfiles.sort().join('\n') !== expectedLockfiles.join('\n')) {
  errors.push(`expected only ${expectedLockfiles.join(' and ')}, found: ${lockfiles.join(', ')}`);
}

if (rootPackage.engines.node !== '24.18.x') {
  errors.push('root engines.node must be 24.18.x');
}
if (rootPackage.packageManager !== 'yarn@1.22.22') {
  errors.push('root packageManager must be yarn@1.22.22');
}

if (errors.length) {
  console.error(errors.map(error => `- ${error}`).join('\n'));
  process.exitCode = 1;
} else {
  console.log(`Dependency alignment OK (webpack ${expectedWebpack}; two lockfiles).`);
}
