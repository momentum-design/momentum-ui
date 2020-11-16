import { addParameters, configure, setCustomElements } from "@storybook/web-components";
import customElements from './custom-elements.json';
import { withCssResources } from '@storybook/addon-cssresources';

/** 
 * Custom element file generated automatically by execute this command
 * npx web-component-analyzer src\components\**\*.ts --outFile .storybook\custom-elements.json
*/

setCustomElements(customElements);

addParameters({
  docs: {
    inlineStories: false,
  },
  theme: {

  }
});

const req = require.context("../src/components/", true, /\.src\.(ts|mdx)$/);

configure(req, module);

if (module.hot) {
  module.hot.accept(req.id, () => {
    const currentLocationHref = window.location.href;

    window.history.pushState(null, "", currentLocationHref);
    window.location.reload();
  });
}

export const parameters = {
  backgrounds: {
    default: 'light',
    values: [
      { 
          name: 'light', 
          value: '#00aced'
      },
      { 
          name: 'dark', 
          value: '#3b5998' 
      },
    ],
  }
};

