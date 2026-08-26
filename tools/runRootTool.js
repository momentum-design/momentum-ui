const { spawn } = require('child_process');
const path = require('path');

const [command, ...args] = process.argv.slice(2);

if (!command) {
  console.error('Usage: node ../tools/runRootTool.js <command> [...args]');
  process.exit(1);
}

const rootBin = path.resolve(__dirname, '../node_modules/.bin');
const nodeBin = path.dirname(process.execPath);
const env = {
  ...process.env,
  PATH: `${rootBin}${path.delimiter}${nodeBin}${path.delimiter}${process.env.PATH || ''}`,
};

const child = spawn(command, args, { cwd: process.cwd(), env, stdio: 'inherit' });

child.on('error', error => {
  console.error(error);
  process.exitCode = 1;
});

child.on('exit', (code, signal) => {
  if (signal) process.kill(process.pid, signal);
  process.exitCode = code === null ? 1 : code;
});
