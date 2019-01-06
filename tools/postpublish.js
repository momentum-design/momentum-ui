const { execFile } = require('child_process');

const sendMessage = execFile('npm run post-to-teams', ['--message="this is a test"'], (error, stdout, stderr) => {
  if (error) {
    throw error;
  }
});
