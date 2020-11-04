import "./FloatingModal";
import { withA11y } from "@storybook/addon-a11y";
import { boolean, text, withKnobs } from "@storybook/addon-knobs";
import { html } from "lit-element";

export default {
  title: "FloatingModal",
  component: "md-floating-modal",
  decorators: [withKnobs, withA11y],
  parameters: {
    a11y: {
      element: "md-floating-modal"
    }
  }
};

export const FloatingModal = () => {
  const show = boolean("show", false);
  const heading = text("headerLabel", "Test header text");
  const fixfull = boolean("fixfull", false);

  return html`
    <md-floating-modal .show=${show} heading="${heading}" .fixfull="${fixfull}">
      <div slot="header">
        <span>Test slot header</span>
      </div>
    </md-floating-modal>
  `;
};
