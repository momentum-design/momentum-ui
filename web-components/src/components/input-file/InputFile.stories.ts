import "./InputFile";
import { withA11y } from "@storybook/addon-a11y";
import { html } from "lit-element";
import { withKnobs, text } from "@storybook/addon-knobs";

export default {
  title: "Input File",
  component: "md-input-file",
  decorators: [withKnobs, withA11y],
  parameters: {
    a11y: {
      element: "md-input-file"
    }
  }
};

export const InputFile = () => {
  return html`
    <md-input-file></md-input-file>
  `;
};
