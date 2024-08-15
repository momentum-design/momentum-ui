/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/button-group/ButtonGroup";
import "@/components/icon/Icon";
import { ThemeNameValues } from "@/components/theme/Theme";
import { boolean, select, withKnobs } from "@storybook/addon-knobs";
import { html } from "lit-element";

export default {
  title: "Components/Button Group",
  component: "md-button-group",
  decorators: [withKnobs],
  parameters: {
    a11y: {
      element: "md-button-group"
    }
  }
};

export const ButtonGroup = () => {
  const darkTheme = boolean("darkMode", false);
  const theme = select("Theme name", ThemeNameValues, "lumos");
  const disabled = boolean("Disabled", false);

  return html`
    <md-theme class="theme-toggle" ?darkTheme=${darkTheme} theme=${theme}>
      <md-button-group ?disabled=${disabled}>
        <button slot="button" type="button"><md-icon name="icon-text-table_16"></md-icon></button>
        <button slot="button" type="button"><md-icon name="icon-analysis_16"></md-icon></button>
        <button slot="button" type="button">Option A</button>
        <button slot="button" type="button">Option B</button>
      </md-button-group>
    </md-theme>
  `;
};
