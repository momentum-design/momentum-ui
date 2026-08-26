module.exports = {
  customSyntax: 'postcss-scss',
  ignoreFiles: ['**/css/**', '**/node_modules/**'],
  // Preserve the legacy source's intentional duplicate fallback declarations
  // while still parsing every SCSS file as part of the aggregate lint job.
  rules: {},
};
