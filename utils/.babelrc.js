module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        loose: true,
        targets: {
          browsers: [
            '>0.25%',
            'ie >= 11',
            'not op_mini all' // opera mini doesn't support client side
          ]
        }
      }
    ],
  ],
  plugins: [
    '@babel/plugin-proposal-object-rest-spread'
  ].filter(Boolean)
};
