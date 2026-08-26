const { runES } = require('./build-es');
const { runLib } = require('./build-lib');

const main = async () => {
  await runLib();
  await runES();
};

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
