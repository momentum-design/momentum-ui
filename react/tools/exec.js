const { exec: runCommand } = require('child_process');
const { chalkWarning, chalkProcessing } = require('../config/chalkConfig');

let executionOptions = {
  dryRun: false,
  verbose: false,
};

function logWithPrefix(prefix, message) {
  //eslint-disable-next-line
  console.log(
    message
      .toString()
      .trim()
      .split('\n')
      .map(line => `${prefix} ${line}`)
      .join('\n')
  );
}

exports.exec = (command, options = {}) => new Promise((resolve, reject) => {
  const title = options.title || command;
  const child = runCommand(command, options, (error, stdout, stderr) => {
    if (error) {
      error.stdout = stdout;
      error.stderr = stderr;
      reject(error);
      return;
    }
    if (executionOptions.verbose) {
      logWithPrefix(`[${title}]`, chalkProcessing('Complete'));
    }
    resolve({ stdout, stderr });
  });

  if (executionOptions.verbose) {
    child.stdout.on('data', data => logWithPrefix(`[${title}] stdout:`, data));
    child.stderr.on('data', data => logWithPrefix(`[${title}] stderr:`, data));
  }
});

exports.safeExec = (command, options = {}) => {
  const title = options.title || command;

  if (executionOptions.dryRun) {
    logWithPrefix(
      chalkProcessing(`[${title}]`),
      chalkWarning('DRY RUN'.magenta)
    );
    return Promise.resolve();
  }

  return exports.exec(command, options);
};

exports.setExecOptions = (options) => {
  executionOptions = { ...executionOptions, ...options };
};
