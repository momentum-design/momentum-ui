const commonjs = process.env.BABEL_ENV !== 'esm';

module.exports = {
  presets: [['@babel/preset-env', { modules: commonjs ? 'commonjs' : false }]],
  plugins: [['@babel/plugin-transform-runtime', { helpers: true, regenerator: true }]],
};
