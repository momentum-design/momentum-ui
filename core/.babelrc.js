const commonjs = process.env.BABEL_ENV !== 'esm';

module.exports = {
  presets: [
    ['@babel/preset-env', { loose: true, modules: commonjs ? 'commonjs' : false }],
    ['@babel/preset-react', { development: process.env.NODE_ENV !== 'production' }],
  ],
  plugins: [
    ['@babel/plugin-transform-class-properties', { loose: true }],
    '@babel/plugin-transform-react-constant-elements',
    ['@babel/plugin-transform-runtime', { helpers: true, regenerator: true }],
  ],
};
