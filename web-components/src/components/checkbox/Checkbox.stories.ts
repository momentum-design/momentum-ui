/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

 import "@/components/checkbox/Checkbox";
import "@/components/checkbox/CheckboxGroup";
import "@/components/theme/Theme";
import { withA11y } from "@storybook/addon-a11y";
import { boolean, select, text, withKnobs } from "@storybook/addon-knobs";
import { html } from "lit-element";
import { ThemeNameValues } from "@/components/theme/Theme";

export default {
  title: "Components/Checkbox",
  component: "md-checkbox",
  decorators: [withKnobs, withA11y],
  parameters: {
    a11y: {
      element: "md-checkbox"
    }
  }
};

export const Checkbox = () => {
  const darkTheme = boolean("darkMode", false);
  const lumos = boolean("Lumos Theme", false);
  const theme = select("Theme name", ThemeNameValues, "");
  const check = boolean("Checked state", false);
  const label = text("Label", "Developing")
  const disable = boolean("Disabled State", false);
  const indeter = boolean("Indeterminate State", false);
  const group = boolean("Checkbox group", false);

  return html`
    ${group ?
    html`
      <md-theme class="theme-toggle" id="checkbox-group" ?darkTheme=${darkTheme} ?lumos=${lumos} theme=${theme}>
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
