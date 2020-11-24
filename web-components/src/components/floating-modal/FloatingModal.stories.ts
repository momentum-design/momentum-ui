import "@/components/floating-modal/FloatingModal";
import { withA11y } from "@storybook/addon-a11y";
import { boolean, text, withKnobs, number } from "@storybook/addon-knobs";
import { html } from "lit-element";
import { action } from '@storybook/addon-actions';

export default {
  title: "FloatingModal",
  component: "md-floating-modal",
  decorators: [withKnobs, withA11y],
  argTypes: {
    fixfull: {
      description: 'fix modal position to the screen, not parent div',
    },
    onCornerClick: { table: { disable: true } },
    draggingWindow: { table: { disable: true } },
    draggingCorner: { table: { disable: true } },
    onCornerMove: { table: { disable: true } },
    resizeStyleMap: { table: { disable: true } },
    fullScreen: { table: { disable: true } }
  },
  parameters: {
    a11y: {
      element: "md-floating-modal"
    },
    docs: { 
      description: { 
        component: 'some component description' 
      },
    }
  }
};

export const FloatingModal = () => {
  const darkTheme = boolean("darkMode", false);
  const show = boolean("show", false);
  const heading = text("headerLabel", "Test header text");
  const width = number("Width", 400);
  const height = number("Height", 200);
  const fixfull = boolean("fixfull", false);

  return html`
    <md-theme class="theme-toggle" id="floating" ?darkTheme=${darkTheme}>
      <md-floating-modal @close-floating=${(action('dispatchEvent'))} .show=${show} heading="${heading}" width=${width} height=${height} .fixfull="${fixfull}">
        <div slot="header">
          <span>Test slot header</span>
        </div>
      </md-floating-modal>
    </md-theme>
  `;
};
