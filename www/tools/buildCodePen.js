const { CodePenExample } = require('./codePenExample');
const config = require('./generatedConfig');

const ChartsExample = new CodePenExample(config.target.examples_charts, config.source.charts, 'charts');

(async() => {
  await ChartsExample.exec();
})();
