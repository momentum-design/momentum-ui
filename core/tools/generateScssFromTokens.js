const generateFileFromTemplate = require('@momentum-ui/utils/src/generateFileFromTemplate');
const generateFileFromThemeToken = require('@momentum-ui/utils/src/generateFileFromThemeToken');
const path = require('path');
const colorData = require('@momentum-ui/tokens/dist/colors.json');
const buttonColorData = require('@momentum-ui/tokens/dist/button.json');
const semanticColorData = require('@momentum-ui/tokens/dist/semanticColor.json');
colorData.prefix = 'md';

const generateColorsFromTokens = async () => {
  await generateFileFromTemplate(
    path.resolve(__dirname, '../scss/colors'),
    'settings-base.scss',
    colorData,
    path.resolve(__dirname, '../templates/colors-settings.hbs')
  );
  await generateFileFromTemplate(
    path.resolve(__dirname, '../scss/colors'),
    'utilities.scss',
    colorData,
    path.resolve(__dirname, '../templates/colors.hbs')
  );

  // Button Color Tokens
  await generateFileFromTemplate(
    path.resolve(__dirname, '../scss/colors/button/'),
    'settings-base.scss',
    buttonColorData,
    path.resolve(__dirname, '../templates/buton-colors-settings.hbs')
  );

  // Semantic Color Tokens
  await Promise.all(Object.keys(semanticColorData).map(
    async (key) => generateFileFromThemeToken(
      path.resolve(__dirname, `../scss/colors/${semanticColorData[key].component}/`),
      'theme-base.scss',
      semanticColorData[key],
      '@momentum-ui/tokens/dist/semanticColor.json'
    )
  ));
};

generateColorsFromTokens();
