import "./ToggleSwitch";
import { withA11y } from "@storybook/addon-a11y";
import { boolean, withKnobs } from "@storybook/addon-knobs";
import { html } from "lit-element";

export default {
  title: "Toggle Switch",
  component: "md-toggle-switch",
  decorators: [withKnobs, withA11y],
  parameters: {
    a11y: {
      element: "md-toggle-switch"
    }
  }
};

export const Default = () => {
  return html`
    <md-toggle-switch htmlId="toggleSwitch"></md-toggle-switch>
  `;
};
export const Checked = () => {
  const defaultValue = true;
  const checked = boolean("Checked", defaultValue);
  return html`
    <md-toggle-switch htmlId="toggleSwitch" ?checked=${checked}>Label Toggle Switch</md-toggle-switch>
  `;
};
export const Disabled = () => {
  const defaultValue = true;
  const disabled = boolean("Disabled", defaultValue);
  return html`
    <md-toggle-switch htmlId="toggleSwitch" ?disabled=${disabled}>Disabled Toggle Switch</md-toggle-switch>
  `;
};
export const DisabledChecked = () => {
  const defaultDisabledValue = true;
  const defaultCheckedValue = true;
  const disabled = boolean("Disabled", defaultDisabledValue);
  const checked = boolean("Checked", defaultCheckedValue);
  return html`
    <md-toggle-switch htmlId="toggleSwitch" ?disabled=${disabled} ?checked=${checked}>Label Checkbox</md-toggle-switch>
  `;
};
