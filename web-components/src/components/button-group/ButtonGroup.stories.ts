/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/button-group/ButtonGroup";
import "@/components/theme/Theme";
import { withA11y } from "@storybook/addon-a11y";
import { boolean, select, withKnobs } from "@storybook/addon-knobs";
import { html } from "lit-element";
import { ThemeNameValues } from "@/components/theme/Theme";

export default {
  title: "Components/Button Group",
  component: "md-button-group",
  decorators: [withKnobs, withA11y],
  parameters: {
    a11y: {
      element: "md-button-group"
    }
  }
};

export const ButtonGroup = () => {
  const darkTheme = boolean("darkMode", false);
  const lumos = boolean("Lumos Theme", false);
  const theme = select("Theme name", ThemeNameValues, "");
  const disabled = boolean("Disabled", false);

  return html`
    <md-theme class="theme-toggle" ?darkTheme=${darkTheme} ?lumos=${lumos} theme=${theme}>
      <md-button-group ?disabled=${disabled}>
        <button slot="button" type="button"><md-icon name="icon-text-table_16"></md-icon></button>
        <button slot="button" type="button"><md-icon name="icon-analysis_16"></md-icon></button>
        <button slot="button" type="button">Option A</button>
        <button slot="button" type="button">Option B</button>
      </md-button-group>
    </md-theme>
  `;
};
