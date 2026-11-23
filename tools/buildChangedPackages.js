const { execFileSync, spawnSync } = require('node:child_process');
const path = require('node:path');

const root = path.resolve(__dirname, '..');

// Match build:all. Core's React dependency is for its demo app, so build the Core CSS before React.
const buildOrder = ['tokens', 'utils', 'icons', 'icons-rebrand', 'core', 'react', 'charts'];
const packages = buildOrder.map(directory => {
  const manifest = require(path.join(root, directory, 'package.json'));
  const dependencies = new Set(Object.keys({
    ...manifest.dependencies,
    ...manifest.devDependencies,
    ...manifest.optionalDependencies,
    ...manifest.peerDependencies,
  }));
  return { directory, name: manifest.name, dependencies };
});
const packagesByName = new Map(packages.map(pkg => [pkg.name, pkg]));

function readGit(args) {
  const result = spawnSync('git', args, { cwd: root, encoding: 'utf8' });
  if (result.error) throw result.error;
  return result.status === 0 ? result.stdout.trim() : '';
}

function baseRevision() {
  if (process.env.BUILD_BASE_REF) return process.env.BUILD_BASE_REF;

  const previousCommit = readGit(['rev-parse', '--verify', 'HEAD^']);
  if (process.env.CIRCLE_BRANCH === 'main' && previousCommit) return previousCommit;

  if (readGit(['rev-parse', '--verify', 'origin/main'])) {
    return readGit(['merge-base', 'origin/main', 'HEAD']);
  }
  return previousCommit;
}

const base = baseRevision();
// CircleCI uses a blobless checkout. Detecting renames can fetch historical blobs.
const changedPaths = base
  ? execFileSync('git', ['diff', '--no-renames', '--name-only', '-z', base, 'HEAD', '--'], {
    cwd: root,
    encoding: 'utf8',
  }).split('\0')
  : [];
const sharedInputs = new Set(['.nvmrc', 'package.json', 'yarn.lock']);
const buildAll = !base || changedPaths.some(file => (
  sharedInputs.has(file) || file.startsWith('.circleci/') || file.startsWith('tools/')
));

const changedDirectories = new Set(changedPaths.map(file => file.split('/')[0]));
const affected = new Set(packages.filter(pkg => buildAll || changedDirectories.has(pkg.directory)));

// Follow dependents first, then build everything they need in the declared order.
for (const pkg of affected) {
  for (const candidate of packages) {
    if (candidate.dependencies.has(pkg.name)) affected.add(candidate);
  }
}
for (const pkg of affected) {
  for (const name of pkg.dependencies) {
    const dependency = packagesByName.get(name);
    if (dependency) affected.add(dependency);
  }
}

const selected = packages.filter(pkg => affected.has(pkg));
if (!selected.length) {
  console.log('No buildable legacy packages changed; skipping legacy package builds.');
} else {
  console.log(`Building legacy packages: ${selected.map(pkg => pkg.name).join(', ')}`);
  for (const { directory } of selected) {
    execFileSync('yarn', ['--cwd', directory, 'build:lib'], { cwd: root, stdio: 'inherit' });
  }
}
