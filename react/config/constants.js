const path = require('path');

exports.repoRoot = path.resolve(__dirname, '../');

exports.srcRoot = path.join(exports.repoRoot, 'src/');
exports.distRoot = path.join(exports.repoRoot, 'dist/');
exports.libRoot = path.join(exports.repoRoot, 'lib/');
exports.esRoot = path.join(exports.repoRoot, 'es/');

exports.componentRoot = path.join(exports.srcRoot, 'lib/');
