
const path = require('path');

const Root = path.resolve(__dirname,'../client/generated');
const ExamplesRoot = path.resolve(Root,'examples');
const MarkdownRoot = path.resolve(Root,'markdown');

const _ChartsRoot = path.resolve(__dirname,'../../charts');

const config = {
  target: {
    root: Root,
    examples: ExamplesRoot,
    examples_charts: path.resolve(ExamplesRoot,'charts'),
    markdown: MarkdownRoot
  },
  source: {
    charts: path.resolve(_ChartsRoot,'src/lib/')
  },
  markdown: {
    charts: path.resolve(_ChartsRoot,'doc/')
  },
  sourceList: {
    charts: path.resolve(ExamplesRoot,'chartsList.js')
  },
  markdownList: {
    charts: path.resolve(MarkdownRoot,'chartsList.js')
  },
  static: {
    // chartsCss: 'https://downloads.momentum-ui.com/@momentum-ui/charts/css/momentum-chart-min.css',
    chartsCss: 'https://uxccds.github.io/chartDemo/version/beta/momentum-chart-min.css',
    chartsJs: 'https://downloads.momentum-ui.com/@momentum-ui/charts/bundles/momentum-ui-charts-min.js',
    // chartsD3: 'https://downloads.momentum-ui.com/@momentum-ui/charts/src/app/d3.v5.js'
    chartsD3: 'https://uxccds.github.io/chartDemo/version/d3.v5.js'
  }
};

module.exports = config;
