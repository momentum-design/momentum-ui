const generateFonts = require('./generateFonts');
const generateCss = require('./generateCss');
const generateSvgSprite = require('./generateSvgSprite');
const processSvg = require('./processSvg');

// generateCss();
generateFonts()
  .then(() => {
    return generateCss();
  })
  .then(() => {
    return generateSvgSprite();
  })
  .then(() => {
    return processSvg();
  });

