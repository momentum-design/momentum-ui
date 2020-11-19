import "./Checkbox";
import "./CheckboxGroup";
import { withA11y } from "@storybook/addon-a11y";
import { boolean, withKnobs } from "@storybook/addon-knobs";
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
  const check = boolean("Checked state", false);
  const disable = boolean("Disabled State", false);
  const indeter = boolean("Indeterminate State", false);
  const group = boolean("Checkbox group", false);

  return html`
    ${group ?
    html`<md-checkboxgroup group-label="group_process">
      <md-checkbox slot="checkbox" .checked=${check}>Developing</md-checkbox>
      <md-checkbox slot="checkbox" .disabled=${disable}>Linting</md-checkbox>
      <md-checkbox slot="checkbox">Testing</md-checkbox>
      <md-checkbox slot="checkbox" .indeterminate=${indeter}>Building</md-checkbox>
    </md-checkboxgroup>` :
    html`<md-checkbox .checked=${check} .disabled=${disable} .indeterminate=${indeter}>Developing</md-checkbox>`}
  `;
};
