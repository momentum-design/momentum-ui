const path = require('path');
const {
  MiniCssExtractPlugin,
  assetRules,
  javascriptRule,
  resolveConfig,
  styleRule,
} = require('../../tools/webpack/shared');

const codePath = path.resolve(__dirname, '..');

const createBaseConfig = ({ extract = false, cssFilename = 'styles.css' } = {}) => ({
  target: 'web',
  devtool: 'source-map',
  resolve: resolveConfig({
    'react-native': 'react-native-web',
    '@momentum-ui/react': path.resolve(codePath, 'src/lib'),
  }),
  module: {
    rules: [
      javascriptRule([path.resolve(codePath, 'src')]),
      ...assetRules(),
      styleRule({ extract, includePaths: [path.resolve(codePath, 'src/scss')] }),
    ],
  },
  plugins: extract ? [new MiniCssExtractPlugin({ filename: cssFilename })] : [],
});

module.exports = { createBaseConfig };
