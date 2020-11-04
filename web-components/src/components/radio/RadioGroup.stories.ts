import "./Radio";
import "./RadioGroup";
import { withA11y } from "@storybook/addon-a11y";
import { select, withKnobs } from "@storybook/addon-knobs";
import { html } from "lit-element";

export default {
  title: "Radio",
  component: "md-radio",
  decorators: [withKnobs, withA11y],
  parameters: {
    a11y: {
      element: "md-radiogroup"
    }
  }
};

export const Default = () => {
  return html`
    <md-radiogroup group-label="group_process">
      <md-radio slot="radio" value="developing">Developing</md-radio>
      <md-radio slot="radio" value="linting">Linting</md-radio>
      <md-radio slot="radio" value="testing">Testing</md-radio>
      <md-radio slot="radio" value="building">Building</md-radio>
    </md-radiogroup>
  `;
};

export const Alignment = () => {
  const options = {
    Vertical: "vertical",
    Horizontal: "horizontal"
  };

  const alignment = select("Orientation", options, "horizontal");

  return html`
    <md-radiogroup group-label="group_process" .alignment=${alignment as "horizontal" | "vertical"}>
      <md-radio slot="radio" value="developing">Developing</md-radio>
      <md-radio slot="radio" value="linting">Linting</md-radio>
      <md-radio slot="radio" value="testing">Testing</md-radio>
      <md-radio slot="radio" value="building">Building</md-radio>
    </md-radiogroup>
  `;
};

export const PreChecked = () => {
  return html`
    <md-radiogroup group-label="group_process" checked="1">
      <md-radio slot="radio" value="developing">Developing</md-radio>
      <md-radio slot="radio" value="linting">Linting</md-radio>
      <md-radio slot="radio" value="testing">Testing</md-radio>
      <md-radio slot="radio" value="building">Building</md-radio>
    </md-radiogroup>
  `;
};

export const Disabled = () => {
  return html`
    <md-radiogroup group-label="group_process" checked="1">
      <md-radio slot="radio" value="developing">Developing</md-radio>
      <md-radio slot="radio" value="linting" disabled>Linting</md-radio>
      <md-radio slot="radio" value="testing" disabled>Testing</md-radio>
      <md-radio slot="radio" value="building">Building</md-radio>
    </md-radiogroup>
  `;
};
