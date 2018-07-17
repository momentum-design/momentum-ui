const commonjs = process.env.BABEL_ENV !== 'esm';

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        loose: true,
        shippedProposals: true,
        modules: commonjs ? 'commonjs' : false,
        targets: {
          browsers: ['last 4 versions', 'not ie <= 8']
        },
        useBuiltIns: 'usage'
      }
    ],
    [
      '@babel/preset-react',
      { development: process.env.NODE_ENV !== 'production' }
    ]
  ],
  plugins: [
    [
      "module-resolver",
      {
        "alias": {
          "@collab-ui/react": "./src/lib"
        }
      }
    ],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-export-namespace-from',
    '@babel/plugin-transform-react-constant-elements'
    ['@babel/plugin-transform-runtime', { useESModules: !commonjs }],
    'babel-plugin-dev-expression'
  ].filter(Boolean)
};