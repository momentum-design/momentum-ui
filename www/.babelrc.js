const modules = process.env.BABEL_ENV === 'esm' ? false : 'auto';

module.exports = {
  presets: [
    ['@babel/preset-env', { modules }],
    ['@babel/preset-react', { development: process.env.NODE_ENV !== 'production' }],
  ],
  plugins: [
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-transform-class-properties', { loose: true }],
    '@babel/plugin-transform-react-constant-elements',
    ['@babel/plugin-transform-runtime', { helpers: true, regenerator: true }],
    process.env.NODE_ENV === 'production' && 'transform-react-remove-prop-types',
  ].filter(Boolean),
};
