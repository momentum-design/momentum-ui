const path = require('path');
const {
  MiniCssExtractPlugin,
  assetRules,
  javascriptRule,
  resolveConfig,
  styleRule,
} = require('../../tools/webpack/shared');

const codePath = path.resolve(__dirname, '..');

const createBaseConfig = ({ extract = true, cssFilename = 'styles.css' } = {}) => ({
  target: 'web',
  devtool: 'source-map',
  resolve: resolveConfig({
    'react-native': 'react-native-web',
    '@momentum-ui/icons': path.resolve(codePath, '../icons'),
    '@momentum-ui/react': path.resolve(codePath, '../react'),
    images: path.resolve(codePath, 'images'),
  }),
  module: {
    rules: [
      javascriptRule([path.resolve(codePath, 'app')]),
      ...assetRules(),
      styleRule({ extract }),
    ],
  },
  plugins: extract ? [new MiniCssExtractPlugin({ filename: cssFilename })] : [],
});

module.exports = { createBaseConfig };
