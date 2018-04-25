const fs = require('fs');
const { execSync } = require('child_process');

const PATCH_LOCK = 'node_modules/@angular/cli/models/webpack-configs/.patched-webpack-enable-sourcemap';

//can generate patch file by `git diff` or use `diff -Nur`

if (fs.existsSync('node_modules/@angular/cli') && !fs.existsSync(PATCH_LOCK)) {
  execSync('patch -p0 -i tools/webpack-enable-sourcemap.patch');
  execSync(`touch ${PATCH_LOCK}`);
}
