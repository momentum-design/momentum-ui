import "./Checkbox";
import "./CheckboxGroup";
import { withA11y } from "@storybook/addon-a11y";
import { withKnobs } from "@storybook/addon-knobs";
import { html } from "lit-element";

export default {
  title: "Checkbox",
  component: "md-checkbox",
  decorators: [withKnobs, withA11y],
  parameters: {
    a11y: {
      element: "md-checkbox"
    }
  }
};

export const Default = () => {
  return html`
    <md-checkbox>Developing</md-checkbox>
  `;
};

export const Checked = () => {
  return html`
    <md-checkbox checked>Linting</md-checkbox>
  `;
};

export const Disabled = () => {
  return html`
    <md-checkbox disabled>Linting</md-checkbox>
  `;
};

export const Indeterminate = () => {
  return html`
    <md-checkbox indeterminate>Linting</md-checkbox>
  `;
};

export const DisabledChecked = () => {
  return html`
    <md-checkbox disabled checked>Linting</md-checkbox>
  `;
};

export const DisabledIndeterminate = () => {
  return html`
    <md-checkbox disabled indeterminate>Checkbox</md-checkbox>
  `;
};

export const Group = () => {
  return html`
    <md-checkboxgroup group-label="group_process">
      <md-checkbox slot="checkbox" checked>Developing</md-checkbox>
      <md-checkbox slot="checkbox" disabled>Linting</md-checkbox>
      <md-checkbox slot="checkbox">Testing</md-checkbox>
      <md-checkbox slot="checkbox" indeterminate>Building</md-checkbox>
    </md-checkboxgroup>
  `;
};
