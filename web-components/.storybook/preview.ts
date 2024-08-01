import { addParameters } from "@storybook/client-api";
import { setCustomElements } from "@storybook/web-components";
import customElements from './custom-elements.json';

/** 
 * Custom element file generated automatically by execute this command
 * npx web-component-analyzer src\components\**\*.ts --outFile .storybook\custom-elements.json
*/

setCustomElements(customElements);

addParameters({
  docs: {
    inlineStories: false,
  },
  controls: { expanded: true },
  a11y: {
    config: {},
    element: "#storybook-panel-root",
    options: {
      checks: { 'color-contrast': { options: { noScroll: true } } },
      restoreScroll: true,
    },
  },
  options: {
    storySort: {
      order: ['Components', 'Internal References'],
      method: 'alphabetical'
    }
  }
});
