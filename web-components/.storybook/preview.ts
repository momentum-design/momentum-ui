import { addDecorator, addParameters, configure, setCustomElements } from "@storybook/web-components";
import customElements from './custom-elements.json';
import { withA11y } from "@storybook/addon-a11y";

/** 
 * Custom element file generated automatically by execute this command
 * npx web-component-analyzer src\components\**\*.ts --outFile .storybook\custom-elements.json
*/

addDecorator(withA11y);

setCustomElements(customElements);

addParameters({
  docs: {
    inlineStories: false,
  },
  controls: { expanded: true },
  a11y: {
    config: {},
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
