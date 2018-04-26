/* eslint-disable */
var exec = require('child_process').exec;

exec('node -v', function(err, stdout) {
  if (err) throw err;

  if (parseFloat(stdout.slice(1)) < 4) {
    throw new Error('Collab-UI-React requires node 4.0 or greater.');
  }
});
