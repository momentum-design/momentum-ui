import { withA11y } from "@storybook/addon-a11y";
import { text, withKnobs } from "@storybook/addon-knobs";
import { html } from "lit-html";
import "../input/Input";
import "./Label";

export default {
  title: "Label",
  component: "md-label",
  decorators: [withKnobs, withA11y],
  parameters: {
    a11y: {
      element: "md-label"
    }
  }
};

export const Default = () => {
  const label = text("Label", "Label");
  return html`
    <md-label htmlFor="#">${label}</md-label>
  `;
};

export const Input = () => {
  const label = text("Label", "Label");
  return html`
    <md-input .label=${label} placeholder="placeholder text"> </md-input>
  `;
};

export const SecondaryLabel = () => {
  const defaultValue = "Secondary Label";
  const secondaryLabel = text("Secondary Label", defaultValue);
  return html`
    <md-input label="Input With Secondary Label" .secondaryLabel=${secondaryLabel}> </md-input>
  `;
};
