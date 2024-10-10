import { Parameters } from "@storybook/client-api";
import { setCustomElements } from "@storybook/web-components";
import customElements from './custom-elements.json';

/** 
 * Custom element file generated automatically by execute this command
 * npx web-component-analyzer src\components\**\*.ts --outFile .storybook\custom-elements.json
*/

setCustomElements(customElements);

export const parameters:Parameters = {
  docs: {
    inlineStories: false,
  },
  ally: {
    config: {},
    element: "#storybook-panel-root",
    options: {
      checks: { 'color-contrast': { options: { noScroll: true } } },
      restoreScroll: true,
    }
  },
  controls: {
    disableSaveFromUI: true,
    expanded: true,
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    }
  },
  options: {
    storySort: {
      order: ['Components', 'Internal References'],
      method: 'alphabetical'
    }
  }  
};
