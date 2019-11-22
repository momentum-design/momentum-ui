const { Markdown } = require('./markdown');
const config = require('./generatedConfig');

const ChartsDoc = new Markdown(config.target.markdown, config.markdown.charts, 'charts');

(async() => {
  await ChartsDoc.exec();
})();
