import "@/components/checkbox/Checkbox";
import "@/components/checkbox/CheckboxGroup";
import "@/components/theme/Theme";
import { withA11y } from "@storybook/addon-a11y";
import { boolean, text, withKnobs } from "@storybook/addon-knobs";
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
  const darkTheme = boolean("darkMode", false);
  const check = boolean("Checked state", false);
  const label = text("Label", "Developing")
  const disable = boolean("Disabled State", false);
  const indeter = boolean("Indeterminate State", false);
  const group = boolean("Checkbox group", false);

  return html`
    ${group ?
    html`
      <md-theme class="theme-toggle" id="checkbox-group" ?darkTheme=${darkTheme}>
        <md-checkboxgroup group-label="group_process">
          <md-checkbox slot="checkbox" .checked=${check}>Developing</md-checkbox>
          <md-checkbox slot="checkbox" .disabled=${disable}>Linting</md-checkbox>
          <md-checkbox slot="checkbox">Testing</md-checkbox>
          <md-checkbox slot="checkbox" .indeterminate=${indeter}>Building</md-checkbox>
        </md-checkboxgroup>
      </md-theme>` :
    html`
      <md-theme class="theme-toggle" id="checkbox" ?darkTheme=${darkTheme}>
        <md-checkbox label="${label}" .checked=${check} .disabled=${disable} .indeterminate=${indeter}>Developing</md-checkbox>
      </md-theme>
    `}
  `;
};
