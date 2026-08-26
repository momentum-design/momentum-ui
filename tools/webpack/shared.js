const path = require('path');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const postcssFlexbugsFixes = require('postcss-flexbugs-fixes');

const assetRules = () => [
  {
    test: /\.(woff2?|eot|[ot]tf|jpe?g|png|gif|ico)$/i,
    type: 'asset/resource',
    generator: { filename: '[name][ext]' },
  },
  {
    test: /\.svg$/i,
    type: 'asset',
    parser: { dataUrlCondition: { maxSize: 10000 } },
    generator: { filename: '[name][ext]' },
  },
  {
    test: /\.html$/i,
    type: 'asset/source',
  },
];

const javascriptRule = include => ({
  test: /\.jsx?$/,
  include,
  use: {
    loader: 'babel-loader',
    options: { cacheDirectory: true },
  },
});

const styleRule = ({ extract = false, includePaths = [], sourceMap = true } = {}) => ({
  test: /\.(css|s[ac]ss)$/i,
  use: [
    extract ? MiniCssExtractPlugin.loader : 'style-loader',
    {
      loader: 'css-loader',
      options: { sourceMap },
    },
    {
      loader: 'postcss-loader',
      options: {
        sourceMap,
        postcssOptions: {
          plugins: [postcssFlexbugsFixes, autoprefixer()],
        },
      },
    },
    {
      loader: 'sass-loader',
      options: {
        implementation: require('sass'),
        sourceMap,
        sassOptions: includePaths.length ? { includePaths } : {},
      },
    },
  ],
});

const resolveConfig = aliases => ({
  extensions: ['.js', '.jsx', '.json'],
  alias: aliases,
});

const devServer = (directory, port) => ({
  static: { directory: path.resolve(directory) },
  historyApiFallback: true,
  hot: false,
  liveReload: true,
  port,
  client: { overlay: true },
});

module.exports = {
  MiniCssExtractPlugin,
  assetRules,
  devServer,
  javascriptRule,
  resolveConfig,
  styleRule,
};
