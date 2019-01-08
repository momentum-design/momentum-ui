// Centralized configuration for chalk, which is used to add color to console.log statements.
const chalk = require('chalk');
exports.chalkError = chalk.red;
exports.chalkSuccess = chalk.green;
exports.chalkWarning = chalk.yellow;
exports.chalkProcessing = chalk.blue;
