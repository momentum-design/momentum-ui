import path from 'path';

export const repoRoot = path.resolve(__dirname, '../');

export const srcRoot = path.join(repoRoot, 'src/');
export const distRoot = path.join(repoRoot, 'dist/');
export const libRoot = path.join(repoRoot, 'lib/');

export const componentRoot = path.join(srcRoot, 'lib/');
