const modules = process.env.BABEL_ENV === 'esm' ? false : 'auto';

module.exports = {
  presets: [
    ['@babel/preset-env', { loose: true, modules }],
    ['@babel/preset-react', { development: process.env.NODE_ENV !== 'production' }],
  ],
  plugins: [
    ['module-resolver', { alias: { '@momentum-ui/react': './src/lib' } }],
    ['@babel/plugin-transform-class-properties', { loose: true }],
    '@babel/plugin-transform-react-constant-elements',
    ['@babel/plugin-transform-runtime', { helpers: true, regenerator: true }],
  ],
};
